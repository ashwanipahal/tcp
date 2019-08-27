import React from 'react';
import PropTypes from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import CustomButton from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import {
  TileWrapper,
  TileContentWrapper,
  Notification,
  TileContent,
  TileTopContent,
  TileDesc,
  DateLbl,
  ButtonWrapper,
} from '../styles/DetailedCouponTile.native.style';
import {
  COUPON_REDEMPTION_TYPE,
  COUPON_STATUS,
} from '../../../../../../../services/abstractors/CnC/CartItemTile';
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
    isDisabled: PropTypes.bool,
    onApplyCouponToBag: PropTypes.func,
    onRemove: PropTypes.func,
    onViewCouponDetails: PropTypes.func,
  };

  static defaultProps = {
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
    const { coupon, labels, isDisabled } = this.props;
    const isApplyButtonDisabled = isDisabled || !coupon.isStarted;
    const isPlaceCash = coupon.redemptionType === COUPON_REDEMPTION_TYPE.PLACECASH;
    const addToBagCTALabel = this.getAddToBagCtaLabel(labels, coupon.isStarted, isPlaceCash);
    const colorPallete = createThemeColorPalette();
    return (
      <TileWrapper>
        <TileContentWrapper>
          {coupon.isExpiring && (
            <Notification>
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs12"
                textAlign="center"
                color="white"
                text={labels.lbl_coupon_expiringSoon}
              />
            </Notification>
          )}
          <TileContent>
            <TileTopContent>
              <CouponIcon coupon={coupon} labels={labels} />
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                textAlign="center"
                data-locator="accountoverview-myplacerewatdstile-rewardvalue"
                text={coupon.title}
              />
            </TileTopContent>
            <TileDesc>
              <DateLbl>
                <BodyCopy
                  data-locator="accountoverview-myplacerewatdstile-rewarduseby"
                  text={`${
                    isPlaceCash ? labels.lbl_coupon_couponValid : labels.lbl_coupon_couponUseBy
                  }`}
                />
                <BodyCopy
                  text={
                    isPlaceCash
                      ? `${coupon.effectiveDate} - ${coupon.expirationDate}`
                      : `${coupon.expirationDate}`
                  }
                />
              </DateLbl>
              <Anchor
                fontSizeVariation="large"
                underline
                onPress={() => {
                  this.handleViewCouponDetails();
                }}
                anchorVariation="primary"
                data-locator="my-rewards-program-details"
                text={labels.lbl_coupon_detailsLink}
                color="gray.900"
              />
            </TileDesc>
            <ButtonWrapper>
              <CustomButton
                text={labels.lbl_coupon_viewPrint}
                buttonVariation="variable-width"
                fill="WHITE"
                onPress={() => {
                  this.handleViewCouponDetails();
                }}
              />
            </ButtonWrapper>
            {coupon.applyAlert && <BodyCopy text={coupon.applyAlert} />}
            {!coupon.applyAlert && coupon.status === COUPON_STATUS.APPLIED ? (
              <CustomButton
                text={labels.lbl_coupon_removeFromBag}
                buttonVariation="variable-width"
                fill="BLUE"
                color={colorPallete.white}
                onPress={() => {
                  this.handleRemove();
                }}
              />
            ) : (
              <CustomButton
                text={addToBagCTALabel}
                buttonVariation="variable-width"
                disabled={isApplyButtonDisabled}
                fill="BLUE"
                color={colorPallete.white}
                onPress={() => {
                  this.handleApplyToBag();
                }}
              />
            )}
          </TileContent>
        </TileContentWrapper>
      </TileWrapper>
    );
  }
}

export default DetailedCouponTile;
