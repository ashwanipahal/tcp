import React, { Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import signupWrapperStyle from '../SignupModal.style';

class SignupWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      disableSubmitButton: false,
    };
  }

  onButtonClick = () => {
    console.log('onButtonClick');
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onFormSubmit = e => {
    console.log('onFormSubmit');
    e.preventDefault();
    const { signup } = this.state;
    const { submitEmailSubscription, subscriptionType, submitSmsSubscription } = this.props;
    if (subscriptionType === 'sms') {
      submitSmsSubscription(signup);
    } else {
      submitEmailSubscription(signup);
    }
  };

  onSignupInputBlur = () => {
    console.log('on input blur');
  };

  onSignUpInputChange = e => {
    console.log('on input change');
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  closeModal = () => {
    console.log('on close modal');
    const { isOpen } = this.state;
    const { clearForm, dispatch } = this.props;
    this.setState({ isOpen: !isOpen });
    dispatch(reset('SignupWrapper'));
    clearForm();
  };

  render() {
    const { isOpen, disableSubmitButton } = this.state;
    const { buttonConfig, className, formViewConfig, isEmailSubscriptionValid } = this.props;
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
            {isEmailSubscriptionValid ? (
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
                    >
                      {formViewConfig.thankYouTextLabel}
                    </BodyCopy>
                    <BodyCopy fontSize="fs18" fontFamily="secondary" textAlign="center">
                      {formViewConfig.joiningTextLabel}
                    </BodyCopy>
                    <BodyCopy
                      fontSize="fs22"
                      fontFamily="secondary"
                      textAlign="center"
                      fontWeight="semibold"
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
                        <BodyCopy fontFamily="primary" className="flash-text" textAlign="center">
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
                          onBlur={this.onSignupInputBlur}
                        />
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
  // verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearForm: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isEmailSubscriptionValid: PropTypes.bool,
  submitSmsSubscription: PropTypes.func,
  subscriptionType: PropTypes.string.isRequired,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  // verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  className: '',
  isEmailSubscriptionValid: false,
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
