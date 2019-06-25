import React from 'react'; //eslint-disable-line
import Anchor from '../../../../common/atoms/Anchor';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/MyAccountLayout.style';

// @flow
type Props = {
  navData: Array<Object>,
  active: String,
  className: String,
};

type NavProps = {
  nav: Object,
  active: String,
};

type SubSectionProps = {
  nav: Object,
};

/**
 * @function getNavLink This function renders each link present in the left nav
 * @param {nav} nav Each Link data is passed in nav Object
 * NOTE:-  Used the next Link, will change it to atom Anchor once the as attribute in common Achor Atom gets resolved
 */
const getNavLink = ({ nav, active }: NavProps) => {
  const selectedNav = active === nav.component;
  return (
    <Anchor
      asPath={nav.url}
      to={nav.href}
      anchorVariation={selectedNav ? 'primary' : 'grayed'}
      fontSizeVariation="large"
      fontWeightVariation={selectedNav && 'active'}
    >
      {nav.displayName}
    </Anchor>
  );
};

/**
 * @function renderSubSections This function renders each subSection link present in the left nav
 * @param {nav} nav Each Link data is passed in nav Object
 */
const renderSubSections = ({ nav }: SubSectionProps) => {
  return (
    <ul className="nav-sub-section">
      {nav.subSections.map(subSection => {
        return (
          <li id={subSection.id} key={subSection.id} className="nav-link-wrapper">
            {getNavLink({ nav: subSection })}
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
const MyAccountLeftNav = ({ navData, active, className }: Props) => {
  return (
    <React.Fragment>
      <ul className={className}>
        {navData &&
          navData.map(nav => {
            return (
              <li id={nav.id} key={nav.id} className="nav-link-wrapper">
                {getNavLink({ nav, hasSubSections: nav.subSections, active })}
                {nav.subSections && renderSubSections({ nav })}
              </li>
            );
          })}
      </ul>
    </React.Fragment>
  );
};

export default withStyles(MyAccountLeftNav, styles);
export { MyAccountLeftNav as MyAccountLeftNavVanilla };
