import React from 'react';
import NavBar from '../organisms/NavBar';

const Navigation = props => (
  <nav className="navigation nav-bar">
    <NavBar {...props} />
  </nav>
);

export default Navigation;
