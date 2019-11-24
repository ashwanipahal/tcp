import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { Modal } from '@tcp/core/src/components/common/molecules';
import EmailSignupForm from '@tcp/core/src/components/common/organisms/EmailSignupForm/views/EmailSignupForm';

class EmailSignupModal extends React.PureComponent {
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
    const { closeModal, clearEmailSignupForm, reset } = this.props;
    reset();
    clearEmailSignupForm();
    closeModal();
  };

  render() {
    const { isModalOpen, className, formViewConfig, subscription } = this.props;

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
          <EmailSignupForm
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

EmailSignupModal.propTypes = {
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  clearEmailSignupForm: PropTypes.shape({}).isRequired,
  closeModal: PropTypes.func,
  reset: PropTypes.func,
  subscription: PropTypes.shape({}),
  isModalOpen: PropTypes.bool,
};

EmailSignupModal.defaultProps = {
  closeModal: () => {},
  reset: () => {},
  className: '',
  subscription: {},
  isModalOpen: false,
};

export default EmailSignupModal;
