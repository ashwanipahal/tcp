import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import CreateAccount from '../../CreateAccount';

class OpenLoginModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'login',
      component: 'login',
    };
  }

  onConfirm = () => {
    const { data, onDeleteCard } = this.props;
    const { description } = data;
    onDeleteCard({ creditCardId: description.creditCardId });
  };

  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  openForgotPasswordModal = params => {
    const { setLoginModalMountState } = this.props;
    this.setState(
      {
        component: params.component,
        currentForm: params.componentProps ? params.componentProps.currentForm : '',
      },
      () => {
        setLoginModalMountState({ state: true });
      }
    );
  };

  render() {
    const { openState, variation, handleContinueAsGuest, handleAfterLogin } = this.props;
    const { currentForm, component } = this.state;
    return (
      <ModalNative isOpen={openState} onRequestClose={this.onClose}>
        {component === 'login' ? (
          <LoginPageContainer
            variation={variation}
            currentForm={currentForm}
            closeModal={this.onClose}
            setLoginModalMountState={this.openForgotPasswordModal}
            handleContinueAsGuest={handleContinueAsGuest}
            handleAfterLogin={handleAfterLogin}
          />
        ) : (
          <CreateAccount
            currentForm={currentForm}
            setLoginModalMountState={this.openForgotPasswordModal}
          />
        )}
      </ModalNative>
    );
  }
}

OpenLoginModal.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  setLoginModalMountState: PropTypes.bool.isRequired,
  handleContinueAsGuest: PropTypes.func.isRequired,
  handleAfterLogin: PropTypes.func.isRequired,
};

export default OpenLoginModal;
export { OpenLoginModal as OpenLoginModalVanilla };
