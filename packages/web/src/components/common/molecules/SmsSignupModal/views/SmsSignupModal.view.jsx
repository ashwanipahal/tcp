import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import smsSignupModalStyle from '../SmsSignupModal.style';

const FormName = 'SmsSignupModalForm';

class SmsSignupModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showAsyncError: '',
      validInput: false,
    };
  }

  validatePhoneNumber = fieldValue => {
    return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(fieldValue);
  };

  onSignUpInputBlur = e => {
    const fieldValue = e.target.value;
    const isPhoneNumberValid = this.validatePhoneNumber(fieldValue);
    if (!isPhoneNumberValid) {
      this.setState({
        showAsyncError: true,
        validInput: false,
      });
    }
  };

  onFormSubmit = e => {
    try {
      e.preventDefault();
      const { signup } = this.state;
      const { submitSmsSubscription } = this.props;
      submitSmsSubscription(signup);
    } catch (error) {
      console.log(error);
    }
  };

  onSignUpInputChange = e => {
    const { clearSmsSignupForm, isSubscriptionValid } = this.props;
    const { anyTouched } = this.props;
    const fieldValue = e.target.value;
    this.setState({
      [e.target.name]: fieldValue,
    });
    if (isSubscriptionValid) {
      clearSmsSignupForm();
    }
    const isPhoneNumberValid = this.validatePhoneNumber(fieldValue);
    // Based on the input, set the validInput state but only
    // if the field is touched (blurred atleast once) show error state
    if (!isPhoneNumberValid) {
      this.setState({
        validInput: false,
      });
    } else {
      this.setState({
        validInput: true,
      });
    }
    if (!isPhoneNumberValid && anyTouched) {
      this.setState({
        showAsyncError: true,
      });
    } else {
      this.setState({
        showAsyncError: false,
      });
    }
  };

  closeModal = () => {
    const { closeModal, clearSmsSignupForm, reset } = this.props;
    closeModal();
    reset();
    clearSmsSignupForm();
  };

  render() {
    const { showAsyncError, validInput } = this.state;
    const {
      isModalOpen,
      // buttonConfig,
      className,
      formViewConfig,
      isSubscriptionValid,
      pristine,
    } = this.props;

    if (isSubscriptionValid === 'invalid') {
      this.setState({
        showAsyncError: true,
        validInput: false,
      });
    }
    console.log('isModalOpen', isModalOpen);
    const notValidPhone = showAsyncError || !validInput || pristine;
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
            isSubscriptionValid ? 'thank_you_modal_close_btn' : 'email_signup_modal_close_btn'
          }
        >
          {isSubscriptionValid === 'valid' ? (
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
                        dataLocator="shop_now_btnForm"
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
                        name="signup"
                        id="signup"
                        type="text"
                        component={TextBox}
                        maxLength={50}
                        dataLocator="sms_address_field"
                        onChange={this.onSignUpInputChange}
                        onBlur={this.onSignUpInputBlur}
                        className={showAsyncError ? 'async-error' : ''}
                        showSuccessCheck={!notValidPhone}
                      />
                      {showAsyncError && (
                        <BodyCopy fontSize="fs12" fontFamily="secondary" color="secondary.dark">
                          {formViewConfig.validationErrorLabel}
                        </BodyCopy>
                      )}
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.termsTextLabel}
                      </BodyCopy>
                    </Col>
                    <Row className="button-wrapper-form" fullBleed>
                      <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                        <Button
                          disabled={notValidPhone}
                          fullWidth
                          buttonVariation="fixed-width"
                          fill="BLUE"
                          type="submit"
                          className="join-button"
                          dataLocator="join_now_btn"
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
        {/* <Button
          customStyle="shadow-button"
          title={buttonConfig.title}
          onClick={this.onButtonClick}
          dataLocator="footer_sms_signup_btn"
        >
          <RichText richTextHtml={buttonConfig.text} />
        </Button> */}
      </Fragment>
    );
  }
}

SmsSignupModal.propTypes = {
  buttonConfig: PropTypes.shape({}),
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.shape({}).isRequired,
  isSubscriptionValid: PropTypes.string,
  submitSmsSubscription: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  anyTouched: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  reset: PropTypes.func,
};

SmsSignupModal.defaultProps = {
  buttonConfig: {},
  className: '',
  isSubscriptionValid: '',
  isModalOpen: false,
  submitSmsSubscription: () => {},
  closeModal: () => {},
  reset: () => {},
};

export default withStyles(
  reduxForm({
    form: FormName, // a unique identifier for this form
    initialValues: {
      signup: '',
    },
  })(SmsSignupModal),
  smsSignupModalStyle
);
export { SmsSignupModal as SmsSignupModalVanilla };
