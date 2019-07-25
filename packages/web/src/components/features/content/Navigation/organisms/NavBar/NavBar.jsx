import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import L1NavItem from '../../molecules/L1NavItem';
import style from './NavBar.style';

const NavBar = props => {
  const { nav: navigationData, className } = props;

  return (
    <React.Fragment>
      <ul className={`${className} nav-bar-l1`}>
        {navigationData.map(navL1Item => (
          <L1NavItem {...navL1Item} />
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
