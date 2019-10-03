/* istanbul ignore file */
import { connect } from 'react-redux';
import PersonalizedCoupons from '../views';
import confirmationSelectors from '../../../container/Confirmation.selectors';
import { getCouponsLabels } from '../../../../common/organism/CouponAndPromos/container/Coupon.selectors';
import personalizedCouponsSelectors from './PersonalizedCoupons.selectors';

const mapStateToProps = state => {
  return {
    coupons: confirmationSelectors.getPersonalizedCoupons(state),
    couponLabels: getCouponsLabels(state),
    labels: personalizedCouponsSelectors.getConfirmationCouponLabels(state),
  };
};

export default connect(mapStateToProps)(PersonalizedCoupons);
