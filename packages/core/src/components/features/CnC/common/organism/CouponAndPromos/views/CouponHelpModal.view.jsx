import React from 'react';
import Modal from '../../../../../../common/molecules/Modal';
import { RichText } from '../../../../../../common/atoms';

class CouponHelpModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="500px"
        minHeight="90%"
        closeIconDataLocator="helpmodalcrossicon"
        fixedWidth
      >
        <RichText richTextHtml={labels.NEED_HELP_RICH_TEXT} />
      </Modal>
    );
  }
}

export default CouponHelpModal;
