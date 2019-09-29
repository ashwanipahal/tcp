import { connect } from 'react-redux';
import ProductReviews from '../views/ProductReviews';

import { getBazaarvoiceApiUrl } from '../../../container/ProductListing.selectors';
import { isMprUser, getUsedId, getLabels } from './ProductReviews.selectors';

function mapStateToProps(state) {
  return {
    userId: getUsedId(state),
    // onLoginClick: storeOperators.globalSignalsOperator.openLoginDrawer,
    // TODO confirm with account for mpr id or state.
    mprId: isMprUser(state),
    bazaarvoiceApiUrl: getBazaarvoiceApiUrl(),
    ratingsAndReviewsLabel: getLabels(state),
  };
}

export default connect(mapStateToProps)(ProductReviews);
