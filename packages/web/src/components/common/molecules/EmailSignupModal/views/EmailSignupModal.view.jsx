import React, { Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, RichText, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import signupWrapperStyle from '../EmailSignupModal.style';

class SignupWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.pendingEmailFormSubmit && this.checkEmailValid()) {
      const { signup } = this.state;
      const { submitEmailSubscription } = this.props;
      this.pendingEmailFormSubmit = false;
      submitEmailSubscription(signup);
    } else {
      this.pendingEmailFormSubmit = false;
    }
  }

  onButtonClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onSignUpInputBlur = e => {
    const { verifyEmailAddress } = this.props;
    verifyEmailAddress(e.target.value);
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { signup } = this.state;
    const { submitEmailSubscription, verifyEmailAddress } = this.props;

    if (this.checkEmailValid()) {
      submitEmailSubscription(signup);
    } else {
      this.pendingEmailFormSubmit = true;
      verifyEmailAddress(signup);
    }
  };

  onSignUpInputChange = e => {
    const { clearEmailSignupForm } = this.props;
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    clearEmailSignupForm();
  };

  getValidationClass() {
    let validationClass = '';
    const { signup = '' } = this.state;
    const { isEmailValid } = this.props;

    if (isEmailValid && signup.length && !this.checkEmailValid()) {
      validationClass = 'field-label async-error';
    }
    if (isEmailValid && signup.length && this.checkEmailValid()) {
      validationClass = 'field-label async-success';
    }
    return validationClass;
  }

  closeModal = () => {
    const { isOpen } = this.state;
    const { clearEmailSignupForm, dispatch } = this.props;
    this.setState({ isOpen: !isOpen });
    dispatch(reset('SignupWrapper'));
    clearEmailSignupForm();
  };

  checkEmailValid() {
    const { isEmailValid } = this.props;
    return isEmailValid === 'valid';
  }

  render() {
    const { isOpen, signup = '' } = this.state;
    const {
      buttonConfig,
      className,
      formViewConfig,
      isSubscriptionValid,
      isEmailValid,
    } = this.props;

    const validationClass = this.getValidationClass(isEmailValid);

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
            {isSubscriptionValid ? (
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
                    <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="email" />
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
                          className={validationClass}
                          showSuccessCheck={validationClass === 'async-success'}
                        />
                        {isEmailValid && !this.checkEmailValid() && signup.length > 0 && (
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
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearEmailSignupForm: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isSubscriptionValid: PropTypes.bool,
  isEmailValid: PropTypes.string,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  className: '',
  isSubscriptionValid: false,
  isEmailValid: '',
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

export { SignupWrapper as SignupWrapperVanilla };
