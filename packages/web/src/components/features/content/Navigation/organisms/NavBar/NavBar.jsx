import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errorBoundary from '@tcp/core/src/components/common/hoc/withErrorBoundary/errorBoundary';
import L1NavItem from '../../molecules/L1NavItem';
import style from './NavBar.style';
import L2Panel from '../../molecules/L2Panel';
import Drawer from '../../molecules/Drawer';

const NavBar = props => {
  const {
    nav: navigationData,
    className,
    openL2Drawer,
    openDrawer,
    closeDrawer,
    hideL2Drawer,
    openL3Drawer,
    hideL3Drawer,
    l3Drawer,
    removeL1Focus,
    accessibilityLabels,
    closeNav,
    breadCrumbTrail,
  } = props;

  return (
    <React.Fragment>
      <ul className={`${className} nav-bar-l1 content-wrapper`}>
        {navigationData &&
          navigationData.map((navL1Item, index) => {
            let categoryLayout = [];
            let sizesRange = [];
            const settings = {};
            const stringId = index.toString();
            if (navL1Item.categoryContent.mainCategory) {
              const { mainCategory } = navL1Item.categoryContent;
              const { categoryLayout: catLayout, sizesRange: sizRange, set } = mainCategory;
              categoryLayout = catLayout;
              sizesRange = sizRange;
              if (set) {
                set.forEach(({ key, value }) => {
                  settings[key] = value;
                });
              }
            }
            return (
              <L1NavItem
                dataLocator={`l1menu_link_${index}`}
                breadCrumbTrail={breadCrumbTrail}
                index={index}
                key={`l1menu_link_${stringId}`}
                sizesRange={sizesRange}
                onClick={() => {
                  openL2Drawer(`l2-drawer-${stringId}`)();
                  const drawerElement = document.getElementById('tcp-nav-drawer');
                  if (drawerElement) {
                    drawerElement.scrollTop = 0;
                  }
                }}
                // showOnlyOnApp={typeof settings.showOnlyOnApp !== 'undefined'}
                removeL1Focus={removeL1Focus}
                {...navL1Item}
              >
                <Drawer
                  id={`l2-drawer-${stringId}`}
                  small
                  medium
                  open={openDrawer}
                  close={closeDrawer}
                  width={{
                    small: '314px',
                    medium: '314px',
                    large: '100%',
                  }}
                  position={{
                    top: 0,
                    left: 0,
                  }}
                  height="100%"
                >
                  <L2Panel
                    categoryLayout={categoryLayout}
                    panelData={navL1Item.subCategories}
                    name={navL1Item.categoryContent.name}
                    hideL2Drawer={hideL2Drawer(`l2-drawer-${stringId}`)}
                    className="nav-bar-l2"
                    l1Index={index}
                    openL3Drawer={openL3Drawer}
                    hideL3Drawer={hideL3Drawer}
                    l3Drawer={l3Drawer}
                    accessibilityLabels={accessibilityLabels}
                    closeNav={closeNav}
                  />
                </Drawer>
              </L1NavItem>
            );
          })}
      </ul>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  nav: PropTypes.shape([]).isRequired,
  className: PropTypes.string.isRequired,
  mainCategory: PropTypes.shape({}),
  accessibilityLabels: PropTypes.shape({}).isRequired,
  openL2Drawer: PropTypes.func.isRequired,
  hideL2Drawer: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired,
  openDrawer: PropTypes.string.isRequired,
  closeDrawer: PropTypes.bool.isRequired,
  openL3Drawer: PropTypes.func.isRequired,
  hideL3Drawer: PropTypes.func.isRequired,
  l3Drawer: PropTypes.shape({}).isRequired,
  removeL1Focus: PropTypes.bool.isRequired,
  breadCrumbTrail: PropTypes.shape([]).isRequired,
};

NavBar.defaultProps = {
  mainCategory: {},
};

export { NavBar as NavBarVanilla };
export default withStyles(errorBoundary(NavBar), style);
