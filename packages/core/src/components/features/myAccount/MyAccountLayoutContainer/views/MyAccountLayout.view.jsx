// @flow
import React from 'react';
// eslint-disable-next-line
import { withRouter } from 'next/router';
// eslint-disable-next-line
import Link from 'next/link';
// import Anchor from '../../../../common/atoms/Anchor';
import MyAccountStyle from '../styles/MyAccount.style';
// import Grid from '../../../../common/molecules/Grid';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

type Props = {
  router: Object,
  navData: Array<Object>,
  mainContent: Function,
};

type State = {
  selected: string,
};

/**
 * @function MyAccountLayoutView The AccountLayout component will provide a list of left
 * navigationLinks and the component associated with it
 * The main component will include this Layout and pass the component to render on the right panel
 * @param {router} router Router object to get the asPath key
 * @param {navData} navData The list of links in the left nav as config object
 * @param {mainContent} mainContent The component to be rendered on the right side
 */
class MyAccountLayoutView extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getNavLink = this.getNavLink.bind(this);
    this.renderSubSections = this.renderSubSections.bind(this);
    const { router } = props;
    this.state = {
      selected: router.asPath,
    };
  }

  /**
   * @function getNavLink This function renders each link present in the left nav
   * @param {nav} nav Each Link data is passed in nav Object
   * NOTE:-  Used the next Link, will change it to atom Anchor once the as attribute in common Achor Atom gets resolved
   */
  getNavLink = ({ nav }) => {
    const { selected } = this.state;
    const selectedNav = selected === nav.url;
    return (
      <Link
        as={nav.url}
        href={`${nav.component}`}
        anchorVariation="primary"
        target="_self"
        scroll={false}
        fontSizeVariation="small"
      >
        <a href={nav.url} className={selectedNav && 'selected'}>
          {nav.displayName}
        </a>
      </Link>
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
    const { navData, mainContent: MainContent } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col colSize={{ large: 2, medium: 8, small: 6 }}>
            <MyAccountStyle>
              {navData &&
                navData.map(nav => {
                  return (
                    <li key={nav.id}>
                      {this.getNavLink({ nav, hasSubSections: nav.subSections })}
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

export default withRouter(MyAccountLayoutView);
