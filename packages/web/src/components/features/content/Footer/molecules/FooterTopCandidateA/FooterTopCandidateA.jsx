import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  RichText,
  Col,
  Row,
  BodyCopy,
  TextItems,
} from '@tcp/core/src/components/common/atoms';
import { reduxForm } from 'redux-form';
import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { getLocator } from '@tcp/core/src/utils';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';

import SocialMediaLinks from '../SocialMediaLinks';
/* TODO move to component itself */
import style from '../../Footer.style';

import FooterTopSignUpForm from '../FooterTopSignUpForm';

const emailSignupFieldName = 'signup';
const emailSignupSecondBrand = 'isEmailOptInSecondBrand';
const FooterTopEmailSignUpForm = reduxForm({
  form: 'FooterTopEmailSignUpForm', // a unique identifier for this form
  initialValues: {
    [emailSignupFieldName]: '',
    [emailSignupSecondBrand]: false,
  },
})(FooterTopSignUpForm);

const smsSignupFieldName = 'footerTopSmsSignup';
const textSignupSecondBrand = 'isTextOptInSecondBrand';
const FooterTopSmsSignUpForm = reduxForm({
  form: 'FooterTopSmsSignUpForm', // a unique identifier for this form
  initialValues: {
    [smsSignupFieldName]: '',
    [textSignupSecondBrand]: false,
  },
})(FooterTopSignUpForm);

class FooterTopCandidateA extends React.PureComponent {
  render() {
    const {
      emailSignup,
      emailSignupLabels,
      smsSignup,
      smsSignupLabels,
      socialMediaLinks,
      referAFriendButtonLabels,
      referAFriend,
      validateSignupEmail,
      validateSignupSmsPhoneNumber,
      submitEmailSubscription,
      submitSmsSubscription,
      emailSubscription,
      smsSubscription,
      openEmailSignUpModal,
      openSmsSignUpModal,
      isNavigationFooter,
    } = this.props;

    return (
      <Grid className="footer_top_candidate_a content-wrapper">
        <Row>
          {/* ------------ Email Sign Up starts here ----------------- */}
          <Col
            className="col-md-half-width"
            colSize={{
              large: 4,
              medium: 4,
              small: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <BodyCopy
              component="h2"
              fontWeight="black"
              fontSize="fs15"
              className="heading_text email-sign-up"
              dataLocator="email_promo_text"
            >
              <TextItems textItems={emailSignup.textItems} />
            </BodyCopy>
            <FooterTopEmailSignUpForm
              labels={emailSignupLabels}
              validateForm={validateSignupEmail}
              onFormSubmit={submitEmailSubscription}
              subscription={emailSubscription}
              openSuccessModal={openEmailSignUpModal}
              dataLocators={{
                submitButton: 'email_submit_btn',
                inputField: 'enter_email_text_field',
                errorDataLocator: 'email_error_message',
                checkBox_gym: 'check_box_gym_opt_in',
                checkBox_tcp: 'check_box_tcp_opt_in',
              }}
              fieldName={emailSignupFieldName}
              secondFieldName={emailSignupSecondBrand}
            />

            <BodyCopy fontFamily="secondary" textAlign="center" fontSize={['fs9', 'fs9', 'fs12']}>
              <RichText richTextHtml={emailSignupLabels.lbl_SignUp_termsTextLabel} />
            </BodyCopy>
            <div>
              <div className="divider hide-in-medium-up" />
            </div>
          </Col>

          {/* ---------- Email Signup ends here ---------- */}

          {/* ---------- SMS Sign Up starts here ---------- */}
          <Col
            className="col-md-half-width"
            colSize={{
              large: 4,
              medium: 4,
              small: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <BodyCopy
              component="h2"
              fontWeight="black"
              fontSize="fs15"
              className="heading_text sms_sign_up"
              dataLocator="sms_promo_text"
            >
              <TextItems textItems={smsSignup.textItems} />
            </BodyCopy>
            <FooterTopSmsSignUpForm
              labels={smsSignupLabels}
              fieldName={smsSignupFieldName}
              fieldProps={{
                normalize: formatPhoneNumber,
              }}
              validateForm={validateSignupSmsPhoneNumber}
              onFormSubmit={submitSmsSubscription}
              subscription={smsSubscription}
              openSuccessModal={openSmsSignUpModal}
              dataLocators={{
                submitButton: 'sms_submit_btn',
                inputField: 'sms_field',
                errorDataLocator: 'sms_error_message',
                checkBox_gym: 'sms_gym_opt_in',
                checkBox_tcp: 'sms_tcp_opt_in',
              }}
              secondFieldName={textSignupSecondBrand}
            />

            <BodyCopy fontFamily="secondary" textAlign="center" fontSize={['fs9', 'fs9', 'fs12']}>
              <RichText richTextHtml={smsSignupLabels.lbl_SignUp_termsTextLabel} />
            </BodyCopy>
          </Col>
          <div className="divider hide-in-large-up" />
          {/* ---------- SMS Signup ends here ------------ */}

          {/* ---------- Refer a friend start here-------- */}

          <Col
            className="refer_a_friend_desktop col-md-half-width"
            colSize={{
              large: 4,
              medium: 4,
              small: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <Grid>
              <Row fullBleed className="flex-align-center">
                <Col
                  className="col-md-half-width"
                  colSize={{
                    large: 6,
                    medium: 4,
                    small: 7,
                  }}
                  ignoreGutter={{
                    small: true,
                  }}
                >
                  <BodyCopy
                    component="h2"
                    fontWeight="black"
                    fontSize="fs15"
                    className="heading_text refer-a-friend"
                  >
                    <TextItems textItems={referAFriend.textItems} />
                  </BodyCopy>
                </Col>
                <Col
                  colSize={{
                    large: 6,
                    medium: 4,
                    small: 6,
                  }}
                  ignoreGutter={{
                    small: false,
                  }}
                  className="candidate_a_inline_container_button col-md-half-width"
                >
                  <ClickTracker
                    as={Button}
                    id={
                      isNavigationFooter
                        ? 'extole_zone_global_navigation_footer'
                        : 'extole_zone_global_footer'
                    }
                    buttonVariation="variable-width"
                    data-locator={getLocator('refer_friend')}
                    className="refer_a_friend_button"
                    clickData={{
                      customEvents: ['event22', 'event80'],
                      pageShortName: 'content:referafriend  confirmation',
                      pageName: 'content:email confirmation',
                    }}
                  >
                    {referAFriendButtonLabels.text}
                  </ClickTracker>
                </Col>
              </Row>
              <div className="divider hide-in-medium-down" />
              <Row fullBleed className="hide-in-medium-down">
                <Col
                  className=""
                  colSize={{
                    large: 12,
                    medium: 12,
                    small: 12,
                  }}
                  ignoreGutter={{
                    small: true,
                  }}
                >
                  <div className="divider hide-in-medium-up" />
                  <SocialMediaLinks
                    {...socialMediaLinks}
                    className="footer_top_candidate_a_social_links"
                  />
                </Col>
              </Row>
            </Grid>
          </Col>
          {/* ---------- Refer a friend ends here-------- */}
          <div className="divider hide-in-medium-up" />
          <Col
            className="hide-in-large-up refer_a_frient_last_colm col-md-half-width"
            colSize={{
              large: 0,
              medium: 4,
              small: 12,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <SocialMediaLinks {...socialMediaLinks} className="social-media-links" />
          </Col>
        </Row>
      </Grid>
    );
  }
}

FooterTopCandidateA.propTypes = {
  className: PropTypes.string.isRequired,
  emailSignup: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  smsSignup: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  emailSignupLabels: PropTypes.shape({
    lbl_SignUp_placeholderText: PropTypes.string,
    lbl_SignUp_validationErrorLabel: PropTypes.string,
    lbl_SignUp_termsTextLabel: PropTypes.string,
    lbl_SignUp_submitButtonLabel: PropTypes.string,
    lbl_SignUp_gymSignUpLabel: PropTypes.string,
    lbl_SignUp_tcpSignUpLabel: PropTypes.string,
  }),
  smsSignupLabels: PropTypes.shape({
    lbl_SignUp_placeholderText: PropTypes.string,
    lbl_SignUp_validationErrorLabel: PropTypes.string,
    lbl_SignUp_termsTextLabel: PropTypes.string,
    lbl_SignUp_submitButtonLabel: PropTypes.string,
  }),
  socialMediaLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon_class: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  referAFriend: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  referAFriendButtonLabels: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  showError: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  validateSignupEmail: PropTypes.func,
  validateSignupSmsPhoneNumber: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  submitSmsSubscription: PropTypes.func,
  openEmailSignUpModal: PropTypes.func,
  openSmsSignUpModal: PropTypes.func,
  emailSubscription: PropTypes.shape({}),
  smsSubscription: PropTypes.shape({}),
  isNavigationFooter: PropTypes.bool,
};

FooterTopCandidateA.defaultProps = {
  emailSignup: {
    text: '',
    title: '',
  },
  smsSignup: {
    text: '',
    title: '',
  },
  referAFriendButtonLabels: {
    title: '',
    text: '',
  },
  emailSignupLabels: {
    lbl_SignUp_placeholderText: '',
    lbl_SignUp_validationErrorLabel: '',
    lbl_SignUp_termsTextLabel: '',
    lbl_SignUp_submitButtonLabel: '',
    lbl_SignUp_gymSignUpLabel: '',
    lbl_SignUp_tcpSignUpLabel: '',
  },
  smsSignupLabels: {
    lbl_SignUp_placeholderText: '',
    lbl_SignUp_validationErrorLabel: '',
    lbl_SignUp_termsTextLabel: '',
    lbl_SignUp_submitButtonLabel: '',
  },
  referAFriend: {
    title: '',
    text: '',
  },
  showError: false,
  isEmailValid: false,
  validateSignupEmail: () => Promise.resolve(),
  validateSignupSmsPhoneNumber: () => Promise.resolve(),
  submitEmailSubscription: () => {},
  submitSmsSubscription: () => {},
  openEmailSignUpModal: () => {},
  openSmsSignUpModal: () => {},
  emailSubscription: {},
  smsSubscription: {},
  isNavigationFooter: false,
};

export default withStyles(FooterTopCandidateA, style);

export { FooterTopCandidateA as FooterTopCandidateAVanilla };
