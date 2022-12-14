import React from 'react';
import Modal from '../../../../../../../../common/molecules/Modal';
import { RichText } from '../../../../../../../../common/atoms';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles, { modalStyles } from '../styles/GiftServices.style';

class GiftServicesDetailsModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels, brand } = this.props;
    const { DETAILS_RICH_TEXT, DETAILS_RICH_TEXT_GYM } = labels;
    const modalContent = brand === 'TCP' ? DETAILS_RICH_TEXT : DETAILS_RICH_TEXT_GYM;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="500px"
        minHeight="90%"
        heightConfig={{ height: '90%' }}
        closeIconDataLocator="details-cross-icon"
        fixedWidth
        contentLabel={labels.giftServicesAriaLabel}
        inheritedStyles={modalStyles}
      >
        <RichText richTextHtml={modalContent} />
      </Modal>
    );
  }
}

export default withStyles(GiftServicesDetailsModal, styles);
