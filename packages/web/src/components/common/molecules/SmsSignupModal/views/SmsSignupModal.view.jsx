import React, { Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import errors from '@tcp/core/src/utils/errorsMsg';

import signupWrapperStyle from '../SmsSignupModal.style';

class SignupWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      disableSubmitButton: false,
      showAsyncError: '',
      validInput: false,
    };
  }

  onButtonClick = () => {
    console.log('onButtonClick');
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onSignUpInputBlur = e => {
    const fieldValue = e.target.value;
    const isPhoneNumberValid = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(fieldValue);
    console.log(isPhoneNumberValid);
    if (!isPhoneNumberValid) {
      this.setState({
        showAsyncError: true,
        validInput: false,
      });
    }
  };

  onFormSubmit = e => {
    try {
      console.log('onFormSubmit');
      e.preventDefault();
      const { signup } = this.state;
      const {
        submitEmailSubscription,
        subscriptionType,
        submitSmsSubscription,
        isSubscriptionValid,
      } = this.props;
      if (subscriptionType === 'sms') {
        submitSmsSubscription(signup);
      } else {
        submitEmailSubscription(signup);
      }
      if (!isSubscriptionValid) {
        this.setState({
          showAsyncError: true,
          validInput: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onSignUpInputChange = e => {
    const { subscriptionType, pristine, anyTouched } = this.props;
    const fieldValue = e.target.value;
    console.log('pristine', pristine);
    console.log('touched', anyTouched);

    console.log('on input change');
    this.setState({
      [e.target.name]: fieldValue,
    });
    if (subscriptionType === 'sms') {
      const isPhoneNumberValid = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/i.test(fieldValue);
      console.log(isPhoneNumberValid);
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
    }
  };

  closeModal = () => {
    console.log('on close modal');
    const { isOpen } = this.state;
    const { clearForm, dispatch } = this.props;
    this.setState({ isOpen: !isOpen, showAsyncError: false });
    dispatch(reset('SignupWrapper'));
    clearForm();
  };

  render() {
    const { isOpen, disableSubmitButton, showAsyncError, validInput } = this.state;
    const { buttonConfig, className, formViewConfig, isSubscriptionValid, pristine } = this.props;

    return (
      <Fragment>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            colSet={{ small: 6, medium: 6, large: 8 }}
            className={className}
            overlayClassName="TCPModal__Overlay"
            onRequestClose={this.closeModal}
          >
            {isSubscriptionValid ? (
              <Grid>
                <Row fullBleed>
                  <Col
                    colSize={{ small: 4, medium: 4, large: 4 }}
                    hideCol={{ small: true, medium: true }}
                  >
                    <Image alt={formViewConfig.imageAltText} src={formViewConfig.imageSrc} />
                  </Col>
                  <Col
                    colSize={{ small: 4, medium: 6, large: 8 }}
                    offsetLeft={{ small: 1, medium: 1, large: 0 }}
                  >
                    <BodyCopy
                      fontSize="fs28"
                      fontFamily="primary"
                      fontWeight="black"
                      textAlign="center"
                      className="thank-you__label"
                    >
                      {formViewConfig.thankYouTextLabel}
                    </BodyCopy>
                    <BodyCopy
                      fontSize="fs18"
                      fontFamily="secondary"
                      textAlign="center"
                      className="confirmation__label"
                    >
                      {formViewConfig.joiningTextLabel}
                    </BodyCopy>
                    <BodyCopy
                      fontSize="fs22"
                      fontFamily="secondary"
                      textAlign="center"
                      fontWeight="semibold"
                      color="primary.main"
                    >
                      {formViewConfig.confirmationMsgReceiveLabel}
                    </BodyCopy>
                    <BodyCopy fontSize="fs16" fontFamily="secondary" textAlign="center">
                      {formViewConfig.extraMessageLabel}
                    </BodyCopy>
                    <BodyCopy fontSize="fs12" fontFamily="secondary" textAlign="center">
                      {formViewConfig.footerTextLabel}
                    </BodyCopy>
                    <form onSubmit={this.onFormSubmit}>
                      <Button
                        disabled={disableSubmitButton}
                        fullWidth
                        buttonVariation="variable-width"
                        fill="BLUE"
                        type="submit"
                        onClick={this.closeModal}
                        className="join-button"
                      >
                        {formViewConfig.shopNowLabel}
                      </Button>
                    </form>
                  </Col>
                </Row>
              </Grid>
            ) : (
              <form onSubmit={this.onFormSubmit}>
                <Grid>
                  <Row fullBleed={{ small: false, medium: false, large: true }} className="wrapper">
                    <Col
                      colSize={{ small: 4, medium: 4, large: 4 }}
                      hideCol={{ small: true, medium: true }}
                    >
                      <Image alt={formViewConfig.imageAltText} src={formViewConfig.imageSrc} />
                    </Col>
                    <Col colSize={{ small: 6, medium: 8, large: 8 }}>
                      <Col
                        colSize={{ small: 4, medium: 6, large: 8 }}
                        offsetLeft={{ small: 1, medium: 1, large: 1 }}
                        ignoreGutter={{ large: true }}
                      >
                        <BodyCopy
                          fontSize="fs18"
                          fontFamily="secondary"
                          textAlign="center"
                          className="sign-up__label"
                        >
                          {formViewConfig.signUpForLabel}
                        </BodyCopy>
                        <BodyCopy
                          fontSize="fs28"
                          fontFamily="primary"
                          fontWeight="black"
                          textAlign="center"
                          className="offer-type__label"
                        >
                          {formViewConfig.offerTypeLabel}
                        </BodyCopy>
                        <BodyCopy
                          fontFamily="primary"
                          className="flash-text"
                          textAlign="center"
                          component="div"
                        >
                          <BodyCopy fontSize="fs48" component="span" className="get-text">
                            {formViewConfig.getTextLabel}
                          </BodyCopy>
                          <BodyCopy
                            fontSize="fs36"
                            component="span"
                            fontWeight="black"
                            className="dollar-text"
                          >
                            {formViewConfig.dollarTextLabel}
                          </BodyCopy>
                          <BodyCopy
                            fontSize="fs48"
                            component="span"
                            fontWeight="black"
                            className="ten-text"
                          >
                            {formViewConfig.tenTextLabel}
                          </BodyCopy>
                          <BodyCopy fontSize="fs48" textAlign="center">
                            {formViewConfig.offTextLabel}
                          </BodyCopy>
                        </BodyCopy>
                        <BodyCopy
                          fontSize="fs22"
                          fontFamily="primary"
                          fontWeight="semibold"
                          textAlign="center"
                        >
                          {formViewConfig.nextPurchaseLabel}
                        </BodyCopy>
                      </Col>
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
                        />
                        {showAsyncError && (
                          <BodyCopy fontSize="fs12" fontFamily="secondary" color="secondary.dark">
                            {errors.VALID_PHONE}
                          </BodyCopy>
                        )}
                        <BodyCopy fontSize="fs12" fontFamily="secondary">
                          {formViewConfig.termsTextLabel}
                        </BodyCopy>
                      </Col>
                      <Col
                        colSize={{ small: 6, medium: 8, large: 12 }}
                        hideCol={{ small: true, medium: true }}
                        className="button-wrapper__large"
                      >
                        <Button
                          disabled={showAsyncError || !validInput || pristine}
                          // disabled={showAsyncError || pristine}
                          fullWidth
                          buttonVariation="fixed-width"
                          fill="BLUE"
                          type="submit"
                          className="join-button"
                        >
                          {formViewConfig.joinButtonLabel}
                        </Button>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="button-row" fullBleed>
                    <Col colSize={{ small: 6, medium: 8, large: 0 }} className="button-wrapper">
                      <Button
                        disabled={disableSubmitButton}
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
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearForm: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isSubscriptionValid: PropTypes.bool,
  submitSmsSubscription: PropTypes.func,
  subscriptionType: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  anyTouched: PropTypes.bool.isRequired,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  submitEmailSubscription: () => {},
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
