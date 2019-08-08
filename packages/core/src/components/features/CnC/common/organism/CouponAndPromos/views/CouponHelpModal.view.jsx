import React from 'react';
import Modal from '../../../../../../common/molecules/Modal';

class CouponHelpModal extends React.PureComponent<Props> {
  render() {
    const { heading, openState, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="460px"
        minHeight="500px"
        closeIconDataLocator="helpmodalcrossicon"
      >
        <div>{heading}</div>
      </Modal>
    );
  }
}

export default CouponHelpModal;
