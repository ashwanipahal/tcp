import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import L1NavItem from '../../molecules/L1NavItem';
import style from './NavBar.style';

const NavBar = props => {
  const { nav: navigationData, className } = props;

  return (
    <React.Fragment>
      <ul data-locator="nav_bar_l1" className={`${className} nav-bar-l1`}>
        {navigationData.map((navL1Item, index) => (
          <L1NavItem
            dataLocator={`l1menu_link_${index}`}
            index={index}
            key={`l1menu_link_${index.toString()}`}
            {...navL1Item}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  nav: PropTypes.shape([]).isRequired,
  className: PropTypes.string.isRequired,
};

export { NavBar as NavBarVanilla };
export default withStyles(NavBar, style);
