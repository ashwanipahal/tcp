import React from 'react';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import endpoints from '@tcp/core/src/components/features/account/common/externalEndpoints';
import { BodyCopy } from '../../../../../../../../styles/themes/TCP/typotheme';
import styles from '../styles/CouponDetailModal.style';

class CouponDetailModal extends React.PureComponent<Props> {
  componentDidUpdate() {
    const { coupon, handleErrorCoupon } = this.props;
    if (coupon.error) {
      handleErrorCoupon(coupon);
    }
  }

  printClick = event => {
    window.print();
    event.preventDefault();
  };

  /**
   * This function is used for apply to bag coupon
   * can be passed in the component.
   */
  handleApplyToBag = () => {
    const { onApplyCouponToBagFromList, coupon, onRequestClose } = this.props;
    onApplyCouponToBagFromList({
      couponCode: coupon.id,
      id: coupon.id,
      coupon: coupon.id,
    });
    onRequestClose();
  };

  renderModal = () => {
    const { labels, coupon, className } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          fontWeight="black"
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
        <BodyCopy
          component="div"
          data-locator={`couponDetailModal_${coupon.status}_BarCode`}
          className="couponModal_modalbarcode"
        >
          <BodyCopy component="div" className="modalbarcode">
            <Barcode className="elem-mt-MED elem-mb-MED" value={coupon.id} barcodeId={coupon.id} />
          </BodyCopy>
        </BodyCopy>
        <div className="couponModal_btnWrapper">
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            onClick={this.handleApplyToBag}
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
          {coupon.legalText}
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
            url={endpoints.termsAndConditionsPage}
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
            url={endpoints.privacyPolicyPage}
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
