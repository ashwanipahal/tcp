import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import smsSignupModalStyle from '../SmsSignupModal.style';
import config from '../Config';

class SmsSignupModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validationStarted: false,
    };
  }

  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription } = this.props;
    if ((subscription.error || subscription.success) && this.formSubmitPromise) {
      if (subscription.error) {
        this.formSubmitPromise.reject();
      } else {
        this.formSubmitPromise.resolve();
      }
      this.formSubmitPromise = null;
    }

    if (
      this.modalContentRef &&
      subscription.success !== oldSubscription.success &&
      subscription.success
    ) {
      this.modalContentRef.focus();
    }
  }

  onSignUpInputKeyPress = e => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      this.submitForm();
    }
  };

  onInputBlur = () => {
    this.setState({
      validationStarted: true,
    });
  };

  setModalContentRef = node => {
    this.modalContentRef = node;
  };

  /**
   * Expect redux-form handleSubmit function on props. This can be called to manually and
   * redux-form handleSubmit function has been used to submit form.
   * More information, read redux-form doc handleSubmit prop.
   */
  submitForm = () => {
    const { handleSubmit, submitSmsSubscription, clearSmsSignupForm } = this.props;
    handleSubmit(values => {
      return new Promise((resolve, reject) => {
        clearSmsSignupForm();
        this.formSubmitPromise = { resolve, reject };
        submitSmsSubscription(values.signupPhoneNumber);
      }).catch(() => {
        const {
          formViewConfig: { validationErrorLabel },
        } = this.props;
        const error = { signupPhoneNumber: validationErrorLabel };
        throw new SubmissionError({ ...error, _error: error });
      });
    })();
  };

  closeModal = () => {
    const { closeModal, clearSmsSignupForm, reset } = this.props;
    closeModal();
    reset();
    clearSmsSignupForm();
    this.setState({
      validationStarted: false,
    });
  };

  render() {
    const {
      isModalOpen,
      className,
      formViewConfig,
      subscription,
      submitting,
      pristine,
      invalid,
      asyncValidating,
      submitSucceeded,
    } = this.props;
    const { validationStarted = false } = this.state;

    const { IMG_DATA } = config;

    return (
      <Fragment>
        <Modal
          contentRef={this.setModalContentRef}
          isOpen={isModalOpen}
          colSet={{ small: 6, medium: 6, large: 8 }}
          className={className}
          overlayClassName="TCPModal__Overlay"
          onRequestClose={this.closeModal}
          noPadding
          widthConfig={{ small: '375px', medium: '458px', large: '851px' }}
          heightConfig={{ minHeight: '500px', height: '560px', maxHeight: '560px' }}
          closeIconDataLocator={
            subscription.success ? 'thank_you_modal_close_btn' : 'sms_signup_modal_close_btn'
          }
          contentLabel={`${formViewConfig.lbl_SignUp_signUpForLabel} ${
            formViewConfig.lbl_SignUp_offerTypeLabel
          }`}
          aria={{
            describedby: subscription.success
              ? 'sign-up-modal-confirm-view'
              : 'sign-up-modal-form-intro-view',
          }}
        >
          {subscription.success ? (
            <Grid>
              <Row fullBleed>
                <Col
                  isNotInlineBlock
                  colSize={{ small: 4, medium: 4, large: 4 }}
                  hideCol={{ small: true, medium: true }}
                  className="img-wrapper"
                >
                  <DamImage
                    alt={formViewConfig.imageAltText}
                    imgConfigs={IMG_DATA.imgConfig}
                    imgData={formViewConfig.lbl_SignUp_imageSrc}
                  />
                </Col>
                <Col colSize={{ small: 6, medium: 8, large: 8 }} ignoreGutter={{ large: true }}>
                  <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="sms" />
                  <Row className="button-wrapper" fullBleed>
                    <Col colSize={{ small: 4, medium: 4, large: 4 }} className="button-container">
                      <Button
                        fullWidth
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="shop-button"
                        onClick={this.closeModal}
                        dataLocator="shop_now_btn"
                      >
                        {formViewConfig.lbl_SignUp_shopNowLabel}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          ) : (
            <form onSubmit={this.onFormSubmit}>
              <Grid>
                <Row fullBleed={{ large: true }} className="wrapper">
                  <Col
                    isNotInlineBlock
                    colSize={{ small: 4, medium: 4, large: 4 }}
                    hideCol={{ small: true, medium: true }}
                    className="img-wrapper"
                  >
                    <DamImage
                      alt={formViewConfig.imageAltText}
                      imgConfigs={IMG_DATA.imgConfig}
                      imgData={formViewConfig.lbl_SignUp_imageSrc}
                    />
                  </Col>
                  <Col colSize={{ small: 6, medium: 8, large: 8 }}>
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
                        onBlur={this.onInputBlur}
                        onKeyPress={this.onSignUpInputKeyPress}
                        component={TextBox}
                        maxLength={50}
                        dataLocator="sms_address_field"
                        normalize={formatPhoneNumber}
                      />
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.lbl_SignUp_termsTextLabel}
                      </BodyCopy>
                    </Col>
                    <Row className="button-wrapper-form" fullBleed>
                      <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                        <Button
                          disabled={
                            pristine ||
                            !validationStarted ||
                            asyncValidating ||
                            invalid ||
                            submitSucceeded ||
                            submitting
                          }
                          fullWidth
                          buttonVariation="fixed-width"
                          fill="BLUE"
                          type="button"
                          className="join-button"
                          dataLocator="join_now_btn"
                          onClick={this.submitForm}
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
        </Modal>
      </Fragment>
    );
  }
}

SmsSignupModal.propTypes = {
  buttonConfig: PropTypes.shape({}),
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.func,
  subscription: PropTypes.shape({}),
  submitSmsSubscription: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  asyncValidating: PropTypes.oneOf(PropTypes.bool, PropTypes.string).isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
};

SmsSignupModal.defaultProps = {
  buttonConfig: {},
  className: '',
  subscription: {},
  isModalOpen: false,
  submitSmsSubscription: () => {},
  clearSmsSignupForm: () => {},
  closeModal: () => {},
  reset: () => {},
  handleSubmit: () => {},
};

export default withStyles(
  reduxForm({
    form: 'SmsSignupModalForm',
    initialValues: {
      signupPhoneNumber: '',
    },
    asyncBlurFields: ['signupPhoneNumber'],
  })(SmsSignupModal),
  smsSignupModalStyle
);
export { SmsSignupModal as SmsSignupModalVanilla };
