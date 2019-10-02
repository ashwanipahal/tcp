import { connect } from 'react-redux';
import PersonalizedCoupons from '../views';
import confirmationSelectors from '../../../container/Confirmation.selectors';

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    coupons: confirmationSelectors.getPersonalizedCoupons(state),
  };
};

/* istanbul ignore next */
export default connect(mapStateToProps)(PersonalizedCoupons);
