/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconMenu from '@theme/IconMenu';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common';

// OBJECTIV
import { tagPressable } from '@objectiv/tracker-browser';
// END OBJECTIV

export default function MobileSidebarToggle(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      // OBJECTIV
      {...tagPressable({ id: 'navbar-toggle' })}
      // END OBJECTIV
      onClick={mobileSidebar.toggle}
      onKeyDown={mobileSidebar.toggle}
      aria-label="Navigation bar toggle"
      className="navbar__toggle clean-btn"
      type="button"
      tabIndex={0}>
      <IconMenu />
    </button>
  );
}
