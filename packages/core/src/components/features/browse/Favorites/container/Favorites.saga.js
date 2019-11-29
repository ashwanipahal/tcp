import { call, put, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import processHelperUtil from '@tcp/core/src/services/abstractors/productListing/ProductDetail.util';
import { FAVORITES_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import getErrorList from '@tcp/core/src/components/features/CnC/BagPage/container/Errors.selector';
import FAVORITES_CONSTANTS from './Favorites.constants';
import {
  setWishlistState,
  setWishlistsSummariesAction,
  getSetIsWishlistReadOnlyAction,
  setActiveWishlistAction,
  getActiveWishlistAction,
  setDeletedItemAction,
  setLoadingState,
  setAddToFavoriteErrorState,
  setWishListShareSuccess,
  setMaximumProductAddedErrorState,
  resetMaximumProductAddedErrorState,
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
import { setAddToFavorite } from '../../ProductListing/container/ProductListing.actions';
import { setAddToFavoritePDP } from '../../ProductDetail/container/ProductDetail.actions';
import { setAddToFavoriteSLP } from '../../SearchDetail/container/SearchDetail.actions';
import { setAddToFavoriteOUTFIT } from '../../OutfitDetails/container/OutfitDetails.actions';
import { setAddToFavoriteBUNDLE } from '../../BundleProduct/container/BundleProduct.actions';

export function* loadActiveWishlistByGuestKey({ payload }) {
  const { wishListId, guestAccessKey } = payload;
  try {
    const state = yield select();
    yield put(setLoadingState({ isDataLoading: true }));
    const userState = getUserContactInfo(state);
    const userName = userState && userState.get('firstName');
    const isCanadaCheck = isCanada();
    const wishlistItems = yield call(getWishListbyId, {
      wishListId,
      userName,
      guestAccessKey,
      isCanada: isCanadaCheck,
      imageGenerator: processHelperUtil.getImgPath,
    });
    yield put(getSetIsWishlistReadOnlyAction(true));
    yield put(setActiveWishlistAction(wishlistItems));
    yield put(setLoadingState({ isDataLoading: false }));
    return wishlistItems;
  } catch (err) {
    yield put(setLoadingState({ isDataLoading: false }));
    return [];
  }
}

/* eslint-disable sonarjs/cognitive-complexity */
// eslint-disable-next-line complexity
export function* addItemsToWishlist({ payload }) {
  const { colorProductId, activeWishListId, productSkuId, pdpColorProductId, page } = payload;
  const state = yield select();
  const isGuest = !getUserLoggedInState(state);
  const errorMapping = getErrorList(state);

  let skuIdOrProductId;

  if (productSkuId) {
    skuIdOrProductId = productSkuId;
  } else if (pdpColorProductId) {
    skuIdOrProductId = pdpColorProductId;
  } else {
    skuIdOrProductId = colorProductId;
  }

  try {
    yield put(setAddToFavoriteErrorState({ errorMessage: '' }));
    if (isGuest) {
      yield put(setLoginModalMountedState({ state: true }));
    } else {
      const res = yield call(addItemsToWishlistAbstractor, {
        wishListId: activeWishListId || '',
        skuIdOrProductId,
        quantity: 1,
        isProduct: true,
        uniqueId: colorProductId,
        errorMapping,
      });

      if (res && res.errorMessage) {
        yield put(setAddToFavoriteErrorState(res));
      }
      if (res && res.newItemId) {
        switch (page) {
          case 'PDP':
            yield put(setAddToFavoritePDP({ pdpColorProductId, res }));
            break;
          case 'PLP':
            yield put(setAddToFavorite({ colorProductId, res }));
            break;
          case 'SLP':
            yield put(setAddToFavoriteSLP({ colorProductId, res }));
            break;
          case 'OUTFIT':
            yield put(setAddToFavoriteOUTFIT({ pdpColorProductId, res }));
            break;
          case 'BUNDLE':
            yield put(setAddToFavoriteBUNDLE({ pdpColorProductId, res }));
            break;
          default:
            break;
        }
        // to update favorite page need to load wish list sumamry
        const activeWishlistObject =
          state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
        const activeWishlistId = activeWishlistObject.id;
        yield put(setWishlistState({ colorProductId, isInDefaultWishlist: true }));
        // Disabling eslint for temporary fix
        // eslint-disable-next-line no-use-before-define
        yield* loadWishlistsSummaries(activeWishlistId);
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
      imageGenerator: processHelperUtil.getImgPath,
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
    yield put(setActiveWishlistAction(updatedWishList));
    yield put(setLoadingState({ isDataLoading: false }));
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
    } else if (typeof config === 'object') {
      const { isDataLoading } = config.payload;
      yield put(setLoadingState({ isDataLoading: isDataLoading || false }));
    }

    const userName = getUserContactInfo(state).get('firstName');
    const wishlists = yield call(getUserWishLists, userName);
    yield put(setWishlistsSummariesAction(wishlists));
    const activeWishListId = wishListId || wishlists.find(list => list.isDefault).id;
    yield put(getActiveWishlistAction(activeWishListId));
  } catch (err) {
    yield put(setLoadingState({ isDataLoading: false }));
    yield null;
  }
}

export function* createNewWishList({ payload: formData }) {
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

export function* createNewWishListMoveItem({ payload: formData }) {
  try {
    yield put(resetMaximumProductAddedErrorState({}));
    const state = yield select();
    const errorMapping = getErrorList(state);
    let createdWishListResponse;
    if (!formData.wisListId) {
      createdWishListResponse = yield call(
        createWishList,
        formData.wishListName,
        formData.isDefault
      );
    }
    const payload = {
      toWishListId: formData.wisListId || createdWishListResponse.id,
      itemId: formData.itemId,
    };
    const activeWishlistObject =
      state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
    const activeWishlistId = activeWishlistObject.id;
    const activeWishlistItem = activeWishlistObject.items.find(
      item => item.itemInfo.itemId === formData.itemId
    );

    const itemMovedResponse = yield call(
      moveItemToNewWishList,
      payload,
      activeWishlistId,
      activeWishlistItem,
      errorMapping
    );
    if (itemMovedResponse && itemMovedResponse.errorMessage) {
      const errorMessages = {
        errorMessage: itemMovedResponse.errorMessage,
        itemId: formData.itemId,
      };
      const data = {};
      data[formData.itemId] = errorMessages;
      yield put(setMaximumProductAddedErrorState({ ...data }));
    } else {
      yield* loadWishlistsSummaries(activeWishlistId);
    }
    if (!itemMovedResponse.success) {
      throw itemMovedResponse;
    }
  } catch (err) {
    yield null;
  }
}

export function* deleteWishListById({ payload: wishListId }) {
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

export function* updateExistingWishList({ payload: formData }) {
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

export function* deleteWishListItemById({ payload }, isByPallLoadSummary = false) {
  try {
    const state = yield select();
    const activeWishlistObject =
      state[FAVORITES_REDUCER_KEY] && state[FAVORITES_REDUCER_KEY].get('activeWishList');
    const activeWishlistId = activeWishlistObject.id;
    const deleteItemResponse = yield call(deleteWishListItem, activeWishlistId, payload.itemId);
    if (!deleteItemResponse.success) {
      throw deleteItemResponse;
    }
    yield put(setDeletedItemAction(payload.itemId));
    if (!isByPallLoadSummary) {
      yield* loadWishlistsSummaries(activeWishlistId);
    }
  } catch (err) {
    yield null;
  }
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
    const {
      shareToEmailAddresses,
      shareFromEmailAddresses,
      shareSubject,
      shareMessage,
    } = formData.payload;
    const emailSentResponse = yield call(
      shareWishlistByEmail,
      activeWishlistId,
      shareFromEmailAddresses,
      shareToEmailAddresses.split(','),
      shareSubject,
      shareMessage
    );

    if (emailSentResponse.successful) {
      yield put(setWishListShareSuccess(true));
    }
  } catch (err) {
    yield null;
  }
}

export function* replaceWishlistItem(payload) {
  try {
    yield* deleteWishListItemById(payload, true);
    yield* addItemsToWishlist(payload);
    const {
      payload: { activeWishListId },
    } = payload;
    yield* loadWishlistsSummaries(activeWishListId);
  } catch (err) {
    yield null;
  }
}

function* FavoriteSaga() {
  yield takeLatest(FAVORITES_CONSTANTS.SET_FAVORITES, addItemsToWishlist);
  yield takeLatest(FAVORITES_CONSTANTS.GET_FAVORITES_WISHLIST, loadWishlistsSummaries);
  yield takeLatest(FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST, loadActiveWishlist);
  yield takeLatest(
    FAVORITES_CONSTANTS.LOAD_ACTIVE_FAVORITES_WISHLIST_GUEST,
    loadActiveWishlistByGuestKey
  );
  yield takeLatest(FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST, createNewWishList);
  yield takeLatest(FAVORITES_CONSTANTS.CREATE_NEW_WISHLIST_MOVE_ITEM, createNewWishListMoveItem);
  yield takeLatest(FAVORITES_CONSTANTS.DELETE_WISHLIST, deleteWishListById);
  yield takeLatest(FAVORITES_CONSTANTS.UPDATE_WISHLIST, updateExistingWishList);
  yield takeLatest(FAVORITES_CONSTANTS.DELETE_WISHLIST_ITEM, deleteWishListItemById);
  yield takeLatest(FAVORITES_CONSTANTS.UPDATE_WISHLIST_ITEM, updateWishListItem);
  yield takeLatest(FAVORITES_CONSTANTS.SEND_WISHLIST_EMAIL, sendWishListMail);
  yield takeLatest(FAVORITES_CONSTANTS.FAVORITES_REPLACE_WISHLIST_ITEM, replaceWishlistItem);
}

export default FavoriteSaga;
