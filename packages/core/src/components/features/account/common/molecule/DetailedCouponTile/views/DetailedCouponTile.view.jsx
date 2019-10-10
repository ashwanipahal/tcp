import React from 'react';
import PropTypes from 'prop-types';
import Barcode from '@tcp/core/src/components/common/molecules/Barcode';
import { BodyCopy, Image } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/DetailedCouponTile.style';
import {
  COUPON_REDEMPTION_TYPE,
  COUPON_STATUS,
} from '../../../../../../../services/abstractors/CnC/CartItemTile';
import { Anchor, Button } from '../../../../../../common/atoms';
import ErrorMessage from '../../../../../CnC/common/molecules/ErrorMessage';
import CouponIcon from '../../CouponIcon';
import { getIconPath } from '../../../../../../../utils';

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
    onApplyCouponToBagFromList: PropTypes.func,
    handleErrorCoupon: PropTypes.func,
    onRemove: PropTypes.func,
    onViewCouponDetails: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    isMobile: true,
    isDisabled: false,
    onRemove: () => {},
    onViewCouponDetails: () => {},
    handleErrorCoupon: () => {},
    onApplyCouponToBagFromList: () => {},
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

  componentDidUpdate() {
    const { coupon, handleErrorCoupon } = this.props;
    if (coupon.error) {
      handleErrorCoupon(coupon);
    }
  }

  /**
   * This function is used for apply to bag coupon
   * can be passed in the component.
   */
  handleApplyToBag = () => {
    const { onApplyCouponToBagFromList, coupon } = this.props;
    onApplyCouponToBagFromList({
      couponCode: coupon.id,
      id: coupon.id,
      coupon: coupon.id,
    });
  };

  /**
   * This function is used for remove coupon
   * can be passed in the component.
   */
  handleRemove = () => {
    const { onRemove, coupon } = this.props;
    onRemove({ id: coupon.id });
  };

  /**
   * This function is used for view coupon deatils
   * can be passed in the component.
   */
  handleViewCouponDetails = e => {
    e.preventDefault();
    const { onViewCouponDetails, coupon } = this.props;
    onViewCouponDetails(coupon);
  };

  /**
   * This function is to get cta label
   * can be passed in the component.
   * @param {obj} - labels
   * @param {boolean} - isStarted
   * @param {boolean} - isPlaceCash
   * @return {String} - cta label
   */
  getAddToBagCtaLabel = (labels, isStarted, isPlaceCash) => {
    return !isStarted && isPlaceCash
      ? getLabelValue(labels, 'lbl_coupon_seeRedeemDates')
      : getLabelValue(labels, 'lbl_coupon_applyToBag');
  };

  /**
   * This function is to get overlap class to increase the z-index of elemnts
   * can be passed in the component.
   * @param {obj} - status
   * @return {String} - css classname
   */
  overlapClass = status => {
    return status === COUPON_STATUS.APPLIED ? 'overlap' : '';
  };

  /**
   * This function is to get overlay class
   * can be passed in the component.
   * @param {obj} - status
   * @return {String} css classname
   */
  overlapTxtClass = status => {
    return status === COUPON_STATUS.APPLIED ? 'overlap-text' : '';
  };

  render() {
    const { className, coupon, labels, isMobile, isDisabled } = this.props;
    const isApplyButtonDisabled = isDisabled || !coupon.isStarted;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const addToBagCTALabel = this.getAddToBagCtaLabel(labels, coupon.isStarted, isPlaceCash);
    const bagIcon = getIconPath('cart-icon-white');
    const showOverlow = coupon.status === COUPON_STATUS.APPLIED;
    const overlapCls = this.overlapClass(coupon.status);
    const overlapTxtCls = this.overlapTxtClass(coupon.status);
    return (
      <BodyCopy component="div" className={className} data-locator="myrewards-tile">
        {showOverlow && (
          <BodyCopy component="div" data-locator="coupon-overlay" className="overlay">
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              color="white"
              data-locator="coupon-overlay-icon"
              className="overlay__content"
            >
              <Image src={bagIcon} />
              <BodyCopy
                component="p"
                fontSize="fs16"
                fontWeight="extrabold"
                fontFamily="secondary"
                textAlign="center"
                color="white"
                data-locator="coupon-overlay-info"
              >
                {getLabelValue(labels, 'lbl_common_applied_to_bag')}
              </BodyCopy>
            </BodyCopy>
          </BodyCopy>
        )}
        {coupon.isExpiring && (
          <BodyCopy
            fontSize="fs10"
            fontWeight="black"
            className="notification"
            textAlign="center"
            data-locator="myrewards-expiringsoonheader"
          >
            {getLabelValue(labels, 'lbl_coupon_expiringSoon')}
          </BodyCopy>
        )}
        <BodyCopy component="div" className="content elem-pl-SM elem-pr-SM elem-pt-XL">
          <BodyCopy component="div" textAlign="center" className="top-content overlap">
            <CouponIcon coupon={coupon} labels={labels} className={`elem-mb-XS ${overlapCls}`} />
            <BodyCopy
              fontSize="fs16"
              fontFamily="secondary"
              fontWeight="extrabold"
              title={coupon.title}
              className={`elem-mb-SM ${overlapCls} ${overlapTxtCls}`}
              textAlign="center"
              data-locator="myrewards-details"
            >
              {coupon.title}
            </BodyCopy>
            {isMobile && (
              <BodyCopy
                component="div"
                data-locator="myrewards-barcode"
                className="barcode-content hide-on-desktop hide-on-tablet"
              >
                <Barcode value={coupon.id} barcodeId={coupon.id} />
              </BodyCopy>
            )}
          </BodyCopy>
          <ErrorMessage className="error-notification" error={coupon.error} noBackground />
          <BodyCopy component="div" className="bottom-content">
            <BodyCopy component="div" className="coupon-desc elem-mb-SM">
              <BodyCopy component="div" data-locator="myrewards-usebylabel">
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {`${
                    isPlaceCash
                      ? getLabelValue(labels, 'lbl_coupon_couponValid')
                      : getLabelValue(labels, 'lbl_coupon_couponUseBy')
                  }`}
                </BodyCopy>
                <BodyCopy fontSize="fs14" fontFamily="secondary">
                  {isPlaceCash
                    ? `${coupon.effectiveDate} - ${coupon.expirationDate}`
                    : `${coupon.expirationDate}`}
                </BodyCopy>
              </BodyCopy>
              <Anchor
                fontSizeVariation="large"
                onClick={this.handleViewCouponDetails}
                underline
                data-locator="myrewards-detailslink"
              >
                {getLabelValue(labels, 'lbl_coupon_detailsLink')}
              </Anchor>
            </BodyCopy>
            <BodyCopy component="div" className="elem-mb-SM">
              <Button
                buttonVariation="fixed-width"
                fullWidth
                fill="WHITE"
                onClick={this.handleViewCouponDetails}
                className="elem-mb-SM couponDetailsFont"
                data-locator="myrewards-view&printbtn"
              >
                {getLabelValue(labels, 'lbl_coupon_viewPrint')}
              </Button>
              {coupon.applyAlert && <BodyCopy>{coupon.applyAlert}</BodyCopy>}
              {!coupon.applyAlert && coupon.status === COUPON_STATUS.APPLIED ? (
                <Button
                  buttonVariation="fixed-width"
                  fullWidth
                  fill="WHITE"
                  onClick={this.handleRemove}
                  className={`couponDetailsFont ${overlapCls}`}
                  data-locator="myrewards-removefrombagbtn"
                >
                  {getLabelValue(labels, 'lbl_coupon_removeFromBag')}
                </Button>
              ) : (
                <Button
                  buttonVariation="fixed-width"
                  fullWidth
                  fill="BLUE"
                  disabled={isApplyButtonDisabled}
                  onClick={this.handleApplyToBag}
                  data-locator="myrewards-applytobagbtn"
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
