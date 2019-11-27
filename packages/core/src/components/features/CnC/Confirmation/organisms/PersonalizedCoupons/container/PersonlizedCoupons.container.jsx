/* istanbul ignore file */
import { connect } from 'react-redux';
import { getIsWindowsOS } from '@tcp/core/src/components/features/CnC/Checkout/util/utility';
import PersonalizedCoupons from '../views';
import confirmationSelectors from '../../../container/Confirmation.selectors';
import { getCouponsLabels } from '../../../../common/organism/CouponAndPromos/container/Coupon.selectors';
import personalizedCouponsSelectors from './PersonalizedCoupons.selectors';

const mapStateToProps = state => {
  return {
    couponLoading: confirmationSelectors.getOdmLoading(state),
    coupons: confirmationSelectors.getPersonalizedCoupons(state),
    couponLabels: getCouponsLabels(state),
    labels: personalizedCouponsSelectors.getConfirmationCouponLabels(state),
    isWindowsOS: getIsWindowsOS(),
  };
};

export default connect(mapStateToProps)(PersonalizedCoupons);
