import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import Address from '../../../../common/molecules/Address';
import Button from '../../../../common/atoms/Button';

class AccountModalView extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onCloseModal() {
    const { closeModalComponent } = this.props;
    closeModalComponent();
  }

  onConfirm() {
    const { modalToOpen, data } = this.props;
    const { description } = data;
    switch (modalToOpen) {
      case 'delete':
        return this.deleteAddress({ description });
      default:
        return null;
    }
  }

  deleteAddress({ description }) {
    const { onDeleteAddress } = this.props;
    onDeleteAddress({ nickName: description.nickName });
  }

  render() {
    const { openState, modalToOpen, data } = this.props;
    if (Object.keys(data).length) {
      const { heading, description, buttons } = data;
      const { confirm, cancel } = buttons;
      return (
        <Modal
          colSet={{ large: 4, medium: 8, small: 6 }}
          isOpen={openState}
          onRequestClose={this.onCloseModal}
          title={heading}
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content"
        >
          <Address address={description} />
          <Button buttonVariation="variable-width" fill="BLUE" onClick={this.onConfirm}>
            {confirm}
          </Button>
          <Button buttonVariation="variable-width" onClick={this.onCloseModal} fill="RED">
            {cancel}
          </Button>
        </Modal>
      );
    }
    return null;
  }
}

export default AccountModalView;
