import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, Col, Row, TextItems, BodyCopy } from '@tcp/core/src/components/common/atoms';
import { getLocator } from '@tcp/core/src/utils';
import SocialMediaLinks from '../SocialMediaLinks';

/* TODO move to component itself */
import style from '../../Footer.style';

const FooterTopCandidateB = props => {
  const {
    referAFriend,
    socialMediaLinks,
    openEmailSignUpModal,
    openSmsSignUpModal,
    emailSignup,
    smsSignup,
    isNavigationFooter,
  } = props;

  return (
    <div className="footer-top content-wrapper">
      <Row>
        <Col
          className="footer-top__slots col-md-half-width"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
          ignoreGutter={{
            small: true,
          }}
        >
          <Button
            customStyle="shadow-button"
            title={emailSignup.title}
            onClick={openEmailSignUpModal}
            dataLocator="footer_email_signup_btn"
            className="candidate-b_buttons"
          >
            <BodyCopy component="div" fontWeight="black" fontSize="fs15" className="heading_text">
              <TextItems textItems={emailSignup.textItems} />
            </BodyCopy>
          </Button>
        </Col>
        <Col
          className="footer-top__slots col-md-half-width"
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
          <Button
            dataLocator="footer_sms_signup_btn"
            customStyle="shadow-button"
            title={smsSignup.title}
            onClick={openSmsSignUpModal}
            className="candidate-b_buttons"
          >
            <BodyCopy component="div" fontWeight="black" fontSize="fs15" className="heading_text">
              <TextItems textItems={smsSignup.textItems} />
            </BodyCopy>
          </Button>
        </Col>
        <Col
          className="footer-top__slots col-md-half-width"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
          ignoreGutter={{
            small: true,
          }}
        >
          <span
            id={
              isNavigationFooter
                ? 'extole_zone_global_navigation_footer'
                : 'extole_zone_global_footer'
            }
            title={referAFriend.title}
          >
            <Button
              customStyle="shadow-button"
              data-locator={getLocator('refer_friend')}
              className="candidate-b_buttons"
            >
              <BodyCopy component="div" fontWeight="black" fontSize="fs15" className="heading_text">
                <TextItems textItems={referAFriend.textItems} />
              </BodyCopy>
            </Button>
          </span>
        </Col>
        <Col
          className="footer-top__slot--2 col-md-half-width"
          colSize={{
            large: 3,
            medium: 4,
            small: 6,
          }}
        >
          <SocialMediaLinks {...socialMediaLinks} className="social-media-links" />
        </Col>
      </Row>
    </div>
  );
};

FooterTopCandidateB.propTypes = {
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
  openEmailSignUpModal: PropTypes.func,
  openSmsSignUpModal: PropTypes.func,
  isNavigationFooter: PropTypes.bool,
};

FooterTopCandidateB.defaultProps = {
  copyrightText: '',
  legalLinks: [],
  navLinks: [],
  socialMediaLinks: [],
  emailSignup: {},
  smsSignup: {},
  referAFriend: {},
  referenceID: '',
  openEmailSignUpModal: () => {},
  openSmsSignUpModal: () => {},
  isNavigationFooter: false,
};

export default withStyles(FooterTopCandidateB, style);
export { FooterTopCandidateB as FooterTopCandidateBVanilla };
