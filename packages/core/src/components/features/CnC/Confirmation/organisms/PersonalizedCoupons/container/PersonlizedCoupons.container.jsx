import { connect } from 'react-redux';
import PersonalizedCoupons from '../views';
import confirmationSelectors from '../../../container/Confirmation.selectors';
import { getCouponsLabels } from '../../../../common/organism/CouponAndPromos/container/Coupon.selectors';
import personalizedCouponsSelectors from './PersonalizedCoupons.selectors';

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    coupons: confirmationSelectors.getPersonalizedCoupons(state),
    couponLabels: getCouponsLabels(state),
    labels: personalizedCouponsSelectors.getConfirmationCouponLabels(state),
  };
};

/* istanbul ignore next */
export default connect(mapStateToProps)(PersonalizedCoupons);
