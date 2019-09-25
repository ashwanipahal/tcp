import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import IconText from '../styles/CouponIcon.style.native';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponIcon = ({ coupon, labels }) => {
  let couponTextLabel = '';

  switch (coupon.offerType) {
    case COUPON_REDEMPTION_TYPE.PLACECASH:
      couponTextLabel = `${labels.lbl_common_couponTypePlacecash}`;
      break;
    case COUPON_REDEMPTION_TYPE.REWARDS:
      couponTextLabel = `${labels.lbl_common_couponTypeReward}`;
      break;
    default:
      couponTextLabel = `${labels.lbl_common_couponTypeSaving}`;
  }

  return (
    <IconText type={coupon.offerType}>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        fontWeight="black"
        text={couponTextLabel}
        color="white"
        textAlign="center"
      />
    </IconText>
  );
};

CouponIcon.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_coupon_myPlaceRewardsCouponType: PropTypes.string.isRequired,
    lbl_coupon_myPlaceRewardsUseBy: PropTypes.string.isRequired,
  }),
};

CouponIcon.defaultProps = {
  labels: {
    lbl_coupon_myPlaceRewardsCouponType: '',
    lbl_coupon_myPlaceRewardsUseBy: '',
  },
};

export default CouponIcon;
