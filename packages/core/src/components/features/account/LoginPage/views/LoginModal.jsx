import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
import CreateAccount from '../../CreateAccount';

// @flow

type Props = {
  data: Object,
  className: string,
  loginModalState: boolean,
  onDeleteCard: Function,
};

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
    const { className, openState, setLoginModalMountState } = this.props;
    const { currentForm } = this.state;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={this.onClose}
        heading="heading"
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        maxWidth="690px"
        minHeight="640px"
      >
        {this.state.component === 'login' ? (
          <LoginPageContainer
            favlink="favorites"
            currentForm={currentForm}
            setLoginModalMountState={this.openForgotPasswordModal}
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

export default OpenLoginModal;
export { OpenLoginModal as OpenLoginModalVanilla };
