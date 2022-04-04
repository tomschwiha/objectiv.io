"""
Copyright 2022 Objectiv B.V.
"""
import datetime
import sys
import argparse
import requests
import xml.etree.ElementTree as ElementTree
from typing import List, Dict
import glob
import urllib.parse
from blessings import Terminal
from subprocess import check_output

# Basic configuration
FQDN = 'https://objectiv.io'  # domain to get sitemaps from
FQDN_PATHS = ['/', '/docs/']  # list of paths on domain to get sitemap from
SITEMAP = 'sitemap.xml'  # name of sitemap file
EXTENSIONS_TO_SCAN = ['md', 'html', 'rst', 'ipynb']  # file extensions to scan for URLs

parser = argparse.ArgumentParser()
parser.add_argument("--environment", default='production', help="the image's environment, e.g. 'testing'")
parser.add_argument("--docker-image", default='objectiv/website-deploy', help="the docker image to scan")
parser.add_argument("--tag", default=datetime.datetime.now().strftime('%Y%m%d'), help="the docker image tag")
args = parser.parse_args()


def has_extension(filename: str, extensions: List[str]) -> bool:
    """Check whether a file has one of the specified extensions

    :param filename: The file to check
    :param extensions: The file extensions it should have, e.g. ['.md', .ipynb']

    :return: True if the extension of the filename is in the list of specified allowed extensions
    """
    extension = filename.split('.')[-1]
    return extension in extensions


def check_urls_in_file(filename: str, urls: List[str]) -> List[str]:
    """Get any occurance of the specified URLs in the specified file

    :param filename: The file to scan
    :param urls: The URLs to find in the file

    :return: List of URLs found and in which file, e.g. [['https://test.com', '/source/hello.md']]
    """
    found = []
    with open(filename) as f:
        contents = f.read()

        for url in urls:
            if contents.find(url) != -1:
                found.append([url, filename])
    return found


def check_urls_from_files(path: str, extensions: List[str], urls: List[str]) -> Dict[str,str]:
    """Find any occurence of the URLs in the specified path and file types, e.g. in a repo

    :param path: The path to scan
    :param extensions: The file extensions to scan, e.g. ['.md', .ipynb']
    :param urls: The URLs to find in the files

    :return: List of URLs found and in which file, e.g. [['https://test.com', '/source/hello.md']]
    """

    urls_found_in_files = []
    for fn in glob.glob(path, recursive=True):
        if has_extension(fn, extensions):
            urls_found_in_files += check_urls_in_file(fn, urls)

    return urls_found_in_files
    # return {fn: check_urls_in_file(fn, urls) for fn in glob.glob(path, recursive=True) if has_extension(fn, extensions)}


def compare_urls(source: List[str], target: List[str]) -> List[str]:
    """Get the URLs not found in source vs target

    :param source: The source to compare
    :param target: The target to compare to

    :return: List of URLs missing in source, compared to target
    """
    return [u for u in source if u not in target]


def get_base_url(url: str) -> str:
    """Get the base URL from a URL (e.g. 'https://objectiv.io' from 'https://objectiv.io/about')

    :param url: The URL to get the base from

    :return: the base URL
    """

    parsed_url = urllib.parse.urlparse(url)
    return f'{parsed_url.scheme}://{parsed_url.netloc}'


def make_canonical(url: str, base_url: str = None) -> str:
    """Canonicalize a URL

    :param url: The URL to make canonical
    :param base_url: The base URL (e.g. 'https://staging.objectiv.io') to replace

    :return: a canonicalized URL in which the base URL is stripped
    """

    if not base_url:
        base_url = get_base_url(url)
    return url.replace(base_url, '')


def get_urls_from_sitemap(sitemap: str) -> List:
    """Get all the URLs from a sitemap (in text)

    :param sitemap: The sitemap (in text) containing the URLs to extract

    :return: A list of URLs fetched from the sitemap
    """
    doc = ElementTree.fromstring(sitemap)
    for url in doc.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        yield url.text


def get_urls_from_docker_image(env: str, path: str, image: str, tag: str = 'latest') -> List[str]:
    """Get all the URLs from a file at the specified Docker image

    :param env: The image environment, e.g. 'docker' or 'testing'
    :param path: The path to the sitemap in the image (without the filename of the sitemap itself)
    :param image: The image name
    :param tag: The tag of the iamge

    :return: A list of URLs fetched from the sitemap
    """
    sitemap_path = f'/services{path}build-{env}/{SITEMAP}'
    print(f'Fetching URLs from sitemap in image {image}:{tag}{sitemap_path}')
    sitemap = check_output(['docker', 'run', '--rm', f'{image}:{tag}', f'cat',  f'{sitemap_path}'])

    return get_urls_from_sitemap(sitemap.decode('utf-8'))


def get_urls_from_url(url: str) -> List:
    """Get all the URLs from a file at the specified URL (i.e. a sitemap)

    :param url: The URL to the file containing the URLs to extract

    :return: A list of URLs fetched from the file at the specified URL
    """
    print(f'Fetching URLs from sitemap at {url}')
    r = requests.get(url)
    return get_urls_from_sitemap(r.text)


def main() -> int:
    """
    Check URLs removed & added in a docker image against what's used:
    * On production (website/docs sitemaps)
    * In local repositories (objectiv.io and objectiv-analytics)
    * URLs that are used externally
    * TODO: tracker validation
    """

    term = Terminal()

    # first get the URLs from the production domain's sitemap
    prod_urls = []
    for path in FQDN_PATHS:
        prod_urls += get_urls_from_url(f'{FQDN}{path}{SITEMAP}')
    prod_urls = [make_canonical(u, FQDN) for u in prod_urls]

    # second, get the URLs from the image's sitemap
    docker_urls = []
    env = args.environment
    image = args.docker_image
    tag = args.tag
    for path in FQDN_PATHS:
        docker_urls += get_urls_from_docker_image(env, path=path, image=image, tag=tag)
    docker_urls = [make_canonical(u) for u in docker_urls]

    # third, compare the retrieved URLs from the docker image with the ones on production, and vice versa
    removed_urls = compare_urls(prod_urls, docker_urls) # missing URLs prod vs image (i.e. will break)
    added_urls = compare_urls(docker_urls, prod_urls) # missing URLs image vs prod (i.e. are new)

    exitcode = 0
    if removed_urls:
        # these are missing URLs, i.e. they exist on prod, but not in the docker image
        for url in removed_urls:
            print(term.bold_red(f'Removed URL compared to production sitemap: ({url})'))
        exitcode += 1

    if added_urls:
        # these are new URLs, i.e. the exist in the image, but not yet on production
        for url in added_urls:
            print(term.yellow(f'New URL compared to production sitemap: {url}'))
        exitcode += 1

    # fourth, check all removed+added URLs against the objectiv.io repository (i.e. the docs or site)
    urls_to_check = removed_urls + added_urls
    urls_in_use = check_urls_from_files('**', EXTENSIONS_TO_SCAN, urls_to_check)
    urls_in_use += check_urls_from_files('../objectiv-analytics/**', EXTENSIONS_TO_SCAN, urls_to_check)

    if urls_in_use:
        for hit in urls_in_use:
            url = hit[0]
            file = hit[1]
            print(term.blue(f'{file} uses URL: {url}'))
        exitcode += 1

    # TODO: check all removed+added URLs against the ones used in tracker validation
    
    return exitcode


if __name__ == "__main__":
    sys.exit(main())
