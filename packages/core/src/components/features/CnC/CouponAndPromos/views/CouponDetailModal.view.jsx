import React from 'react';
import Modal from '../../../../common/molecules/Modal';

class CouponDetailModal extends React.PureComponent<Props> {
  render() {
    const { heading, openState, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        heading={heading}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="460px"
        minHeight="500px"
        closeIconDataLocator="addressdeletemodalcrossicon"
      >
        <div>hello</div>
      </Modal>
    );
  }
}

export default CouponDetailModal;
