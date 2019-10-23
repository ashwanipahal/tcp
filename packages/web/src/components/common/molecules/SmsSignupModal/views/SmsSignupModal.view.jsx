import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage, Anchor } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import SignupConfirm from '../../SignupConfirm';
import SignupFormIntro from '../../SignupFormIntro';

import smsSignupModalStyle from '../SmsSignupModal.style';
import config from '../Config';

class SmsSignupModal extends React.PureComponent {
  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription } = this.props;
    if ((subscription.error || subscription.success) && this.formSubmitPromise) {
      if (subscription.error) {
        this.formSubmitPromise.reject();
      } else {
        this.formSubmitPromise.resolve();
      }
      this.formSubmitPromise = null;
    }

    if (
      this.modalContentRef &&
      subscription.success !== oldSubscription.success &&
      subscription.success
    ) {
      this.modalContentRef.focus();
    }
  }

  setModalContentRef = node => {
    this.modalContentRef = node;
  };

  submitForm = ({ signupPhoneNumber }) => {
    const {
      submitSmsSubscription,
      clearSmsSignupForm,
      validateSignupSmsPhoneNumber,
      formViewConfig: { validationErrorLabel },
    } = this.props;

    return validateSignupSmsPhoneNumber(signupPhoneNumber)
      .then(subscription => {
        if (subscription.error) {
          return Promise.reject();
        }
        /*
         Faking this because redux-form `submitting` based on promise resolve
       and we will resolve formSubmitPromise only when the state has success flag on
       componentDidUpdate
       */
        return new Promise((resolve, reject) => {
          clearSmsSignupForm();
          this.formSubmitPromise = { resolve, reject };
          submitSmsSubscription(signupPhoneNumber);
        });
      })
      .catch(() => {
        const error = {
          signupPhoneNumber: validationErrorLabel,
        };
        throw new SubmissionError({
          ...error,
          _error: error,
        });
      });
  };

  closeModal = () => {
    const { closeModal, clearSmsSignupForm, reset } = this.props;
    closeModal();
    reset();
    clearSmsSignupForm();
  };

  render() {
    const {
      isModalOpen,
      className,
      formViewConfig,
      subscription,
      submitting,
      pristine,
      handleSubmit,
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
            subscription.success ? 'thank_you_modal_close_btn' : 'sms_signup_modal_close_btn'
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
            <Grid className="full-height">
              <Row fullBleed className="full-height">
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
                <Col
                  colSize={{ small: 6, medium: 8, large: 8 }}
                  ignoreGutter={{ large: true }}
                  className="sms-signup-content"
                >
                  <SignupConfirm formViewConfig={formViewConfig} susbscriptionType="sms" />
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
                        name="signupPhoneNumber"
                        id="signupPhoneNumber"
                        type="text"
                        component={TextBox}
                        maxLength={50}
                        dataLocator="sms_address_field"
                        normalize={formatPhoneNumber}
                        enableSuccessCheck={false}
                      />
                      <BodyCopy fontSize="fs12" fontFamily="secondary" className="terms-label">
                        {formViewConfig.lbl_SignUp_termsTextLabel}
                      </BodyCopy>
                    </Col>
                    <Row className="button-wrapper-form" fullBleed>
                      <Col colSize={{ small: 4, medium: 4, large: 6 }}>
                        <Button
                          disabled={pristine || submitting}
                          fullWidth
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

SmsSignupModal.propTypes = {
  buttonConfig: PropTypes.shape({}),
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.func,
  subscription: PropTypes.shape({}),
  submitSmsSubscription: PropTypes.func,
  validateSignupSmsPhoneNumber: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
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
  validateSignupSmsPhoneNumber: () => Promise.resolve({}),
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
  })(SmsSignupModal),
  smsSignupModalStyle
);
export { SmsSignupModal as SmsSignupModalVanilla };
