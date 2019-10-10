import React from 'react';
import PropTypes from 'prop-types';
import Anchor from '../../../../common/atoms/Anchor';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/MyAccountLayout.style';

/**
 * @function getNavLink This function renders each link present in the left nav
 * @param {nav} nav Each Link data is passed in nav Object
 * NOTE:-  Used the next Link, will change it to atom Anchor once the as attribute in common Achor Atom gets resolved
 */
const getNavLink = (navObj, selectedSubNav) => {
  const { nav, active } = navObj;
  const selectedNav = active === nav.component;
  return (
    <Anchor
      asPath={nav.url}
      to={nav.href}
      anchorVariation={selectedNav || selectedSubNav ? 'primary' : 'grayed'}
      fontSizeVariation="large"
      fontWeightVariation={selectedNav || selectedSubNav ? 'active' : ''}
    >
      {nav.displayName}
    </Anchor>
  );
};

/**
 * @function renderSubSections This function renders each subSection link present in the left nav
 * @param {nav} nav Each Link data is passed in nav Object
 */
const renderSubSections = navObj => {
  const { nav, activeSubComponent } = navObj;
  return (
    <ul className="nav-sub-section">
      {nav.subSections.map(subSection => {
        const selectedSubNav = subSection.component === activeSubComponent;
        return (
          <li id={subSection.id} key={subSection.id} className="nav-link-wrapper">
            {getNavLink({ nav: subSection }, selectedSubNav)}
          </li>
        );
      })}
    </ul>
  );
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
const MyAccountLeftNav = ({ navData, active, className, activeSubComponent }) => {
  return (
    <React.Fragment>
      <ul className={className}>
        {navData &&
          navData.map(nav => {
            return (
              <li id={nav.id} key={nav.id} className="nav-link-wrapper">
                {getNavLink({ nav, hasSubSections: nav.subSections, active })}
                {active === nav.component &&
                  nav.subSections &&
                  nav.subSections.length !== 0 &&
                  renderSubSections({ nav, activeSubComponent })}
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
};

MyAccountLeftNav.propTypes = {
  navData: PropTypes.shape([]).isRequired,
  active: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  activeSubComponent: PropTypes.string.isRequired,
};

export default withStyles(MyAccountLeftNav, styles);
export { MyAccountLeftNav as MyAccountLeftNavVanilla };
