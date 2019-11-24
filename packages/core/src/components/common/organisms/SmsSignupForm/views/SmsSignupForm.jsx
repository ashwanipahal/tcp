import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage, Anchor } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { isGymboree } from '@tcp/core/src/utils/utils';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';
import SignupConfirm from '../../../molecules/SignupConfirm';
import SignupFormIntro from '../../../molecules/SignupFormIntro';
import smsSignupStyle from '../styles/SmsSignupForm.style';
import config from '../config';

class SmsSignupForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFieldEmpty: true,
    };
  }

  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription, trackSubscriptionSuccess } = this.props;
    if ((subscription.error || subscription.success) && this.formSubmitPromise) {
      if (subscription.error) {
        this.formSubmitPromise.reject();
      } else {
        this.formSubmitPromise.resolve();
        trackSubscriptionSuccess();
      }
      this.formSubmitPromise = null;
    }

    if (subscription.success !== oldSubscription.success && subscription.success) {
      trackSubscriptionSuccess();
    }
  }

  submitForm = formObj => {
    const {
      submitSmsSubscription,
      clearSmsSignupForm,
      validateSignupSmsPhoneNumber,
      formViewConfig: { validationErrorLabel },
    } = this.props;
    const { signupPhoneNumber, optPhoneSignupSecondBrand } = formObj;
    return validateSignupSmsPhoneNumber(signupPhoneNumber)
      .then(subscription => {
        if (subscription.error) {
          return Promise.reject();
        }
        /*
         Faking this because redux-form `submitting` based on promise resolve
       and we will resolve formSubmitPromise only when the state has success flag on
       componentDidUpdate.
       */
        return new Promise((resolve, reject) => {
          clearSmsSignupForm();
          this.formSubmitPromise = { resolve, reject };
          submitSmsSubscription({
            footerTopSmsSignup: signupPhoneNumber,
            isTextOptInSecondBrand: optPhoneSignupSecondBrand,
          });
        });
      })
      .catch(() => {
        const error = {
          signupPhoneNumber: validationErrorLabel,
        };
        throw new SubmissionError({
          ...error,
          _error: error,
        });
      });
  };

  fieldChange = element => {
    const isFieldEmpty = !element.currentTarget.value.trim();
    this.setState({ isFieldEmpty });
  };

  render() {
    const {
      className,
      formViewConfig,
      subscription,
      submitting,
      pristine,
      handleSubmit,
      colProps,
      imageData,
    } = this.props;
    const { left, right } = colProps;
    const { IMG_DATA } = config;
    const { isFieldEmpty } = this.state;
    const isGym = isGymboree();
    return (
      <Fragment>
        {subscription.success ? (
          <Grid className="full-height">
            <Row fullBleed className={`${className} full-height`}>
              <Col
                isNotInlineBlock
                colSize={left}
                hideCol={{ small: true, medium: true }}
                className="img-wrapper"
              >
                <DamImage
                  imgConfigs={IMG_DATA.imgConfig}
                  imgData={
                    imageData && Object.keys(imageData).length > 0
                      ? imageData
                      : {
                          url: formViewConfig.lbl_SignUp_imageSrc,
                          alt: formViewConfig.lbl_SignUp_imageAlt,
                        }
                  }
                />
              </Col>
              <Col
                isNotInlineBlock
                colSize={right}
                ignoreGutter={{ large: true }}
                className="sms-signup-content"
              >
                <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="sms" />
                <Row className="button-wrapper" fullBleed>
                  <Col colSize={{ small: 4, medium: 4, large: 4 }} className="button-container">
                    <Anchor
                      to={formViewConfig.lbl_SignUp_shopNowBtnUrl}
                      asPath={formViewConfig.lbl_SignUp_shopNowBtnUrl}
                      target={formViewConfig.lbl_SignUp_shopNowBtnUrlTarget}
                    >
                      <Button
                        fullWidth
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="shop-button"
                        dataLocator="shop_now_btn"
                      >
                        {formViewConfig.lbl_SignUp_shopNowLabel}
                      </Button>
                    </Anchor>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        ) : (
          <form onSubmit={handleSubmit(this.submitForm)}>
            <Grid>
              <Row fullBleed={{ large: true }} className={`${className} wrapper`}>
                <Col
                  isNotInlineBlock
                  colSize={left}
                  hideCol={{ small: true, medium: true }}
                  className="img-wrapper"
                >
                  <DamImage
                    imgConfigs={IMG_DATA.imgConfig}
                    imgData={
                      imageData && Object.keys(imageData).length > 0
                        ? imageData
                        : {
                            url: formViewConfig.lbl_SignUp_imageSrc,
                            alt: formViewConfig.lbl_SignUp_imageAlt,
                          }
                    }
                  />
                </Col>
                <Col colSize={right}>
                  <SignupFormIntro formViewConfig={formViewConfig} />
                  <Col
                    colSize={{ small: 6, medium: 6, large: 10 }}
                    offsetLeft={{ small: 0, medium: 1, large: 1 }}
                    className="field-container"
                  >
                    <Field
                      placeholder={formViewConfig.lbl_SignUp_placeholderText}
                      name="signupPhoneNumber"
                      id="signupPhoneNumber"
                      type="text"
                      component={TextBox}
                      maxLength={50}
                      dataLocator="sms_address_field"
                      normalize={formatPhoneNumber}
                      enableSuccessCheck={false}
                      onChange={this.fieldChange}
                    />

                    <Field
                      name="optPhoneSignupSecondBrand"
                      id="optPhoneSignupSecondBrand"
                      className="phone-signup-second-brand"
                      component={InputCheckbox}
                      dataLocator={isGym ? 'sms_tcp_opt' : 'sms_gym_opt'}
                      type="checkbox"
                    >
                      {isGym
                        ? formViewConfig.lbl_SignUp_tcpSignUpLabel
                        : formViewConfig.lbl_SignUp_gymSignUpLabel}
                    </Field>

                    <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                      {formViewConfig.lbl_SignUp_termsTextLabel}
                    </BodyCopy>
                  </Col>
                  <Row className="button-wrapper-form" fullBleed>
                    <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                      <Button
                        disabled={isFieldEmpty || pristine || submitting}
                        fullWidth
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="join-button"
                        dataLocator="join_now_btn"
                      >
                        {formViewConfig.lbl_SignUp_joinButtonLabel}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </form>
        )}
      </Fragment>
    );
  }
}

SmsSignupForm.propTypes = {
  buttonConfig: PropTypes.shape({}),
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.func,
  subscription: PropTypes.shape({}),
  submitSmsSubscription: PropTypes.func,
  validateSignupSmsPhoneNumber: PropTypes.func,
  trackSubscriptionSuccess: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
  colProps: PropTypes.shape({
    left: PropTypes.shape({}),
    right: PropTypes.shape({}),
  }),
};

SmsSignupForm.defaultProps = {
  buttonConfig: {},
  className: '',
  subscription: {},
  submitSmsSubscription: () => {},
  trackSubscriptionSuccess: () => {},
  validateSignupSmsPhoneNumber: () => Promise.resolve({}),
  clearSmsSignupForm: () => {},
  handleSubmit: () => {},
  colProps: {},
};

export default withStyles(
  reduxForm({
    form: 'SmsSignupForm',
    initialValues: {
      signupPhoneNumber: '',
    },
  })(SmsSignupForm),
  smsSignupStyle
);
export { SmsSignupForm as SmsSignupFormVanilla };
