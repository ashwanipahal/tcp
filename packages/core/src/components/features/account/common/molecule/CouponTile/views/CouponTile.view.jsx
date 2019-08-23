import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CouponTile.style';
import { COUPON_REDEMPTION_TYPE } from '../../../../../../../services/abstractors/CnC/CartItemTile';
import CouponIconComponent from '../../CouponIcon/views/CouponIcon.view';

export const CouponTile = ({ className, coupon, labels, commonLabels }) => {
  return (
    <BodyCopy component="li" className={`${className} elem-mb-SM`}>
      <CouponIconComponent labels={commonLabels} coupon={coupon} />
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
  commonLabels: PropTypes.shape({}).isRequired,
};

CouponTile.defaultProps = {
  className: '',
};

export default withStyles(CouponTile, styles);
