import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import ModalCloseIcon from '@tcp/web/src/components/common/atoms/ModalCloseIcon';

class SampleModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modalIsOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen,
    });
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <div>
        <h2>Modal Sample</h2>
        <button type="button" onClick={this.toggleModal}>
          Open Modal
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.toggleModal}
          contentLabel="Modal"
          overlayClassName="TCPModal__Overlay"
          className="TCPModal__Content"
          shouldCloseOnEsc
        >
          <div>
            <ModalCloseIcon closeFunc={this.toggleModal} />
            <h2>Modal Title</h2>
            <p>Modal content goes here...</p>
            <form>
              <input type="input" placeholder="please start tabbing..." />
              <br />
              <br />
              <button type="button">tab navigation</button>
              <br />
              <br />
              <button type="button">stays</button>
              <br />
              <br />
              <button type="button">inside</button>
              <br />
              <br />
              <button type="button">the modal</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SampleModal;
