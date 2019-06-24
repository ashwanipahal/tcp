import React from 'react'; //eslint-disable-line
import Link from 'next/link'; //eslint-disable-line
import MyAccountStyle from '../styles/MyAccountLayout.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import Anchor from '../../../../common/atoms/Anchor';

// @flow
type Props = {
  navData: Array<Object>,
  mainContent: Function,
  selectedComponent: String,
};

type State = {
  selected: string,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
class MyAccountLayoutView extends React.PureComponent<Props, State> {
  /**
   * @function getNavLink This function renders each link present in the left nav
   * @param {nav} nav Each Link data is passed in nav Object
   * NOTE:-  Used the next Link, will change it to atom Anchor once the as attribute in common Achor Atom gets resolved
   */
  getNavLink = ({ nav, selectedComponent }) => {
    const selectedNav = selectedComponent === nav.component;
    return (
      <Anchor
        asPath={nav.url}
        to={nav.href}
        className={selectedNav && 'selected'}
        anchorVariation={selectedNav ? 'primary' : 'disabled'}
        fontSizeVariation="large"
        fontWeightVariation={selectedNav && 'bold'}
      >
        {nav.displayName}
      </Anchor>
    );
  };

  /**
   * @function renderSubSections This function renders each subSection link present in the left nav
   * @param {nav} nav Each Link data is passed in nav Object
   */
  renderSubSections = ({ nav }) => {
    return (
      <MyAccountStyle>
        {nav.subSections.map(subSection => {
          return (
            <li key={subSection.id}>{this.getNavLink({ nav: subSection, isSubSection: true })}</li>
          );
        })}
      </MyAccountStyle>
    );
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
  render() {
    const { navData, mainContent: MainContent, selectedComponent } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col colSize={{ large: 2, medium: 8, small: 6 }}>
            <MyAccountStyle>
              {navData &&
                navData.map(nav => {
                  return (
                    <li id={nav.id} key={nav.id}>
                      {this.getNavLink({ nav, hasSubSections: nav.subSections, selectedComponent })}
                      {nav.subSections && this.renderSubSections({ nav })}
                    </li>
                  );
                })}
            </MyAccountStyle>
          </Col>
          <Col colSize={{ large: 10, medium: 8, small: 6 }}>
            <MainContent />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default MyAccountLayoutView;
