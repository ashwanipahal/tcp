import React from 'react';
import Modal from '../../../../../../../../common/molecules/Modal';
import { RichText } from '../../../../../../../../common/atoms';
import RichTextWrapper from '../styles/GiftServicesDetailsModal.style.native';

class GiftServicesDetailsModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels, heading, brand } = this.props;
    const { DETAILS_RICH_TEXT, DETAILS_RICH_TEXT_GYM } = labels;
    const modalContent = brand === 'TCP' ? DETAILS_RICH_TEXT : DETAILS_RICH_TEXT_GYM;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        closeIconDataLocator="details-cross-icon"
        fontSize="fs16"
        heading={heading}
        horizontalBar={false}
      >
        <RichTextWrapper>
          <RichText source={{ html: modalContent }} dataLocator="bonus-points-details" />
        </RichTextWrapper>
      </Modal>
    );
  }
}

export default GiftServicesDetailsModal;
