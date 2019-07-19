import React, { Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import signupWrapperStyle from '../EmailSignupModal.style';

const FormName = 'EmailSignupModalReduxForm';

class SignupWrapper extends React.PureComponent {
  onSignUpInputBlur = e => {
    const { verifyEmailAddress } = this.props;
    verifyEmailAddress(e.target.value);
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { signup } = this.state;
    const { submitEmailSubscription } = this.props;
    submitEmailSubscription(signup);
  };

  onSignUpInputChange = e => {
    const { clearEmailSignupForm } = this.props;
    const fieldValue = e.target.value;
    this.setState({
      [e.target.name]: fieldValue,
    });
    clearEmailSignupForm();
  };

  closeModal = () => {
    const { closeModal, clearEmailSignupForm, dispatch } = this.props;
    dispatch(reset(FormName));
    clearEmailSignupForm();
    closeModal();
  };

  getValidationClass = isEmailValid => {
    let validationClass = '';
    if (isEmailValid === 'invalid') {
      validationClass = 'field-label async-error';
    }
    if (isEmailValid === 'valid') {
      validationClass = 'field-label async-success';
    }
    return validationClass;
  };

  render() {
    const {
      isModalOpen,
      className,
      formViewConfig,
      isSubscriptionValid,
      isEmailValid,
    } = this.props;
    const showAsyncError = isEmailValid === 'invalid';

    const validationClass = this.getValidationClass(isEmailValid);
    console.log('Open modal', isModalOpen);
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
                        dataLocator="shop_now_btn"
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
                        dataLocator="email_address_field"
                        onChange={this.onSignUpInputChange}
                        onBlur={this.onSignUpInputBlur}
                        className={validationClass}
                        showSuccessCheck={isEmailValid === 'valid'}
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
                          disabled={isEmailValid !== 'valid'}
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
        {/*     <Button customStyle="shadow-button" title={buttonConfig.title} onClick={this.onButtonClick}>
          <RichText richTextHtml={buttonConfig.text} />
        </Button> */}
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
  closeModal: PropTypes.func,
  isSubscriptionValid: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isEmailValid: PropTypes.string,
};

SignupWrapper.defaultProps = {
  buttonConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  closeModal: () => {},
  className: '',
  isSubscriptionValid: false,
  isModalOpen: false,
  isEmailValid: '',
};

// export default withStyles(SignupWrapper, signupWrapperStyle);

export default withStyles(
  reduxForm({
    form: FormName, // a unique identifier for this form
    initialValues: {
      signup: '',
    },
  })(SignupWrapper),
  signupWrapperStyle
);

export { SignupWrapper as SignupWrapperVanilla };
