import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { getImgPath } from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import { FAVORITES_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import FAVORITES_CONSTANTS from './Favorites.constants';
import {
  setWishlistState,
  setWishlistsSummariesActn,
  getSetIsWishlistReadOnlyActn,
  getSetActiveWishlistActn,
  setActiveWishlistActn,
  getActiveWishlistActn,
  setLastDeletedItemIdActn,
} from './Favorites.actions';
import addItemsToWishlistAbstractor, {
  getUserWishLists,
  getWishListbyId,
  getProductsPrices,
  createWishList,
  moveItemToNewWishList,
  deleteWishList,
  updateWishlistName,
  deleteWishListItem,
  shareWishlistByEmail,
} from '../../../../../services/abstractors/productListing/favorites';
import {
  getUserLoggedInState,
  getUserContactInfo,
} from '../../../account/User/container/User.selectors';
import { setLoginModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';
import { isCanada } from '../../../../../utils';

export function* loadActiveWishlistByGuestKey(wishListId, guestAccessKey) {
  try {
    const state = yield select();
    const userName = getUserContactInfo(state).get('firstName');
    const isCanadaCheck = isCanada();
    // const imageGenerator = getProductsOperator(this.store).getImgPath;

    const wishlistItems = yield call(getWishListbyId, {
      wishListId,
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
        wishListId: '',
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

export function* loadActiveWishlist({ wishListId }) {
  try {
    const state = yield select();
    const userName = getUserContactInfo(state).get('firstName');
    const wishlistById = yield call(getWishListbyId, {
      wishListId,
      userName,
      guestAccessKey: null,
      isCanada: isCanada(),
      imageGenerator: getImgPath,
    });
    const wishlistItems = wishlistById.items;
    const prices = yield call(
      getProductsPrices,
      wishlistItems.map(wishlist => wishlist.skuInfo.colorProductId)
    );
    const WishlistWithUnbxdPrice = wishlistItems.map(wishlist => {
      return {
        ...wishlist,
        productInfo: {
          ...wishlist.productInfo,
          ...prices[wishlist.skuInfo.colorProductId],
        },
      };
    });
    const updatedWishList = { ...wishlistById, items: [...WishlistWithUnbxdPrice] };
    yield put(setActiveWishlistActn(updatedWishList));
  } catch (err) {
    yield null;
  }
}

export function* loadWishlistsSummaries(config) {
  try {
    const state = yield select();
    let wishListId;
    if (typeof config !== 'object') {
      wishListId = config;
    }
    const userName = getUserContactInfo(state).get('firstName');
    const wishlists = yield call(getUserWishLists, userName);
    yield put(setWishlistsSummariesActn(wishlists));
    const activeWishListId = wishListId || wishlists.find(list => list.isDefault).id;
    yield put(getActiveWishlistActn(activeWishListId));
  } catch (err) {
    yield null;
  }
}

export function* createNewWishList(formData) {
  try {
    const createdWishListResponse = yield call(
      createWishList,
      formData.wishListName,
      formData.isDefault
    );
    yield* loadWishlistsSummaries(createdWishListResponse.id);
  } catch (err) {
    yield null;
  }
}

export function* createNewWishListMoveItem(formData) {
  try {
    const createdWishListResponse = yield call(
      createWishList,
      formData.wishListName,
      formData.isDefault
    );
    const payload = {
      toWishListId: createdWishListResponse.id,
      itemId: formData.id,
    };
    const state = yield select();
    const activeWishlistObject =
      state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
    const activeWishlistId = activeWishlistObject.id;
    const activeWishlistItem = activeWishlistObject.items.find(
      item => item.itemInfo.itemId === formData.id
    );
    const itemMovedResponse = yield call(
      moveItemToNewWishList,
      payload,
      activeWishlistId,
      activeWishlistItem
    );
    yield* loadWishlistsSummaries(activeWishlistId);
    if (!itemMovedResponse.success) {
      throw itemMovedResponse;
    }
  } catch (err) {
    yield null;
  }
}

export function* deleteWishListById(wishListId) {
  try {
    const deleteWishListResponse = yield call(deleteWishList, wishListId);
    if (!deleteWishListResponse.success) {
      throw deleteWishListResponse;
    }
    yield* loadWishlistsSummaries();
  } catch (err) {
    yield null;
  }
}

export function* updateExistingWishList(formData) {
  try {
    const updateWishListResponse = yield call(
      updateWishlistName,
      formData.wishlistId,
      formData.wishlistName,
      formData.setAsDefault
    );
    if (!updateWishListResponse.success) {
      throw updateWishListResponse;
    }
    yield* loadWishlistsSummaries(formData.wishlistId);
  } catch (err) {
    yield null;
  }
}

export function* deleteWishListItemById(formData) {
  const state = yield select();
  const activeWishlistObject =
    state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
  const activeWishlistId = activeWishlistObject.id;
  const deleteItemResponse = yield call(deleteWishListItem, activeWishlistId, formData.itemId);
  if (!deleteItemResponse.success) {
    throw deleteItemResponse;
  }
  yield put(setLastDeletedItemIdActn(formData.itemId));
  yield* loadWishlistsSummaries(activeWishlistId);
}

export function* updateWishListItem(formData) {
  const { itemId, quantity, color, productInfo } = formData;
  const state = yield select();
  const activeWishlistObject =
    state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
  const activeWishlistId = activeWishlistObject.id;
  const variantSelected =
    productInfo.colorFitsSizesMap &&
    productInfo.colorFitsSizesMap.find(entry => entry.color.name === color);
  const uniqueId = (variantSelected && variantSelected.colorDisplayId) || '';
  yield call(deleteWishListItem, activeWishlistId, itemId);
  yield call(addItemsToWishlistAbstractor, {
    wishListId: activeWishlistId,
    skuIdOrProductId: uniqueId,
    quantity,
    isProduct: true,
    uniqueId,
  });
  yield* loadWishlistsSummaries();
}

export function* sendWishListMail(formData) {
  try {
    const state = yield select();
    const activeWishlistObject =
      state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
    const activeWishlistId = activeWishlistObject.id;
    const { shareToEmailAddresses, shareFromEmailAddresses, shareSubject, shareMessage } = formData;
    const emailSentResponse = yield call(
      shareWishlistByEmail,
      activeWishlistId,
      shareFromEmailAddresses,
      shareToEmailAddresses.split(','),
      shareSubject,
      shareMessage
    );
    if (emailSentResponse.successful) {
      throw emailSentResponse;
    }
  } catch (err) {
    yield null;
  }
}

function* ProductListingSaga() {
  yield takeLatest(FAVORITES_CONSTANTS.SET_FAVORITES, addItemsToWishlist);
  yield takeLatest(FAVORITES_CONSTANTS.GET_FAVORITES_WISHLIST, loadWishlistsSummaries);
  yield takeLatest(FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST, loadActiveWishlist);
  yield takeLatest(FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST, createNewWishList);
  yield takeLatest(FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST_MOVE_ITEM, createNewWishListMoveItem);
  yield takeLatest(FAVORITES_CONSTANTS.DELETE_WISHLIST, deleteWishListById);
  yield takeLatest(FAVORITES_CONSTANTS.UPDATE_WISHLIST, updateExistingWishList);
  yield takeLatest(FAVORITES_CONSTANTS.DELETE_WISHLIST_ITEM, deleteWishListItemById);
  yield takeLatest(FAVORITES_CONSTANTS.UPDATE_WISHLIST_ITEM, updateWishListItem);
  yield takeLatest(FAVORITES_CONSTANTS.SEND_WISHLIST_EMAIL, sendWishListMail);
}

export default ProductListingSaga;
