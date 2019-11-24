import React, { Fragment } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Col, Row, TextBox, DamImage, Anchor } from '@tcp/core/src/components/common/atoms';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { formatPhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';
import { Grid, Modal } from '@tcp/core/src/components/common/molecules';
import SmsSignupForm from '@tcp/core/src/components/common/organisms/SmsSignupForm/views';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { isGymboree } from '@tcp/core/src/utils/utils';
import InputCheckbox from '@tcp/core/src/components/common/atoms/InputCheckbox';

class SmsSignupModal extends React.PureComponent {
  componentDidUpdate({ subscription: oldSubscription }) {
    const { subscription } = this.props;

    if (
      subscription.success !== oldSubscription.success &&
      subscription.success &&
      this.modalContentRef
    ) {
      this.modalContentRef.focus();
    }
  }

  setModalContentRef = node => {
    this.modalContentRef = node;
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
    const isGym = isGymboree();
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
          heightConfig={{ minHeight: '500px', height: '645px', maxHeight: '645px' }}
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
          <SmsSignupForm
            {...this.props}
            colProps={{
              left: { small: 4, medium: 4, large: 4 },
              right: { small: 6, medium: 8, large: 8 },
            }}
          />
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
  trackSubscriptionSuccess: PropTypes.func,
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
  trackSubscriptionSuccess: () => {},
  validateSignupSmsPhoneNumber: () => Promise.resolve({}),
  clearSmsSignupForm: () => {},
  closeModal: () => {},
  reset: () => {},
  handleSubmit: () => {},
};

export default SmsSignupModal;
