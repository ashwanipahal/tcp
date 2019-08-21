import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponTile.style';
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
    <BodyCopy component="li" className={`${className} elem-mb-SM`}>
      <BodyCopy
        component="div"
        className={`coupon ${couponClass} elem-mr-XS`}
        fontSize="fs13"
        fontWeight="black"
        color="white"
        textAlign="center"
      >
        <span>{`${couponTextLabel}`}</span>
      </BodyCopy>
      <BodyCopy component="div" className="elem-pt-XS">
        <BodyCopy
          fontSize="fs12"
          fontWeight="extrabold"
          title={coupon.title}
          className="elem-mb-XXXS"
          data-locator="accountoverview-myplacerewatdstile-rewardvalue"
        >
          {coupon.title}
        </BodyCopy>

        {coupon.offerType === COUPON_REDEMPTION_TYPE.PLACECASH && (
          <BodyCopy fontSize="fs10" data-locator="accountoverview-myplacerewatdstile-rewarduseby">
            {`${labels.lbl_overview_couponValid} ${coupon.effectiveDate} - ${
              coupon.expirationDate
            }`}
          </BodyCopy>
        )}

        {coupon.offerType !== COUPON_REDEMPTION_TYPE.PLACECASH && (
          <BodyCopy fontSize="fs10" data-locator="accountoverview-myplacerewatdstile-rewarduseby">
            {`${labels.lbl_overview_couponUseBy} ${coupon.expirationDate}`}
          </BodyCopy>
        )}
      </BodyCopy>
    </BodyCopy>
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

export default withStyles(CouponTile, styles);
