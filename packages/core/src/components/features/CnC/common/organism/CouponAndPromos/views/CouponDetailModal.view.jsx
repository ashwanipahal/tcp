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
    const { labels, coupon, className, applyToBag } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="couponModal_modalTitle"
          dataLocator="coupondetailmodalconfirmtext"
        >
          {coupon.title}
        </BodyCopy>
        <BodyCopy
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="couponModal_modalSubTitle"
          dataLocator="coupondetailmodalconfirmtext"
        >
          {`${labels.USE_BY_TEXT} ${coupon.expirationDate}`}
        </BodyCopy>
        <div className="couponModal_modalbarcode">{coupon.id}</div>
        <div className="couponModal_btnWrapper">
          <Button
            buttonVariation="fixed-width"
            fill="BLUE"
            onClick={applyToBag}
            className="couponModal_applyToBag couponModal_btn"
            dataLocator="coupondetailmodalyesdeletebtn"
          >
            {labels.APPLY_TO_BAG}
          </Button>
        </div>
        <div className="couponModal_print">
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            data-locator="couponcard-help-applying"
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
          dataLocator="coupondetailmodalconfirmtext"
        >
          {`${labels.MODAL_LONG_DESCRIPTION}`}
        </BodyCopy>
        <BodyCopy
          fontFamily="secondaryFontFamily"
          className="couponModal_modalLongDesc"
          dataLocator="coupondetailmodalconfirmtext"
        >
          {`${labels.MODAL_SHORT_DESCRIPTION}`}
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            data-locator="couponcard-help-applying"
            onClick={this.tAndCClick}
            className="couponModal_print_anchor"
          >
            {`${labels.TERMS_AND_CONDITIONS}`}
          </Anchor>

          {` and `}
          <Anchor
            underline
            anchorVariation="primary"
            fontSize="fs14"
            data-locator="couponcard-help-applying"
            onClick={this.tAndCClick}
            className="couponModal_print_anchor"
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
        minHeight="500px"
        fixedWidth
        closeIconDataLocator="coupondetailmodalcrossicon"
      >
        {this.renderModal()}
      </Modal>
    );
  }
}

export default withStyles(CouponDetailModal, styles);
