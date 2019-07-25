import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '../molecules/Drawer';
import NavBar from '../organisms/NavBar';

const Navigation = props => {
  const { openNavigationDrawer } = props;
  return (
    <Drawer
      small
      medium
      open={openNavigationDrawer}
      width={{
        small: '314px',
        medium: '314px',
        large: '100%',
      }}
    >
      <nav className="navigation nav-bar">
        <NavBar {...props} />
      </nav>
    </Drawer>
  );
};

Navigation.propTypes = {
  openNavigationDrawer: PropTypes.bool.isRequired,
};

export default Navigation;
