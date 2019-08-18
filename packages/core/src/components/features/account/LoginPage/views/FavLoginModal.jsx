import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import LoginPageContainer from '@tcp/core/src/components/features/account/LoginPage';
// @flow

type Props = {
  data: Object,
  className: string,
  loginModalState: boolean,
  onDeleteCard: Function,
};

class OpenLoginModal extends React.Component<Props> {
  onConfirm = () => {
    const { data, onDeleteCard } = this.props;
    const { description } = data;
    onDeleteCard({ creditCardId: description.creditCardId });
  };

  onClose = () => {
    const { setLoginModalMountState } = this.props;
    setLoginModalMountState({ state: false });
  };

  render() {
    const { className, openState } = this.props;
    debugger;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={this.onClose}
        heading="heading"
        overlayClassName="TCPModal__Overlay"
        className={`TCPModal__Content, ${className}`}
        maxWidth="690px"
        minHeight="340px"
      >
        <LoginPageContainer />
      </Modal>
    );
  }
}

export default OpenLoginModal;
export { OpenLoginModal as OpenLoginModalVanilla };
