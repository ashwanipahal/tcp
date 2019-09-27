import { connect } from 'react-redux';
import ProductReviews from '../views/ProductReviews';

import { getBazaarvoiceApiUrl } from '../../../container/ProductListing.selectors';
import { getUserLoggedInState, isMprUser, getUsedId } from './ProductReviews.selectors';

function mapStateToProps(state) {
  return {
    isGuest: getUserLoggedInState(state),
    userId: getUsedId(state),
    // onLoginClick: storeOperators.globalSignalsOperator.openLoginDrawer,
    mprId: isMprUser(state),
    bazaarvoiceApiUrl: getBazaarvoiceApiUrl(),
  };
}

export default connect(mapStateToProps)(ProductReviews);
