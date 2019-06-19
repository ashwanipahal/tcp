import React from 'react';
import classnames from 'classnames';
// eslint-disable-next-line
import { withRouter } from 'next/router';
// eslint-disable-next-line
import Link from 'next/link';
// import Anchor from '../../../../common/atoms/Anchor';
import MyAccountStyle from '../styles/MyAccount.style';
// import Grid from '../../../../common/molecules/Grid';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

class MyAccountLayoutView extends React.PureComponent {
  constructor(props) {
    super(props);
    const { router } = props;
    this.state = {
      selected: router.asPath,
    };
    this.getNavLink = this.getNavLink.bind(this);
    this.renderSubSections = this.renderSubSections.bind(this);
  }

  getNavLink = ({ nav, hasSubSections = false, isSubSection = false }) => {
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
        <a className={classnames(selectedNav ? 'selected' : 'default')}>{nav.displayName}</a>
      </Link>
    );
  };

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

  render() {
    const { router, navData, mainContent: MainContent } = this.props;
    const { selected } = this.state;
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
