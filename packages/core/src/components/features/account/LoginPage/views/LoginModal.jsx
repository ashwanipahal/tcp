import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import CreateAccount from '../../CreateAccount';

class OpenLoginModal extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'login',
      component: props.componentType || 'login',
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
    this.setState({ component: 'login' });
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
    const {
      className,
      openState,
      variation,
      handleContinueAsGuest,
      handleAfterLogin,
      isLoading,
    } = this.props;
    const { currentForm, component } = this.state;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={this.onClose}
        heading=""
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        widthConfig={{ small: '100%', medium: '450px', large: '616px' }}
        heightConfig={{ minHeight: '550px' }}
        standardHeight
      >
        {component === 'login' ? (
          <LoginPageContainer
            variation={variation}
            currentForm={currentForm}
            closeModal={this.onClose}
            setLoginModalMountState={this.openForgotPasswordModal}
            handleContinueAsGuest={handleContinueAsGuest}
            handleAfterLogin={handleAfterLogin}
            isLoading={isLoading}
          />
        ) : (
          <CreateAccount
            currentForm={currentForm}
            setLoginModalMountState={this.openForgotPasswordModal}
          />
        )}
      </Modal>
    );
  }
}

OpenLoginModal.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  setLoginModalMountState: PropTypes.bool.isRequired,
  handleContinueAsGuest: PropTypes.func.isRequired,
  handleAfterLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};

export default OpenLoginModal;
export { OpenLoginModal as OpenLoginModalVanilla };
