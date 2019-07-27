/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import L1NavItem from '../../molecules/L1NavItem';
import style from './NavBar.style';
import L2Panel from '../../molecules/L2Panel/L2Panel';

const NavBar = props => {
  const {
    nav: navigationData,
    className,
    openL2Panel,
    closeL2Panel,
    panelData,
    openPanel,
    order,
  } = props;

  return (
    <React.Fragment>
      <ul className={`${className} nav-bar-l1`}>
        {navigationData.map((navL1Item, index) => (
          <L1NavItem
            dataLocator={`l1menu_link_${index}`}
            index={index}
            key={`l1menu_link_${index.toString()}`}
            onFocus={openL2Panel(navL1Item.subCategories, Object.keys(navL1Item.subCategories))}
            onMouseOver={openL2Panel(navL1Item.subCategories, Object.keys(navL1Item.subCategories))}
            onBlur={closeL2Panel}
            onMouseOut={closeL2Panel}
            {...navL1Item}
          />
        ))}
      </ul>
      <L2Panel order={order} panelData={panelData} openPanel={openPanel} />
    </React.Fragment>
  );
};

NavBar.propTypes = {
  nav: PropTypes.shape([]),
  className: PropTypes.string.isRequired,
  openL2Panel: PropTypes.func.isRequired,
  closeL2Panel: PropTypes.func.isRequired,
  panelData: PropTypes.shape([]),
  openPanel: PropTypes.bool,
  order: PropTypes.shape([]),
};

NavBar.defaultProps = {
  nav: [],
  panelData: {},
  openPanel: false,
  order: [],
};

export { NavBar as NavBarVanilla };
export default withStyles(NavBar, style);
