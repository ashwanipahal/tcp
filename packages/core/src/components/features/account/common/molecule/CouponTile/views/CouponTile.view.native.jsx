import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import {
  CouponTileSection,
  CouponWrapper,
  CouponInfo,
  CouponReward,
} from '../styles/CouponTile.style.native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponTile = ({ coupon, labels }) => {
  let couponTextLabel = '';

  switch (coupon.offerType) {
    case COUPON_REDEMPTION_TYPE.PLACECASH:
      couponTextLabel = `${labels.lbl_overview_couponTypePlacecash}`;
      break;
    case COUPON_REDEMPTION_TYPE.REWARDS:
      couponTextLabel = `${labels.lbl_overview_couponTypeReward}`;
      break;
    default:
      couponTextLabel = `${labels.lbl_overview_couponTypeSaving}`;
  }

  return (
    <CouponTileSection>
      <CouponWrapper>
        <CouponReward>
          <BodyCopy fontSize="fs13" fontWeight="black" color="white" text={couponTextLabel} />
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
  coupon: PropTypes.shape({
    offerType: PropTypes.string,
    expirationDate: PropTypes.string,
    title: PropTypes.string,
    effectiveDate: PropTypes.string,
  }).isRequired,
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: PropTypes.string,
    lbl_overview_myPlaceRewardsUseBy: PropTypes.string,
    lbl_overview_couponTypePlacecash: PropTypes.string,
    lbl_overview_couponTypeReward: PropTypes.string,
    lbl_overview_couponTypeSaving: PropTypes.string,
    lbl_overview_couponValid: PropTypes.string,
    lbl_overview_couponUseBy: PropTypes.string,
  }),
};

CouponTile.defaultProps = {
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: '',
    lbl_overview_myPlaceRewardsUseBy: '',
    lbl_overview_couponTypePlacecash: '',
    lbl_overview_couponTypeReward: '',
    lbl_overview_couponTypeSaving: '',
    lbl_overview_couponValid: '',
    lbl_overview_couponUseBy: '',
  }),
};

export default CouponTile;
