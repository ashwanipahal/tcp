import React, { PureComponent, Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage, Anchor } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { isGymboree } from '@tcp/core/src/utils/utils';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';

import SignupConfirm from '../../../molecules/SignupConfirm';
import SignupFormIntro from '../../../molecules/SignupFormIntro';

import styles from '../styles/EmailSignupForm.style';
import config from '../config';

class EmailSignupForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFieldEmpty: true,
    };
  }

  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription, trackSubscriptionSuccess } = this.props;
    if (subscription.success !== oldSubscription.success && subscription.success) {
      if (this.formSubmitPromise) {
        this.formSubmitPromise.resolve();
      }
      trackSubscriptionSuccess();
    } else if (subscription.error && this.formSubmitPromise) {
      this.formSubmitPromise.reject();
    }
  }

  submitForm = formObject => {
    const {
      submitEmailSubscription,
      validateSignupEmail,
      formViewConfig: { validationErrorLabel },
    } = this.props;
    const { emailSignupSecondBrand, signup } = formObject;

    return validateSignupEmail(signup)
      .then(subscription => {
        if (subscription.error) {
          return Promise.reject();
        }

        /* Faking this because redux-form `submitting` based on promise resolve
           and we will resolve formSubmitPromise only when the state has success flag on
           componentDidUpdate
         */
        return new Promise((resolve, reject) => {
          this.formSubmitPromise = { resolve, reject };
          submitEmailSubscription({
            isEmailOptInSecondBrand: emailSignupSecondBrand,
            signup,
          });
        });
      })
      .catch(() => {
        const error = { signup: validationErrorLabel };
        throw new SubmissionError({ ...error, _error: error });
      });
  };

  fieldChange = element => {
    const isFieldEmpty = !element.currentTarget.value.trim();
    this.setState({ isFieldEmpty });
  };

  render() {
    const {
      formViewConfig,
      subscription,
      pristine,
      handleSubmit,
      submitting,
      className,
      colProps = {},
      imageData = {},
    } = this.props;
    const { left, right } = colProps;
    const { IMG_DATA } = config;
    const isGym = isGymboree();
    const { isFieldEmpty } = this.state;
    return (
      <Fragment>
        {subscription.success ? (
          <Grid>
            <Row fullBleed className={className}>
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
              <Col colSize={right} ignoreGutter={{ large: true }}>
                <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="email" />
                <Row className="button-wrapper" fullBleed>
                  <Col colSize={{ small: 4, medium: 4, large: 4 }} className="button-container">
                    <Anchor
                      to={getLabelValue(formViewConfig, 'lbl_SignUp_shopNowBtnUrl')}
                      asPath={getLabelValue(formViewConfig, 'lbl_SignUp_shopNowBtnUrl')}
                      target={getLabelValue(formViewConfig, 'lbl_SignUp_shopNowBtnUrlTarget')}
                    >
                      <Button
                        fullWidth
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="shop-button"
                        dataLocator="shop_now_btn"
                      >
                        {getLabelValue(formViewConfig, 'lbl_SignUp_shopNowLabel')}
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
                      placeholder={getLabelValue(formViewConfig, 'lbl_SignUp_placeholderText')}
                      name="signup"
                      id="modal_signup"
                      type="text"
                      component={TextBox}
                      maxLength={50}
                      dataLocator="email_address_field"
                      enableSuccessCheck={false}
                      onChange={this.fieldChange}
                    />

                    <Field
                      name="emailSignupSecondBrand"
                      id="emailSignupSecondBrand"
                      component={InputCheckbox}
                      dataLocator={isGym ? 'email_tcp_opt' : 'email_gym_opt'}
                      type="checkbox"
                      className="email-signup-second-brand"
                    >
                      {isGym
                        ? getLabelValue(formViewConfig, 'lbl_SignUp_tcpSignUpLabel')
                        : getLabelValue(formViewConfig, 'lbl_SignUp_gymSignUpLabel')}
                    </Field>

                    <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                      {getLabelValue(formViewConfig, 'lbl_SignUp_termsTextLabel')}
                    </BodyCopy>
                  </Col>
                  <Row className="button-wrapper-form" fullBleed>
                    <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                      <Button
                        fullWidth
                        disabled={isFieldEmpty || pristine || submitting}
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="join-button"
                        dataLocator="join_now_btn"
                      >
                        {getLabelValue(formViewConfig, 'lbl_SignUp_joinButtonLabel')}
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

EmailSignupForm.propTypes = {
  buttonConfig: PropTypes.shape({}),
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearEmailSignupForm: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func,
  validateSignupEmail: PropTypes.func,
  trackSubscriptionSuccess: PropTypes.func,
  subscription: PropTypes.shape({}),
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  colProps: PropTypes.shape({}),
  imageData: PropTypes.shape({}),
};

EmailSignupForm.defaultProps = {
  buttonConfig: {},
  submitEmailSubscription: () => {},
  handleSubmit: () => {},
  trackSubscriptionSuccess: () => {},
  validateSignupEmail: () => Promise.resolve({}),
  className: '',
  subscription: {},
  pristine: false,
  submitting: false,
  colProps: {},
  imageData: {},
};
export default withStyles(
  reduxForm({
    form: 'EmailSignupForm',
    initialValues: {
      signup: '',
    },
  })(EmailSignupForm),
  styles
);

export { EmailSignupForm as EmailSignupFormVanilla };
