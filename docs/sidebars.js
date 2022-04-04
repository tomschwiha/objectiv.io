/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation
 The sidebars can be generated from the filesystem, or explicitly defined here.
 Create as many sidebars as you want.
 */

 module.exports = {
  homeSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'home/quickstart-guide',
      label: 'Quickstart Guide',
    },
    {
      type: 'category',
      label: 'The Project',
      collapsed: false,
      link: {type: 'generated-index', slug: '/home/the-project/'},
      items: [
        {
          type: 'autogenerated',
          dirName: 'home/the-project',
        }
      ],
    },
  ],
  taxonomySidebar: [{type: 'autogenerated', dirName: 'taxonomy'}],
  trackingSidebar: [{type: 'autogenerated', dirName: 'tracking'}],
  modelingSidebar: require('./docs/modeling/sidebar.js')
};
