import React, { Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import signupWrapperStyle from '../SmsSignupModal.style';

class SignupWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      showAsyncError: '',
      validInput: false,
    };
  }

  onButtonClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

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
    e.preventDefault();
    const { signup } = this.state;
    const { submitSmsSubscription } = this.props;

    const isPhoneNumberValid = this.validatePhoneNumber(signup);
    if (!isPhoneNumberValid) {
      this.setState({
        showAsyncError: true,
        validInput: false,
      });
    } else {
      submitSmsSubscription(signup);
    }
  };

  onSignUpInputChange = e => {
    const { clearSmsSignupForm, isSubscriptionValid } = this.props;
    const fieldValue = e.target.value;
    this.setState({
      [e.target.name]: fieldValue,
    });
    if (isSubscriptionValid) {
      clearSmsSignupForm();
    }
  };

  closeModal = () => {
    const { isOpen } = this.state;
    const { clearSmsSignupForm, dispatch } = this.props;
    this.setState({ isOpen: !isOpen, showAsyncError: false });
    dispatch(reset('SignupWrapper'));
    clearSmsSignupForm();
  };

  render() {
    const { isOpen, showAsyncError, validInput, signup = '' } = this.state;
    const { buttonConfig, className, formViewConfig, isSubscriptionValid, pristine } = this.props;

    if (isSubscriptionValid === 'invalid') {
      this.setState({
        showAsyncError: true,
        validInput: false,
      });
    }

    const notValidPhone = showAsyncError || !validInput || pristine;
    return (
      <Fragment>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            colSet={{ small: 6, medium: 6, large: 8 }}
            className={className}
            overlayClassName="TCPModal__Overlay"
            onRequestClose={this.closeModal}
            noPadding
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
                          dataLocator="signup_textbox"
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
                            disabled={signup.length === 0}
                            fullWidth
                            buttonVariation="fixed-width"
                            fill="BLUE"
                            type="submit"
                            className="join-button"
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
        )}
        <Button customStyle="shadow-button" title={buttonConfig.title} onClick={this.onButtonClick}>
          <RichText richTextHtml={buttonConfig.title} />
        </Button>
      </Fragment>
    );
  }
}

SignupWrapper.propTypes = {
  buttonConfig: PropTypes.shape({}),
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isSubscriptionValid: PropTypes.bool,
  submitSmsSubscription: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  className: '',
  isSubscriptionValid: false,
  submitSmsSubscription: () => {},
};

export default withStyles(
  reduxForm({
    form: 'SignupWrapper', // a unique identifier for this form
    initialValues: {
      signup: '',
    },
  })(SignupWrapper),
  signupWrapperStyle
);
export { SignupWrapper as SmsSignupModalVanilla };
