/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, TextBox } from '@tcp/core/src/components/common/atoms';
// reset
import { Field, reduxForm } from 'redux-form';
import { Grid } from '@tcp/core/src/components/common/molecules';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import { SocialMediaLinks } from '../../../molecules';

import style from '../Footer.style';

const FooterTopCandidateA = props => {
  const {
    className,
    buttonConfig,
    showError,
    formViewConfig,
    isEmailValid,
    socialMediaLinks,
    referAFriendButton,
    referAFriend,
  } = props;

  return (
    <Grid className={`${className} footer_top_candidate_a`}>
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
          >
            <RichText richTextHtml={buttonConfig.text} />
          </BodyCopy>
          <Grid>
            <Row fullBleed>
              <Col
                className=""
                colSize={{
                  large: 8,
                  medium: 4,
                  small: 4,
                }}
                ignoreGutter={{
                  small: false,
                }}
              >
                <Field
                  placeholder={formViewConfig.placeholderText}
                  name="signup"
                  id="signup"
                  type="text"
                  component={TextBox}
                  maxLength={50}
                  dataLocator="email_address_field"
                />
                {/* onChange={this.onSignUpInputChange} */}
                {/* onBlur={this.onSignUpInputBlur} */}
                {/* className={validationClass} */}
                {/* showSuccessCheck={isEmailValid === 'valid'} */}
                {showError && (
                  <BodyCopy fontSize="fs12" fontFamily="secondary" color="secondary.dark">
                    {formViewConfig.validationErrorLabel}
                  </BodyCopy>
                )}
              </Col>
              <Col
                colSize={{
                  large: 4,
                  medium: 4,
                  small: 2,
                }}
                ignoreGutter={{
                  small: true,
                }}
                className="candidate_a_inline_container_button"
              >
                {/* TODO: Need to update this to boolean maybe; disabled={isEmailValid !== 'valid'} */}
                <Button
                  disabled={isEmailValid}
                  buttonVariation="variable-width"
                  type="submit"
                  data-locator="submit_btn"
                >
                  {formViewConfig.submitButtonLabel}
                </Button>
              </Col>
            </Row>
          </Grid>
          {/* TODO: Zeplin has ["fs11","fs11", "fs13"], which is not in guidline using following for now  */}
          {/* <BodyCopy
            fontFamily="secondary"
            textAlign="center"
            fontSize={['fs12', 'fs12', 'fs14']}
            component={RichText}
            richTextHtml={formViewConfig.termsTextLabel}
          /> */}
          <BodyCopy fontFamily="secondary" textAlign="center" fontSize={['fs12', 'fs12', 'fs14']}>
            {formViewConfig.termsTextLabel}
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
          Hala
        </Col>
        <div className="divider hide-in-large-up" />
        {/* ---------- SMS Signup ends here ------------ */}

        {/* ---------- Refer a friend start here-------- */}

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
          <Grid>
            <Row fullBleed>
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
                <Button buttonVariation="variable-width" type="refer_a" data-locator="refer_a_btn">
                  {referAFriendButton.text}
                </Button>
              </Col>
            </Row>

            <Row fullBleed>
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
                <SocialMediaLinks {...socialMediaLinks} />
              </Col>
            </Row>
          </Grid>
        </Col>
        {/* ---------- Refer a friend ends here-------- */}
      </Row>
      <div className="divider hide-in-medium-down" />
    </Grid>
  );
};

FooterTopCandidateA.propTypes = {
  className: PropTypes.string.isRequired,
  buttonConfig: PropTypes.shape({
    text: PropTypes.string,
    title: PropTypes.string,
  }),
  formViewConfig: PropTypes.shape({
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
};

FooterTopCandidateA.defaultProps = {
  buttonConfig: {
    text: 'GET $10 OFF BY SIGNING UP FOR EMAIL!',
    title: '',
  },
  formViewConfig: {
    placeholderText: 'Enter email address',
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
};

export default withStyles(
  reduxForm({
    form: 'FooterTopCandidateAEmailSignUpForm', // a unique identifier for this form
    initialValues: {
      signup: '',
    },
  })(FooterTopCandidateA),
  style
);

export { FooterTopCandidateA as FooterTopCandidateAVanilla };
