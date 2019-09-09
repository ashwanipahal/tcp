import React from 'react';
import Modal from '../../../../../../../../common/molecules/Modal';
import { RichText } from '../../../../../../../../common/atoms';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/GiftServices.style';

class GiftServicesDetailsModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content giftServicesModal"
        maxWidth="500px"
        minHeight="90%"
        closeIconDataLocator="details-cross-icon"
        fixedWidth
      >
        <RichText richTextHtml={labels.DETAILS_RICH_TEXT} />
      </Modal>
    );
  }
}

export default withStyles(GiftServicesDetailsModal, styles);
