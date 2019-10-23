import { connect } from 'react-redux';
import ProductReviews from '../views/ProductReviews';
import { getBazaarvoiceApiUrl } from '../../../container/ProductListing.selectors';
import { getLabels } from './ProductReviews.selectors';
import {
  mprUserId,
  getUserId,
  getUserLoggedInState,
} from '../../../../../account/User/container/User.selectors';
import { setLoginModalMountedState } from '../../../../../account/LoginPage/container/LoginPage.actions';

function mapStateToProps(state) {
  return {
    userId: getUserId(state),
    isGuest: !getUserLoggedInState(state),
    mprId: mprUserId(state),
    bazaarvoiceApiUrl: getBazaarvoiceApiUrl(),
    ratingsAndReviewsLabel: getLabels(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick: () => {
      dispatch(setLoginModalMountedState({ state: true }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReviews);
