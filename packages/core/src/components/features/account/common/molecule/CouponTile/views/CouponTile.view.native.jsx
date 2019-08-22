import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponTile = ({ className, coupon, labels }) => {
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
    <View>
      <BodyCopy
        fontSize="fs13"
        fontWeight="black"
        color="black"
        textAlign="center"
        text={couponTextLabel}
      />
    </View>
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
