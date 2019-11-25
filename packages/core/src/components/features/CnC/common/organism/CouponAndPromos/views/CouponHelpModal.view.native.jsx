import React from 'react';
import { RichText } from '@tcp/core/src/components/common/atoms';
import Modal from '../../../../../../common/molecules/Modal';
import { ModalHeaderStyle } from '../styles/CouponDetailModal.style.native';

class CouponHelpModal extends React.PureComponent<Props> {
  render() {
    const { openState, onRequestClose, labels } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        closeIconDataLocator="added-to-bg-close"
        animationType="slide"
        headerStyle={ModalHeaderStyle}
        heading=" "
      >
        <RichText
          source={{
            html: `<html><header><meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'> </header><body>${
              labels.NEED_HELP_RICH_TEXT
            }</body></html>`,
          }}
          isApplyDeviceHeight
        />
      </Modal>
    );
  }
}

export default CouponHelpModal;
