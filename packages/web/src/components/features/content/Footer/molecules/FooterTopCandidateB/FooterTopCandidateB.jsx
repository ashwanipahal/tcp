import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Button, Col, Row, TextItems } from '@tcp/core/src/components/common/atoms';
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
  } = props;

  return (
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
          <Button
            customStyle="shadow-button"
            title={emailSignup.title}
            onClick={openEmailSignUpModal}
            dataLocator="footer_email_signup_btn"
          >
            <TextItems textItems={emailSignup.textItems} />
            {/* <RichText richTextHtml={emailSignup.text} /> */}
          </Button>
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
          <Button
            dataLocator="footer_sms_signup_btn"
            customStyle="shadow-button"
            title={smsSignup.title}
            onClick={openSmsSignUpModal}
          >
            <TextItems textItems={smsSignup.textItems} />
            {/* <RichText richTextHtml={smsSignup.text} /> */}
          </Button>
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
              <TextItems textItems={referAFriend.textItems} />
              {/* <RichText richTextHtml={referAFriend.text} /> */}
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
};

export default withStyles(FooterTopCandidateB, style);
export { FooterTopCandidateB as FooterTopCandidateBVanilla };
