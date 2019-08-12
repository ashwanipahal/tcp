import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponTile.style';

export const CouponTile = ({ className, coupon, labels }) => {
  return (
    <BodyCopy component="li" className={`${className} elem-mb-SM`}>
      <BodyCopy component="div" className="coupon-reward elem-mr-XS" fontSize="fs13" fontWeight="black" color="white" textAlign="center">
        {labels.lbl_overview_myPlaceRewardsCouponType}
      </BodyCopy>
      <BodyCopy component="div" className="elem-pt-XS">
        <BodyCopy fontSize="fs12" fontWeight="extrabold" title={coupon.title} className="elem-mb-XXXS">
          {coupon.title}
        </BodyCopy>
        <BodyCopy fontSize="fs10">
          {`${labels.lbl_overview_myPlaceRewardsUseBy} ${coupon.expirationDate}`}
        </BodyCopy>
      </BodyCopy>
    </BodyCopy>
)
};

CouponTile.propTypes = {
  coupon: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({
    lbl_overview_myPlaceRewardsCouponType: PropTypes.string.isRequired,
    lbl_overview_myPlaceRewardsUseBy: PropTypes.string.isRequired
  }).isRequired,
  className: PropTypes.string,
}

CouponTile.defaultProps = {
  className: ''
}

export default withStyles(CouponTile, styles);
