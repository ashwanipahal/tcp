import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, Image, TextBox } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import signupWrapperStyle from '../EmailSignupModal.style';

class EmailSignupModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validationStarted: false,
    };
  }

  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription } = this.props;

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

  closeModal = () => {
    const { closeModal, clearEmailSignupForm, reset } = this.props;
    reset();
    clearEmailSignupForm();
    closeModal();
    this.setState({
      validationStarted: false,
    });
  };

  submitForm = () => {
    const { handleSubmit, submitEmailSubscription } = this.props;
    handleSubmit(values => {
      submitEmailSubscription(values.signup);
    })();
  };

  render() {
    const {
      isModalOpen,
      className,
      formViewConfig,
      subscription,
      pristine,
      invalid,
      asyncValidating,
      submitSucceeded,
    } = this.props;
    const { validationStarted = false } = this.state;

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
          closeIconDataLocator={
            subscription.success ? 'thank_you_modal_close_btn' : 'email_signup_modal_close_btn'
          }
          contentLabel={`${formViewConfig.signUpForLabel} ${formViewConfig.offerTypeLabel}`}
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
            <form>
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
                        onBlur={this.onInputBlur}
                        maxLength={50}
                        dataLocator="email_address_field"
                        onKeyPress={this.onSignUpInputKeyPress}
                      />
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.termsTextLabel}
                      </BodyCopy>
                    </Col>
                    <Row className="button-wrapper-form" fullBleed>
                      <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                        <Button
                          fullWidth
                          disabled={
                            pristine ||
                            !validationStarted ||
                            asyncValidating ||
                            invalid ||
                            submitSucceeded
                          }
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

EmailSignupModal.propTypes = {
  buttonConfig: PropTypes.shape({}),
  submitEmailSubscription: PropTypes.func,
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearEmailSignupForm: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  subscription: PropTypes.shape({}),
  isModalOpen: PropTypes.bool,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  asyncValidating: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

EmailSignupModal.defaultProps = {
  buttonConfig: {},
  submitEmailSubscription: () => {},
  closeModal: () => {},
  reset: () => {},
  handleSubmit: () => {},
  className: '',
  subscription: {},
  isModalOpen: false,
  pristine: false,
  invalid: false,
  asyncValidating: false,
  submitSucceeded: false,
};

export default withStyles(
  reduxForm({
    form: 'EmailSignupModalForm',
    initialValues: {
      signup: '',
    },
    asyncBlurFields: ['signup'],
  })(EmailSignupModal),
  signupWrapperStyle
);

export { EmailSignupModal as EmailSignupModalVanilla };
