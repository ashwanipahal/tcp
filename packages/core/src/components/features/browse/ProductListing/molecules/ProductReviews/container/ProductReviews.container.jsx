import { connect } from 'react-redux';
import ProductReviews from '../views/ProductReviews';

import { getBazaarvoiceApiUrl } from '../../../container/ProductListing.selectors';
import { getLabels, getUserLoggedInState } from './ProductReviews.selectors';
import { mprUserId, getUserId } from '../../../../../account/User/container/User.selectors';

function mapStateToProps(state) {
  return {
    userId: getUserId(state),
    isGuest: getUserLoggedInState(state),
    // onLoginClick: storeOperators.globalSignalsOperator.openLoginDrawer,
    mprId: mprUserId(state),
    bazaarvoiceApiUrl: getBazaarvoiceApiUrl(),
    ratingsAndReviewsLabel: getLabels(state),
  };
}

export default connect(mapStateToProps)(ProductReviews);
