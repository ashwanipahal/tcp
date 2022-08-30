import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ModalNative from '@tcp/core/src/components/common/molecules/Modal';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import CreateAccount from '../../CreateAccount';

class OpenLoginModal extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'login',
      component: 'login',
      horizontalBar: true,
      modalHeaderLbl: 'Login',
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

  updateHeader = () => {
    this.setState({
      modalHeaderLbl: ' ',
      horizontalBar: false,
    });
  };

  render() {
    const { openState, variation, handleContinueAsGuest, handleAfterLogin } = this.props;
    const { currentForm, component, modalHeaderLbl, horizontalBar } = this.state;
    return (
      <ModalNative
        heading={modalHeaderLbl}
        isOpen={openState}
        onRequestClose={this.onClose}
        horizontalBar={horizontalBar}
      >
        {component === 'login' ? (
          <LoginPageContainer
            variation={variation}
            currentForm={currentForm}
            closeModal={this.onClose}
            setLoginModalMountState={this.openForgotPasswordModal}
            handleContinueAsGuest={handleContinueAsGuest}
            handleAfterLogin={handleAfterLogin}
            updateHeader={this.updateHeader}
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
  setLoginModalMountState: PropTypes.bool.isRequired,
  handleContinueAsGuest: PropTypes.func.isRequired,
  handleAfterLogin: PropTypes.func.isRequired,
};

export default OpenLoginModal;
export { OpenLoginModal as OpenLoginModalVanilla };
