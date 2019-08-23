import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponIcon.style';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';

export const CouponIcon = ({ className, coupon, labels }) => {
  let couponClass = '';
  let couponTextLabel = '';

  switch (coupon.offerType) {
    case COUPON_REDEMPTION_TYPE.PLACECASH:
      couponClass = 'coupon-placecash';
      couponTextLabel = `${labels.lbl_common_couponTypePlacecash}`;
      break;
    case COUPON_REDEMPTION_TYPE.REWARDS:
      couponClass = 'coupon-reward';
      couponTextLabel = `${labels.lbl_common_couponTypeReward}`;
      break;
    default:
      couponClass = 'coupon-saving';
      couponTextLabel = `${labels.lbl_common_couponTypeSaving}`;
  }

  return (
    <BodyCopy
      component="div"
      className={`${className} coupon ${couponClass} elem-mr-XS`}
      fontSize="fs13"
      fontWeight="black"
      color="white"
      textAlign="center"
    >
      <span>{`${couponTextLabel}`}</span>
    </BodyCopy>
  );
};

CouponIcon.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_coupon_myPlaceRewardsCouponType: PropTypes.string.isRequired,
    lbl_coupon_myPlaceRewardsUseBy: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

CouponIcon.defaultProps = {
  className: '',
  labels: {
    lbl_coupon_myPlaceRewardsCouponType: '',
    lbl_coupon_myPlaceRewardsUseBy: '',
  },
};

export default withStyles(CouponIcon, styles);
