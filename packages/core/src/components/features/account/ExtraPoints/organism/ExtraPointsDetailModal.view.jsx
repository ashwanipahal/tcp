import React from 'react';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import { BodyCopy } from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from './styles/ExtraPointsDetailModal.style';

class CouponDetailModal extends React.PureComponent<Props> {
  componentDidUpdate() {
    const { coupon, handleErrorCoupon } = this.props;
    if (coupon.error) {
      handleErrorCoupon(coupon);
    }
  }

  renderModal = () => {
    const { className } = this.props;
    return (
      <div className={className}>
        <BodyCopy fontWeight="black" className="couponModal_modalTitle">
          Testing ---- modal
        </BodyCopy>
      </div>
    );
  };

  render() {
    const { openState, onRequestClose } = this.props;
    return (
      <Modal
        isOpen={openState}
        onRequestClose={onRequestClose}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        maxWidth="616px"
        minHeight="540px"
        fixedWidth
        closeIconDataLocator="coupondetailmodalcrossicon"
      >
        {this.renderModal()}
      </Modal>
    );
  }
}

export default withStyles(CouponDetailModal, styles);
export { CouponDetailModal as CouponDetailModalVanilla };
