import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { CountrySelector } from '../../Header/molecules';

import {
  FooterMiddleMobile,
  FooterMiddleDesktop,
  LegalLinks,
  Copyright,
  FooterTopCandidateA,
  FooterTopCandidateB,
} from '../molecules';
import { EmailSignupModal, SmsSignupModal } from '../../../../common/molecules';
import style from '../Footer.style';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFooterTopCandidateB: false,
    };
  }

  componentDidMount() {
    // TODO: Need to change this when proper solution for A/B test come
    if (window.location.search.match('cand-b')) {
      this.setState({ showFooterTopCandidateB: true });
    } else {
      this.setState({ showFooterTopCandidateB: false });
    }
  }

  render() {
    const { props } = this;
    const {
      className,
      copyrightText,
      legalLinks,
      navLinks,
      referenceID,
      getUserInfoAction,
      getOrderDetailAction,
      emailSignup,
      smsSignup,
    } = props;
    const { showFooterTopCandidateB } = this.state;

    return (
      <footer className={className}>
        {showFooterTopCandidateB ? (
          <FooterTopCandidateB {...props} />
        ) : (
          <FooterTopCandidateA {...props} />
        )}
        <EmailSignupModal buttonConfig={emailSignup} />
        <SmsSignupModal buttonConfig={smsSignup} />
        <Row className="footer-middle mobile" fullBleed>
          <FooterMiddleMobile className={className} navLinkItems={navLinks} />
        </Row>
        <Row className="footer-middle desktop">
          <FooterMiddleDesktop className={className} navLinks={navLinks} />
        </Row>
        <div className="footer-bottom">
          <Row className="fullbleed-mobile">
            <Col
              className="footer-bottom__slot--1 default-offset"
              colSize={{
                large: 4,
                medium: 8,
                small: 6,
              }}
            >
              <Copyright>{copyrightText}</Copyright>
              <div className="poc-hide">
                <Button onClick={getUserInfoAction}>Get Registered User Info</Button>
                <Button onClick={getOrderDetailAction}>Get Order detail</Button>
              </div>
            </Col>
            <Col
              className="footer-bottom__slot--2 default-offset"
              colSize={{
                large: 6,
                medium: 8,
                small: 6,
              }}
            >
              <LegalLinks links={legalLinks} />
            </Col>
            <Col
              className="footer-bottom__slot--3 default-offset"
              colSize={{
                large: 2,
                medium: 8,
                small: 6,
              }}
            >
              <CountrySelector footer />
            </Col>
          </Row>
          <Row fullBleed>
            <Col
              colSize={{
                large: 12,
                medium: 8,
                small: 6,
              }}
            >
              <BodyCopy className="reference-id" fontSize="fs32">
                {referenceID}
              </BodyCopy>
            </Col>
          </Row>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  copyrightText: PropTypes.string,
  navLinks: PropTypes.shape({}),
  legalLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.text,
    })
  ),
  referenceID: PropTypes.string,
  getUserInfoAction: PropTypes.func.isRequired,
  getOrderDetailAction: PropTypes.func.isRequired,
  openEmailSignUpModal: PropTypes.func,
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
  referenceID: '',
  openEmailSignUpModal: () => {},
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
