import React from 'react';
import Modal from '../../Modal';
import { RichText } from '../../../atoms';

class PlaceCashDetailsModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels, heading } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="500px"
        minHeight="90%"
        heightConfig={{ height: '90%' }}
        closeIconDataLocator="detailmodalcrossicon"
        heading={heading}
        fixedWidth
      >
        <RichText richTextHtml={labels.SHOW_DETAILS_RICH_TEXT} />
      </Modal>
    );
  }
}

export default PlaceCashDetailsModal;
