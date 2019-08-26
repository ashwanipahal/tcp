import React from 'react';
import Modal from '../../../../../../common/molecules/Modal';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponDetailModal.style';
import { BodyCopy } from '../../../../../../../../styles/themes/TCP/typotheme';

class CouponDetailModal extends React.PureComponent<Props> {
  printClick = event => {
    window.print();
    event.preventDefault();
  };

  tAndCClick = event => {
    event.preventDefault();
  };

  renderModal = () => {
    const { labels, coupon, className, applyToBag, onRequestClose } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="couponModal_modalTitle"
          data-locator={`couponDetailModal_${coupon.status}_NameLbl`}
        >
          {coupon.title}
        </BodyCopy>
        <BodyCopy
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="couponModal_modalSubTitle"
          data-locator={`couponDetailModal_${coupon.status}_ValidityDateLbl`}
        >
          {`${labels.USE_BY_TEXT} ${coupon.expirationDate}`}
        </BodyCopy>
        <div
          className="couponModal_modalbarcode"
          data-locator={`couponDetailModal_${coupon.status}_BarCode`}
        >
          {coupon.id}
        </div>
        <div className="couponModal_btnWrapper">
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            onClick={() => {
              onRequestClose();
              applyToBag(coupon);
            }}
            className="couponModal_applyToBag couponModal_btn"
            data-locator={`couponDetailModal_${coupon.status}_AddToBagBtn`}
          >
            {labels.APPLY_TO_BAG}
          </Button>
        </div>
        <div className="couponModal_print">
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            dataLocator={`couponDetailModal_${coupon.status}_printAch`}
            to="/#"
            onClick={this.printClick}
            className="couponModal_print_anchor"
          >
            {labels.PRINT_ANCHOR_TEXT}
          </Anchor>
        </div>
        <BodyCopy
          fontFamily="secondaryFontFamily"
          className="couponModal_modalLongDesc"
          data-locator={`couponDetailModal_${coupon.status}_LongDesc`}
        >
          {`${labels.MODAL_LONG_DESCRIPTION}`}
        </BodyCopy>
        <BodyCopy
          fontFamily="secondaryFontFamily"
          className="couponModal_modalShortDesc"
          data-locator={`couponDetailModal_${coupon.status}_ShortDesc`}
        >
          {`${labels.MODAL_SHORT_DESCRIPTION}`}
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            dataLocator={`couponDetailModal_${coupon.status}_tAndC`}
            onClick={this.tAndCClick}
            className="couponModal_print_anchortext"
          >
            {`${labels.TERMS_AND_CONDITIONS}`}
          </Anchor>

          {` and `}
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            dataLocator={`couponDetailModal_${coupon.status}_pp`}
            onClick={this.tAndCClick}
            className="couponModal_print_anchortext"
          >
            {`${labels.PRIVACY_POLICY}`}
          </Anchor>
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
