import React from 'react';
import PropTypes from 'prop-types';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/DetailedCouponTile.style';
import {
  COUPON_REDEMPTION_TYPE,
  COUPON_STATUS,
} from '../../../../../../../services/abstractors/CnC/CartItemTile';
import { Anchor, Button } from '../../../../../../common/atoms';
import CouponIcon from '../../CouponIcon';

export class DetailedCouponTile extends React.Component {
  static propTypes = {
    coupon: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({
      lbl_coupon_expiringSoon: PropTypes.string,
      lbl_coupon_couponValid: PropTypes.string,
      lbl_coupon_couponUseBy: PropTypes.string,
      lbl_coupon_detailsLink: PropTypes.string,
      lbl_coupon_viewPrint: PropTypes.string,
      lbl_coupon_removeFromBag: PropTypes.string,
      lbl_coupon_applyToBag: PropTypes.string,
      lbl_common_couponTypePlacecash: PropTypes.string,
      lbl_common_couponTypeReward: PropTypes.string,
      lbl_common_couponTypeSaving: PropTypes.string,
    }),
    className: PropTypes.string,
    isMobile: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onApplyCouponToBag: PropTypes.func,
    onRemove: PropTypes.func,
    onViewCouponDetails: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    isMobile: true,
    isDisabled: false,
    onApplyCouponToBag: () => {},
    onRemove: () => {},
    onViewCouponDetails: () => {},
    labels: {
      lbl_coupon_expiringSoon: '',
      lbl_coupon_couponValid: '',
      lbl_coupon_couponUseBy: '',
      lbl_coupon_detailsLink: '',
      lbl_coupon_viewPrint: '',
      lbl_coupon_removeFromBag: '',
      lbl_coupon_applyToBag: '',
      lbl_common_couponTypePlacecash: '',
      lbl_common_couponTypeReward: '',
      lbl_common_couponTypeSaving: '',
    },
  };

  handleApplyToBag = () => {
    const { onApplyCouponToBag, coupon } = this.props;
    onApplyCouponToBag({
      couponCode: coupon.id,
    });
  };

  handleRemove = () => {
    const { onRemove, coupon } = this.props;
    onRemove({ couponCode: coupon.id });
  };

  handleViewCouponDetails = () => {
    const { onViewCouponDetails, coupon } = this.props;
    onViewCouponDetails(coupon);
  };

  getAddToBagCtaLabel = (labels, isStarted, isPlaceCash) => {
    return !isStarted && isPlaceCash
      ? labels.lbl_coupon_seeRedeemDates
      : labels.lbl_coupon_applyToBag;
  };

  render() {
    const { className, coupon, labels, isMobile, isDisabled } = this.props;
    const isApplyButtonDisabled = isDisabled || !coupon.isStarted;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const addToBagCTALabel = this.getAddToBagCtaLabel(labels, coupon.isStarted, isPlaceCash);

    return (
      <BodyCopy component="div" className={className}>
        {coupon.isExpiring && (
          <BodyCopy fontSize="fs10" fontWeight="black" className="notification" textAlign="center">
            {labels.lbl_coupon_expiringSoon}
          </BodyCopy>
        )}
        <BodyCopy component="div" className="content elem-pl-SM elem-pr-SM elem-pt-XL">
          <BodyCopy component="div" textAlign="center" className="top-content">
            <CouponIcon coupon={coupon} labels={labels} className="elem-mb-XS" />
            <BodyCopy
              fontSize="fs14"
              fontWeight="extrabold"
              title={coupon.title}
              className="elem-mb-SM"
              textAlign="center"
              data-locator="accountoverview-myplacerewatdstile-rewardvalue"
            >
              {coupon.title}
            </BodyCopy>
            {isMobile && (
              <BodyCopy component="div" className="barcode-content hide-on-desktop hide-on-tablet">
                <Barcode value={coupon.id} barcodeId={coupon.id} />
              </BodyCopy>
            )}
          </BodyCopy>

          <BodyCopy component="div" className="bottom-content">
            <BodyCopy component="div" className="coupon-desc elem-mb-SM">
              <BodyCopy component="div">
                <BodyCopy
                  fontSize="fs14"
                  data-locator="accountoverview-myplacerewatdstile-rewarduseby"
                  fontFamily="secondary"
                >
                  {`${isPlaceCash ? labels.lbl_coupon_couponValid : labels.lbl_coupon_couponUseBy}`}
                </BodyCopy>
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {isPlaceCash
                    ? `${coupon.effectiveDate} - ${coupon.expirationDate}`
                    : `${coupon.expirationDate}`}
                </BodyCopy>
              </BodyCopy>
              <Anchor fontSizeVariation="xlarge" underline>
                {labels.lbl_coupon_detailsLink}
              </Anchor>
            </BodyCopy>
            <BodyCopy component="div" className="elem-mb-SM">
              <Button
                buttonVariation="fixed-width"
                fullWidth
                fill="WHITE"
                onClick={this.handleViewCouponDetails}
                className="elem-mb-SM"
              >
                {labels.lbl_coupon_viewPrint}
              </Button>
              {coupon.applyAlert && <BodyCopy>{coupon.applyAlert}</BodyCopy>}
              {!coupon.applyAlert && coupon.status === COUPON_STATUS.APPLIED ? (
                <Button
                  buttonVariation="fixed-width"
                  fullWidth
                  fill="BLUE"
                  onClick={this.handleRemove}
                >
                  {labels.lbl_coupon_removeFromBag}
                </Button>
              ) : (
                <Button
                  buttonVariation="fixed-width"
                  fullWidth
                  fill="BLUE"
                  disabled={isApplyButtonDisabled}
                  onClick={this.handleApplyToBag}
                >
                  {addToBagCTALabel}
                </Button>
              )}
            </BodyCopy>
          </BodyCopy>
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(DetailedCouponTile, styles);
