/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row } from '@tcp/core/src/components/common/atoms';
// reset
import { reduxForm } from 'redux-form';
import { Grid } from '@tcp/core/src/components/common/molecules';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { normalizePhoneNumber } from '@tcp/core/src/utils/formValidation/signupPhoneNumber';

import { SocialMediaLinks } from '../../../molecules';

import style from '../Footer.style';
import FooterTopSignUpForm from './FooterTopSignUpForm.view';

const emailSignupFieldName = 'signup';
const FooterTopEmailSignUpForm = reduxForm({
  form: 'FooterTopEmailSignUpForm', // a unique identifier for this form
  initialValues: {
    [emailSignupFieldName]: '',
  },
  asyncBlurFields: [emailSignupFieldName],
})(FooterTopSignUpForm);

const smsSignupFieldName = 'footerTopSmsSignup';
const FooterTopSmsSignUpForm = reduxForm({
  form: 'FooterTopSmsSignUpForm', // a unique identifier for this form
  initialValues: {
    [smsSignupFieldName]: '',
  },
  asyncBlurFields: [smsSignupFieldName],
})(FooterTopSignUpForm);

class FooterTopCandidateA extends React.PureComponent {
  render() {
    const {
      emailSignup,
      emailSignupLabels,
      smsSignup,
      smsSignupLabels,
      socialMediaLinks,
      referAFriendButton,
      referAFriend,
      emailSignUpAsyncValidate,
      smsSignUpAsyncValidate,
      submitEmailSubscription,
      submitSmsSubscription,
      emailSubscription,
      smsSubscription,
      openEmailSignUpModal,
      openSmsSignUpModal,
    } = this.props;

    return (
      <Grid className="footer_top_candidate_a">
        <Row>
          {/* ------------ Email Sign Up starts here ----------------- */}
          <Col
            className=""
            colSize={{
              large: 4,
              medium: 4,
              small: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            {/* TODO: Desktop font size is 15px in Zeplin. Need to confirm that as it is not in guideline  */}
            <BodyCopy
              className="heading_text"
              textAlign="center"
              fontSize={['fs12', 'fs12', 'fs16']}
              fontWeight="black"
              data-locator="email_promo_text"
            >
              <RichText richTextHtml={emailSignup.text} />
            </BodyCopy>
            <FooterTopEmailSignUpForm
              labels={emailSignupLabels}
              asyncValidate={emailSignUpAsyncValidate}
              onFormSubmit={submitEmailSubscription}
              subscription={emailSubscription}
              openSuccessModal={openEmailSignUpModal}
              dataLocators={{
                submitButton: 'email_submit_btn',
                inputField: 'enter_email_text_field',
              }}
              fieldName={emailSignupFieldName}
            />
            {/* TODO: Zeplin has ["fs11","fs11", "fs13"], which is not in guidline using following for now  */}
            <BodyCopy
              fontFamily="secondary"
              textAlign="center"
              fontSize={['fs12', 'fs12', 'fs14']}
              component={RichText}
              richTextHtml={emailSignupLabels.termsTextLabel}
            >
              <RichText>{emailSignupLabels.termsTextLabel}</RichText>
            </BodyCopy>
            <div className="divider hide-in-medium-up" />
          </Col>

          {/* ---------- Email Signup ends here ---------- */}

          {/* ---------- SMS Sign Up starts here ---------- */}
          <Col
            className=""
            colSize={{
              large: 4,
              medium: 4,
              small: 6,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            {/* TODO: Desktop font size is 15px in Zeplin. Need to confirm that as it is not in guideline  */}
            <BodyCopy
              className="heading_text"
              textAlign="center"
              fontSize={['fs12', 'fs12', 'fs16']}
              fontWeight="black"
            >
              <RichText richTextHtml={smsSignup.text} />
            </BodyCopy>
            <FooterTopSmsSignUpForm
              labels={smsSignupLabels}
              fieldName={smsSignupFieldName}
              fieldProps={{ normalize: normalizePhoneNumber }}
              asyncValidate={smsSignUpAsyncValidate}
              onFormSubmit={submitSmsSubscription}
              subscription={smsSubscription}
              openSuccessModal={openSmsSignUpModal}
            />
            {/* TODO: Zeplin has ["fs11","fs11", "fs13"], which is not in guidline using following for now  */}
            <BodyCopy
              fontFamily="secondary"
              textAlign="center"
              fontSize={['fs12', 'fs12', 'fs14']}
              component={RichText}
              richTextHtml={smsSignupLabels.termsTextLabel}
            >
              <RichText>{smsSignupLabels.termsTextLabel}</RichText>
            </BodyCopy>
          </Col>
          <div className="divider hide-in-large-up" />
          {/* ---------- SMS Signup ends here ------------ */}

          {/* ---------- Refer a friend start here-------- */}

          <Col
            className="refer_a_friend_desktop"
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
                  className=""
                  colSize={{
                    large: 7,
                    medium: 4,
                    small: 7,
                  }}
                  ignoreGutter={{
                    small: true,
                  }}
                >
                  <BodyCopy
                    className="heading_text refer_friend_text"
                    textAlign="center"
                    fontSize={['fs12', 'fs12', 'fs16']}
                    fontWeight="black"
                  >
                    <RichText richTextHtml={referAFriend.text} />
                  </BodyCopy>
                </Col>
                <Col
                  colSize={{
                    large: 5,
                    medium: 4,
                    small: 6,
                  }}
                  ignoreGutter={{
                    small: false,
                  }}
                  className="candidate_a_inline_container_button"
                >
                  <Button
                    id="extole_zone_global_footer"
                    buttonVariation="variable-width"
                    type="refer_a"
                    data-locator="refer_a_btn"
                  >
                    {referAFriendButton.text}
                  </Button>
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
            className="hide-in-large-up refer_a_frient_last_colm"
            colSize={{
              large: 0,
              medium: 4,
              small: 12,
            }}
            ignoreGutter={{
              small: true,
            }}
          >
            <SocialMediaLinks {...socialMediaLinks} />
          </Col>
        </Row>
        <div className="divider hide-in-medium-down" />
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
    placeholderText: PropTypes.string,
    validationErrorLabel: PropTypes.string,
    termsTextLabel: PropTypes.string,
    submitButtonLabel: PropTypes.string,
  }),
  smsSignupLabels: PropTypes.shape({
    placeholderText: PropTypes.string,
    validationErrorLabel: PropTypes.string,
    termsTextLabel: PropTypes.string,
    submitButtonLabel: PropTypes.string,
  }),
  socialMediaLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon_class: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  referAFriend: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  referAFriendButton: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  showError: PropTypes.bool,
  isEmailValid: PropTypes.bool,
  emailSignUpAsyncValidate: PropTypes.func,
  smsSignUpAsyncValidate: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  submitSmsSubscription: PropTypes.func,
  openEmailSignUpModal: PropTypes.func,
  openSmsSignUpModal: PropTypes.func,
  emailSubscription: PropTypes.shape({}),
  smsSubscription: PropTypes.shape({}),
};

FooterTopCandidateA.defaultProps = {
  emailSignup: {
    text: 'GET $10 OFF BY SIGNING UP FOR EMAIL!',
    title: '',
  },
  smsSignup: {
    text: 'GET $10 OFF BY SIGNING UP FOR SMS!',
    title: '',
  },
  emailSignupLabels: {
    placeholderText: 'Enter email address',
    validationErrorLabel: '',
    termsTextLabel:
      '*Applies to new email subscribers only. Exclusions apply. Offer valid onyour next purchase of $40 or more. You may withdraw your consent at any time. Contact Us The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
    submitButtonLabel: 'Submit',
  },
  smsSignupLabels: {
    placeholderText: 'Enter phone number',
    validationErrorLabel: '',
    termsTextLabel:
      '*Applies to new email subscribers only. Exclusions apply. Offer valid onyour next purchase of $40 or more. You may withdraw your consent at any time. Contact Us The Children’s Place, 500 Plaza Drive, Secaucus, NJ 07094, www.childrensplace.com.',
    submitButtonLabel: 'Submit',
  },
  referAFriend: {
    title: '$10 for a friend, $10 for you!',
    text: '$10 for a friend, $10 for you!',
  },
  referAFriendButton: {
    title: 'REFER FRIEND',
    text: 'REFER FRIEND',
  },
  showError: false,
  isEmailValid: false,
  emailSignUpAsyncValidate: () => Promise.resolve(),
  smsSignUpAsyncValidate: () => {},
  submitEmailSubscription: () => {},
  submitSmsSubscription: () => {},
  openEmailSignUpModal: () => {},
  openSmsSignUpModal: () => {},
  emailSubscription: {},
  smsSubscription: {},
};

export default withStyles(FooterTopCandidateA, style);

export { FooterTopCandidateA as FooterTopCandidateAVanilla };
