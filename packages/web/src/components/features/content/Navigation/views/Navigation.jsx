import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Drawer from '../molecules/Drawer';
import NavBar from '../organisms/NavBar';
import Footer from '../../Footer';
import style from '../Navigation.style';

const Navigation = props => {
  const { openNavigationDrawer, className, closeNavigationDrawer } = props;
  return (
    <Drawer
      id="l1_drawer"
      small
      medium
      open={openNavigationDrawer}
      close={closeNavigationDrawer}
      width={{
        small: '314px',
        medium: '314px',
        large: '100%',
      }}
      position={{
        top: '155px',
        left: 0,
        topMedium: '111px',
      }}
      renderOverlay
      drawerFooter={Footer}
    >
      <nav className={`${className} navigation nav-bar`}>
        <NavBar {...props} />
      </nav>
    </Drawer>
  );
};

Navigation.propTypes = {
  openNavigationDrawer: PropTypes.bool.isRequired,
  closeNavigationDrawer: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};

export { Navigation as NavigationVanilla };
export default withStyles(Navigation, style);
