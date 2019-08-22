import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  CouponTileSection,
  CouponWrapper,
  CouponInfo,
  CouponReward,
} from '../styles/CouponTile.style.native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponTile = ({ coupon, labels }) => {
  let couponClass = '';
  let couponTextLabel = '';

  switch (coupon.offerType) {
    case COUPON_REDEMPTION_TYPE.PLACECASH:
      couponClass = 'coupon-placecash';
      couponTextLabel = `${labels.lbl_overview_couponTypePlacecash}`;
      break;
    case COUPON_REDEMPTION_TYPE.REWARDS:
      couponClass = 'coupon-reward';
      couponTextLabel = `${labels.lbl_overview_couponTypeReward}`;
      break;
    default:
      couponClass = 'coupon-saving';
      couponTextLabel = `${labels.lbl_overview_couponTypeSaving}`;
  }

  return (
    <CouponTileSection>
      <CouponWrapper>
        <CouponReward>
          <BodyCopy
            fontSize="fs13"
            fontWeight="black"
            color="white"
            text={couponTextLabel}
          />
        </CouponReward>

        <CouponInfo>
          <BodyCopy
            fontSize="fs12"
            fontWeight="semibold"
            title={coupon.title}
            data-locator="accountoverview-myplacerewatdstile-rewardvalue"
            text={coupon.title}
          />

          {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH && (
            <BodyCopy
              fontSize="fs10"
              data-locator="accountoverview-myplacerewatdstile-rewarduseby"
              text={`${labels.lbl_overview_couponValid} ${coupon.effectiveDate} - ${
                coupon.expirationDate
              }`}
            />
          )}

          {coupon.offerType !== COUPON_REDEMPTION_TYPE.PLACECASH && (
            <BodyCopy
              fontSize="fs10"
              data-locator="accountoverview-myplacerewatdstile-rewarduseby"
              text={`${labels.lbl_overview_couponUseBy} ${coupon.expirationDate}`}
            />
          )}
        </CouponInfo>
      </CouponWrapper>
    </CouponTileSection>
  );
};

CouponTile.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsUseBy: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

CouponTile.defaultProps = {
  className: '',
};

export default CouponTile;
