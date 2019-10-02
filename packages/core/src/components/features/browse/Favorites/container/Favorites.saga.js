import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import FAVORITES_CONSTANTS from './Favorites.constants';
import { setWishlistState } from './Favorites.actions';
import addItemsToWishlistAbstractor from '../../../../../services/abstractors/productListing/favorites';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import { setLoginModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

export function* addItemsToWishlist({ payload }) {
  const { colorProductId } = payload;
  const state = yield select();
  const isGuest = !getUserLoggedInState(state);
  try {
    if (isGuest) {
      yield put(setLoginModalMountedState({ state: true }));
      // TODO - On login, request to update the wishlist
    } else {
      const res = yield call(addItemsToWishlistAbstractor, {
        wishlistId: '',
        skuIdOrProductId: colorProductId,
        quantity: 1,
        isProduct: true,
        uniqueId: colorProductId,
      });
      if (res && res.newItemId) {
        yield put(setWishlistState({ colorProductId, isInDefaultWishlist: true }));
      }
    }
  } catch (err) {
    logger.error(err);
  }
}

function* ProductListingSaga() {
  yield takeLatest(FAVORITES_CONSTANTS.SET_FAVORITES, addItemsToWishlist);
}

export default ProductListingSaga;
