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
      showAsyncError: '',
    };
  }

  onButtonClick = () => {
    console.log('onButtonClick');
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  onSignUpInputBlur = e => {
    const { verifyEmailAddress } = this.props;
    verifyEmailAddress(e.target.value);
  };

  onFormSubmit = e => {
    try {
      e.preventDefault();
      const { signup } = this.state;
      const { submitEmailSubscription } = this.props;
      submitEmailSubscription(signup);
    } catch (error) {
      console.log(error);
    }
  };

  onSignUpInputChange = e => {
    const { clearForm } = this.props;
    const fieldValue = e.target.value;
    this.setState({
      [e.target.name]: fieldValue,
    });
    clearForm();
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
    const { isOpen, showAsyncError } = this.state;
    const {
      buttonConfig,
      className,
      formViewConfig,
      isSubscriptionValid,
      isEmailValid,
    } = this.props;

    let validationClass = '';
    console.log('isEmailValid', isEmailValid);
    if (isEmailValid === 'invalid') {
      this.setState({
        showAsyncError: true,
      });
      validationClass = 'async-error';
    }
    if (isEmailValid === 'valid') {
      this.setState({
        showAsyncError: false,
      });
      validationClass = 'async-success';
    }

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
                    ignoreGutter={{ large: true }}
                  >
                    <SignupConfirm formViewConfig={formViewConfig} />
                    <Button
                      fullWidth
                      buttonVariation="variable-width"
                      fill="BLUE"
                      type="submit"
                      onClick={this.closeModal}
                      className="shop-button"
                    >
                      {formViewConfig.shopNowLabel}
                    </Button>
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
                      <Col
                        colSize={{ small: 6, medium: 8, large: 12 }}
                        hideCol={{ small: true, medium: true }}
                        className="button-wrapper__large"
                      >
                        <Button
                          disabled={isEmailValid !== 'valid'}
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
                        fullWidth
                        buttonVariation="fixed-width"
                        fill="BLUE"
                        type="submit"
                        className="join-button"
                        disabled={isEmailValid !== 'valid'}
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
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearForm: PropTypes.shape({}).isRequired,
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
