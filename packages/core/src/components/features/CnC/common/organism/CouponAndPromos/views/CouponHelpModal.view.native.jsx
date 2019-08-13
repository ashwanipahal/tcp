import React from 'react';
import { WebView } from 'react-native';
import Modal from '../../../../../../common/molecules/Modal';
import styles from '../styles/CouponDetailModal.style.native';

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
        headerStyle={styles}
      >
        <WebView source={{ html: labels.NEED_HELP_RICH_TEXT }} />
      </Modal>
    );
  }
}

export default CouponHelpModal;
