import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponTile.style';

export const CouponTile = ({ className, coupon, labels }) => {
  let couponClass = '';
  let couponTextLabel = '';
  let couponType = '';
  switch (coupon.offerType) {
    case 'PC':
    case 'PLACECASH':
      couponClass = 'coupon-placecash';
      couponTextLabel = `${labels.lbl_overview_couponTypePlacecash}`;
      couponType = 'placecash';
      break;
    case 'rewards':
      couponClass = 'coupon-reward';
      couponTextLabel = `${labels.lbl_overview_couponTypeReward}`;
      couponType = 'reward';
      break;
    default:
      couponClass = 'coupon-saving';
      couponTextLabel = `${labels.lbl_overview_couponTypeSaving}`;
      couponType = 'savings';
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

        {couponType === 'placecash' && (
          <BodyCopy fontSize="fs10" data-locator="accountoverview-myplacerewatdstile-rewarduseby">
            {`${labels.lbl_overview_couponValid} ${coupon.effectiveDate} - ${
              coupon.expirationDate
            }`}
          </BodyCopy>
        )}

        {couponType !== 'placecash' && (
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
