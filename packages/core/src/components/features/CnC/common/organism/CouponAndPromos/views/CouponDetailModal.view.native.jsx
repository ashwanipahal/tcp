import React from 'react';
import Modal from '../../../../../../common/molecules/Modal';
import styles from '../styles/CouponDetailModal.style.native';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class CouponDetailModal extends React.PureComponent<Props> {
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
        <BodyCopy
          data-locator="h"
          fontSize="fs12"
          fontFamily="secondary"
          fontWeight="semibold"
          text={labels.APPLY_TO_BAG}
          color="white"
        />
      </Modal>
    );
  }
}

export default CouponDetailModal;
