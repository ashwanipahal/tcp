import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import FAVORITES_CONSTANTS from './Favorites.constants';
import { setWishlistState } from './Favorites.actions';
import addItemsToWishlistAbstractor from '../../../../../services/abstractors/productListing/favorites';

export function* addItemsToWishlist({ payload }) {
  const { colorProductId } = payload;
  const state = yield select();
  const isGuest = state.User.getIn(['personalData', 'isGuest']);
  try {
    if (isGuest) {
      // Prompt user to login
      // On login, request to update the wishlist
    } else {
      const res = yield call(addItemsToWishlistAbstractor, {
        wishlistId: '',
        skuIdOrProductId: colorProductId,
        quantity: 1,
        isProduct: true,
        uniqueId: colorProductId,
      });
      yield put(setWishlistState({ ...res }));
    }
  } catch (err) {
    logger.error(err);
  }
}

function* ProductListingSaga() {
  yield takeLatest(FAVORITES_CONSTANTS.SET_FAVORITES, addItemsToWishlist);
}

export default ProductListingSaga;
