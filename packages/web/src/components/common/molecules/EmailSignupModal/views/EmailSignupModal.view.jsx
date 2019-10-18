import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage, Anchor } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';

import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import signupWrapperStyle from '../EmailSignupModal.style';
import config from '../Config';

class EmailSignupModal extends React.PureComponent {
  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription } = this.props;

    if (
      this.modalContentRef &&
      subscription.success !== oldSubscription.success &&
      subscription.success
    ) {
      this.formSubmitPromise.resolve();
      this.modalContentRef.focus();
    } else if (subscription.error) {
      this.formSubmitPromise.reject();
    }
  }

  setModalContentRef = node => {
    this.modalContentRef = node;
  };

  closeModal = () => {
    const { closeModal, clearEmailSignupForm, reset } = this.props;
    reset();
    clearEmailSignupForm();
    closeModal();
  };

  submitForm = ({ signup }) => {
    const {
      submitEmailSubscription,
      validateSignupEmail,
      formViewConfig: { validationErrorLabel },
    } = this.props;

    return validateSignupEmail(signup)
      .then(subscription => {
        if (subscription.error) {
          return Promise.reject();
        }

        /* Faking this because redux-form `submitting` based on promise resolve
           and we will resolve formSubmitPromise only when the state has success flag on
           componentDidUpdate
         */
        return new Promise((resolve, reject) => {
          this.formSubmitPromise = { resolve, reject };
          submitEmailSubscription(signup);
        });
      })
      .catch(() => {
        const error = { signup: validationErrorLabel };
        throw new SubmissionError({ ...error, _error: error });
      });
  };

  render() {
    const {
      isModalOpen,
      className,
      formViewConfig,
      subscription,
      pristine,
      handleSubmit,
      submitting,
    } = this.props;
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
          widthConfig={{ small: '100%', medium: '458px', large: '851px' }}
          heightConfig={{ minHeight: '500px', height: '620px', maxHeight: '620px' }}
          closeIconDataLocator={
            subscription.success ? 'thank_you_modal_close_btn' : 'email_signup_modal_close_btn'
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
                    imgConfigs={IMG_DATA.imgConfig}
                    imgData={{
                      url: formViewConfig.lbl_SignUp_imageSrc,
                      alt: formViewConfig.lbl_SignUp_imageAlt,
                    }}
                  />
                </Col>
                <Col colSize={{ small: 6, medium: 8, large: 8 }} ignoreGutter={{ large: true }}>
                  <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="email" />
                  <Row className="button-wrapper" fullBleed>
                    <Col colSize={{ small: 4, medium: 4, large: 4 }} className="button-container">
                      <Anchor
                        to={formViewConfig.lbl_SignUp_shopNowBtnUrl}
                        asPath={formViewConfig.lbl_SignUp_shopNowBtnUrl}
                        target={formViewConfig.lbl_SignUp_shopNowBtnUrlTarget}
                      >
                        <Button
                          fullWidth
                          buttonVariation="fixed-width"
                          fill="BLUE"
                          type="submit"
                          className="shop-button"
                          dataLocator="shop_now_btn"
                        >
                          {formViewConfig.lbl_SignUp_shopNowLabel}
                        </Button>
                      </Anchor>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          ) : (
            <form onSubmit={handleSubmit(this.submitForm)}>
              <Grid>
                <Row fullBleed={{ large: true }} className="wrapper">
                  <Col
                    isNotInlineBlock
                    colSize={{ small: 4, medium: 4, large: 4 }}
                    hideCol={{ small: true, medium: true }}
                    className="img-wrapper"
                  >
                    <DamImage
                      imgConfigs={IMG_DATA.imgConfig}
                      imgData={{
                        url: formViewConfig.lbl_SignUp_imageSrc,
                        alt: formViewConfig.lbl_SignUp_imageAlt,
                      }}
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
                        name="signup"
                        id="signup"
                        type="text"
                        component={TextBox}
                        maxLength={50}
                        dataLocator="email_address_field"
                        enableSuccessCheck={false}
                      />
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.lbl_SignUp_termsTextLabel}
                      </BodyCopy>
                    </Col>
                    <Row className="button-wrapper-form" fullBleed>
                      <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                        <Button
                          fullWidth
                          disabled={pristine || submitting}
                          buttonVariation="fixed-width"
                          fill="BLUE"
                          type="submit"
                          className="join-button"
                          dataLocator="join_now_btn"
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
  validateSignupEmail: PropTypes.func,
  subscription: PropTypes.shape({}),
  isModalOpen: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
};

EmailSignupModal.defaultProps = {
  buttonConfig: {},
  submitEmailSubscription: () => {},
  closeModal: () => {},
  reset: () => {},
  handleSubmit: () => {},
  validateSignupEmail: () => Promise.resolve({}),
  className: '',
  subscription: {},
  isModalOpen: false,
  pristine: false,
  submitting: false,
};

export default withStyles(
  reduxForm({
    form: 'EmailSignupModalForm',
    initialValues: {
      signup: '',
    },
  })(EmailSignupModal),
  signupWrapperStyle
);

export { EmailSignupModal as EmailSignupModalVanilla };
