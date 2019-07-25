import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { normalizePhoneNumber } from '@tcp/core/src/utils/formValidation/signupPhoneNumber';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import smsSignupModalStyle from '../SmsSignupModal.style';

class SmsSignupModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validationStarted: false,
    };
  }

  componentDidUpdate() {
    const { subscription } = this.props;
    if ((subscription.error || subscription.success) && this.formSubmitPromise) {
      if (subscription.error) {
        this.formSubmitPromise.reject();
      } else {
        this.formSubmitPromise.resolve();
      }
      this.formSubmitPromise = null;
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

    return (
      <Fragment>
        <Modal
          isOpen={isModalOpen}
          colSet={{ small: 6, medium: 6, large: 8 }}
          className={className}
          overlayClassName="TCPModal__Overlay"
          onRequestClose={this.closeModal}
          noPadding
          widthConfig={{ small: '375px', medium: '458px', large: '851px' }}
          closeIconDataLocator={
            subscription ? 'thank_you_modal_close_btn' : 'email_signupPhoneNumber_modal_close_btn'
          }
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
                  <Image alt={formViewConfig.imageAltText} src={formViewConfig.imageSrc} />
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
                        {formViewConfig.shopNowLabel}
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
                    <Image alt={formViewConfig.imageAltText} src={formViewConfig.imageSrc} />
                  </Col>
                  <Col colSize={{ small: 6, medium: 8, large: 8 }}>
                    <SignupFormIntro formViewConfig={formViewConfig} />
                    <Col
                      colSize={{ small: 6, medium: 6, large: 10 }}
                      offsetLeft={{ small: 0, medium: 1, large: 1 }}
                      className="field-container"
                    >
                      <Field
                        placeholder={formViewConfig.placeholderText}
                        name="signupPhoneNumber"
                        id="signupPhoneNumber"
                        type="text"
                        onBlur={this.onInputBlur}
                        onKeyPress={this.onSignUpInputKeyPress}
                        component={TextBox}
                        maxLength={50}
                        dataLocator="sms_address_field"
                        normalize={normalizePhoneNumber}
                      />
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.termsTextLabel}
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
                          {formViewConfig.joinButtonLabel}
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
  asyncValidating: PropTypes.bool.isRequired,
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
