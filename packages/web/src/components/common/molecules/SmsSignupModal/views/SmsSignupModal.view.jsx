import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../SmsSignupModal.style';

const returnModule = mod => mod.default;
export const DynamicForm = dynamic({
  modules: () => ({
    email_signup: () =>
      import('@tcp/core/src/components/common/organisms/EmailSignupForm/views').then(returnModule),
    sms_signup: () =>
      import('@tcp/core/src/components/common/organisms/SmsSignupForm/views').then(returnModule),
  }),
  render: (properties, modules) => {
    const Module = modules[properties.formType];
    return <Module {...properties} />;
  },
});
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
          <DynamicForm
            formType="sms_signup"
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
  className: PropTypes.string,
  formViewConfig: PropTypes.shape({}).isRequired,
  confirmationViewConfig: PropTypes.shape({}).isRequired,
  clearSmsSignupForm: PropTypes.func,
  subscription: PropTypes.shape({}),
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  reset: PropTypes.func,
};

SmsSignupModal.defaultProps = {
  className: '',
  subscription: {},
  isModalOpen: false,
  clearSmsSignupForm: () => {},
  closeModal: () => {},
  reset: () => {},
};

export default withStyles(SmsSignupModal, styles);
export { SmsSignupModal as SmsSignupModalVanilla };
