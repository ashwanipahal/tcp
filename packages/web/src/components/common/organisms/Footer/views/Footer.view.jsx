import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, RichText, Row } from '@tcp/core/src/components/common/atoms';
import { BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import FooterMiddleMobile from '@tcp/core/src/components/features/footer/FooterMiddleMobile';
import FooterMiddleDesktop from '@tcp/core/src/components/features/footer/FooterMiddleDesktop/views';
import { getLocator } from '@tcp/core/src/utils';
import EmailSignupWrapper from '../../../molecules/EmailSignupModal/container';
import SmsSignupWrapper from '../../../molecules/SmsSignupModal/container';

import style from '../Footer.style';
import { LegalLinks, Copyright, SocialMediaLinks } from '../../../molecules';

const Footer = ({
  className,
  copyrightText,
  legalLinks,
  navLinks,
  socialMediaLinks,
  emailSignup,
  smsSignup,
  referAFriend,
  referenceID,
  getUserInfoAction,
  getOrderDetailAction,
}) => (
  <footer className={className}>
    <div className="footer-top">
      <Row>
        <Col
          className="footer-top__slots"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
          ignoreGutter={{
            small: true,
          }}
        >
          <EmailSignupWrapper buttonConfig={emailSignup} />
        </Col>
        <Col
          className="footer-top__slots"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
          ignoreGutter={{
            small: true,
            medium: true,
          }}
        >
          <SmsSignupWrapper buttonConfig={smsSignup} />
        </Col>
        <Col
          className="footer-top__slots"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
          ignoreGutter={{
            small: true,
          }}
        >
          <span id="extole_zone_global_footer" title={referAFriend.title}>
            <Button customStyle="shadow-button" data-locator={getLocator('refer_friend')}>
              <RichText richTextHtml={referAFriend.title} />
            </Button>
          </span>
        </Col>
        <Col
          className="footer-top__slot--2"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
        >
          <SocialMediaLinks {...socialMediaLinks} />
        </Col>
      </Row>
    </div>
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
        />
      </Row>
      <Row fullBleed>
        <Col
          colSize={{
            large: 12,
            medium: 8,
            small: 6,
          }}
        >
          <BodyCopy className="reference-id" bodySize="five" tag="p">
            {referenceID}
          </BodyCopy>
        </Col>
      </Row>
    </div>
  </footer>
);

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
  socialMediaLinks: PropTypes.shape({
    icon_class: PropTypes.string,
    title: PropTypes.string,
  }),
  emailSignup: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  smsSignup: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  referAFriend: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  referenceID: PropTypes.string,
  getUserInfoAction: PropTypes.func.isRequired,
  getOrderDetailAction: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
  socialMediaLinks: [],
  emailSignup: {},
  smsSignup: {},
  referAFriend: {},
  referenceID: '',
};

export default withStyles(Footer, style);
export { Footer as FooterVanilla };
