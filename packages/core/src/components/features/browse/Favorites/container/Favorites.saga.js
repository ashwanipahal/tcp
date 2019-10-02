import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import FAVORITES_CONSTANTS from './Favorites.constants';
import {
  setWishlistState,
  getSetWishlistsSummariesActn,
  getSetIsWishlistReadOnlyActn,
  getSetActiveWishlistActn,
} from './Favorites.actions';
import addItemsToWishlistAbstractor, {
  getUserWishLists,
  getWishListbyId,
} from '../../../../../services/abstractors/productListing/favorites';
import {
  getUserLoggedInState,
  getUserContactInfo,
} from '../../../account/User/container/User.selectors';
import { setLoginModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import { isCanada } from '../../../../../utils';

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

export function* loadWishlistsSummaries() {
  try {
    const state = yield select();
    const userName = getUserContactInfo(state).get('firstName');
    const wishlists = yield call(getUserWishLists, userName);
    this.store.dispatch(getSetWishlistsSummariesActn(wishlists));
    return wishlists;
  } catch (err) {
    console.log('err', err);
    return [];
  }
}

const getWishListPrice = wishlistById => {
  console.log('getWishListPrice ==> ', wishlistById);
  // TODO - fix the function getWishListPrice
};
export function* loadActiveWishlist(wishlistId) {
  try {
    const state = yield select();
    const userName = getUserContactInfo(state).get('firstName');
    // const imageGenerator = getProductsOperator(this.store).getImgPath;
    const isCanadaCheck = isCanada();

    const wishlistById = yield call(getWishListbyId, {
      wishlistId,
      userName,
      guestAccessKey: null,
      isCanada: isCanadaCheck /* , imageGenerator */,
    });
    getWishListPrice(wishlistById);
  } catch (err) {
    console.log('err', err);
  }
}

export function* loadActiveWishlistByGuestKey(wishlistId, guestAccessKey) {
  try {
    const state = yield select();
    const userName = getUserContactInfo(state).get('firstName');
    const isCanadaCheck = isCanada();
    // const imageGenerator = getProductsOperator(this.store).getImgPath;

    const wishlistItems = yield call(getWishListbyId, {
      wishlistId,
      userName,
      guestAccessKey,
      isCanada: isCanadaCheck /* , imageGenerator */,
    });
    getSetIsWishlistReadOnlyActn(true);
    getSetActiveWishlistActn(wishlistItems);
    return wishlistItems;
  } catch (err) {
    console.log('err', err);
    return [];
  }
}

function* ProductListingSaga() {
  yield takeLatest(FAVORITES_CONSTANTS.SET_FAVORITES, addItemsToWishlist);
  // yield takeLatest(FAVORITES_CONSTANTS.SET_WISHLISTS_SUMMARIES, loadWishlistsSummaries);
}

export default ProductListingSaga;
