import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { showOverlay, closeOverlay } from '@tcp/core/src/utils';
import style from './Drawer.style';

/**
 * Determines if Drawer is not required on all view ports
 * @param {Bool} small
 * @param {Bool} medium
 * @param {Bool} large
 */
const isDrawerNotRequiredOnAllViewports = (small, medium, large) => {
  return !(small && medium && large);
};

const hideOnViewport = viewport => {
  return `${!viewport.small ? 'display-small-none' : ''} ${
    !viewport.medium ? 'display-medium-none' : ''
  } ${!viewport.large ? 'display-large-none' : ''}`;
};

const showOnViewport = viewport => {
  return `${viewport.small ? 'display-small-none' : ''} ${
    viewport.medium ? 'display-medium-none' : ''
  } ${viewport.large ? 'display-large-none' : ''}`;
};

const Drawer = props => {
  const { children, className, small, medium, large, open, id, close, renderOverlay } = props;

  let openDrawer = open;
  if (typeof open === 'string') {
    openDrawer = open === id;
  }
  if (close && renderOverlay) {
    closeOverlay();
  }
  if (openDrawer && renderOverlay) {
    showOverlay();
  }
  const classToOpen = openDrawer ? 'tcp-drawer__isOpen' : '';
  const classToHideOnViewports = hideOnViewport({ small, medium, large });
  const classToShowOnViewports = showOnViewport({ small, medium, large });

  return (
    <div className={className}>
      {// If Drawer is not required on all viewports then duplicate the DOM for the children without Drawer
      // User will have to handle display of this element with CSS
      isDrawerNotRequiredOnAllViewports(small, medium, large) && (
        <div className={`${classToShowOnViewports}`}>{children}</div>
      )}
      {openDrawer && (
        <React.Fragment>
          <aside className={`tcp-drawer ${classToOpen} ${classToHideOnViewports}`}>
            <div className="tcp-drawer-content">{children}</div>
          </aside>
        </React.Fragment>
      )}
    </div>
  );
};

Drawer.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  close: PropTypes.bool.isRequired,
  renderOverlay: PropTypes.bool,
};

Drawer.defaultProps = {
  small: false,
  medium: false,
  large: false,
  renderOverlay: false,
};

export { Drawer as DrawerVanilla };
export default withStyles(Drawer, style);
