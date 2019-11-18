/**
 * These are temporary changes for a dummy login page
 */
// TODO: Need fix unused/proptypes eslint error

import { call, takeLatest, put, delay, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { parseProductFromAPI } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.dataMassage';
import { getImgPath } from '@tcp/core/src/components/features/browse/ProductListingPage/util/utility';
import { getSaveForLaterSwitch } from '@tcp/core/src/components/features/CnC/SaveForLater/container/SaveForLater.selectors';
import {
  setLoaderState,
  setSectionLoaderState,
} from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { setClickAnalyticsData, trackClick } from '@tcp/core/src/analytics/actions';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';
import CARTPAGE_CONSTANTS from '../CartItemTile.constants';

import fetchData from '../../../../../service/API';
import {
  removeCartItemComplete,
  updateCartItemComplete,
  getProductSKUInfoSuccess,
  setToggleCartItemError,
  clearToggleCartItemError,
  setBossBopisToggleCartItemError,
  clearToggleBossBopisCartItemError,
} from './CartItemTile.actions';
import {
  AddToPickupError,
  AddToCartError,
  clearAddToBagErrorState,
  clearAddToPickupErrorState,
} from '../../AddedToBag/container/AddedToBag.actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import endpoints from '../../../../../service/endpoint';
import { removeItem, updateItem } from '../../../../../services/abstractors/CnC';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import {
  isItemBossBopisInEligible,
  getIsDeleteConfirmationModalEnabled,
} from './CartItemTile.selectors';
import getProductInfoById from '../../../../../services/abstractors/productListing/productDetail';
import { openPickupModalWithValues } from '../../../../common/organisms/PickupStoreModal/container/PickUpStoreModal.actions';
import { handleServerSideErrorAPI } from '../../Checkout/container/Checkout.saga.util';

const { checkoutIfItemIsUnqualified } = BagPageSelectors;

export function* afterRemovingCartItem() {
  yield put(setLoaderState(false));
  yield put(BAG_PAGE_ACTIONS.setCartItemsUpdating({ isDeleting: true }));
  yield delay(3000);
  yield put(BAG_PAGE_ACTIONS.setCartItemsUpdating({ isDeleting: false }));
  yield put(BAG_PAGE_ACTIONS.setCartItemsSFL(false));
}

/**
 *@function confirmRemoveItem to be invoked to delete item form cart
 *
 * @export
 * @param {*} { payload, afterHandler }
 */
export function* confirmRemoveItem({ payload, afterHandler, isMiniBag }) {
  try {
    if (isMiniBag || payload.isMiniBag) {
      yield put(setSectionLoaderState({ miniBagLoaderState: true, section: 'minibag' }));
    } else {
      yield put(setLoaderState(true));
    }
    const res = yield call(removeItem, payload);
    yield put(removeCartItemComplete(res));
    if (afterHandler) {
      afterHandler();
    }
    yield put(
      BAG_PAGE_ACTIONS.getCartData({
        onCartRes: afterRemovingCartItem,
        recalcRewards: true,
        isRecalculateTaxes: true,
        translation: false,
        excludeCartItems: false,
      })
    );
    yield put(setLoaderState(false));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    logger.error(err);
    yield call(handleServerSideErrorAPI, err, CARTPAGE_CONSTANTS.CART_ITEM_TILE);
  }
}

/**
 *
 * @function removeCartItem to be called when item delete from cart is required it opens the confirmation modal if function is invoked from bag page and item is available
 * @export
 * @param {*} { payload }
 *
 */
export function* removeCartItem({ payload }) {
  yield put(setLoaderState(true));
  const { itemId, pageView } = payload;
  if (pageView === 'myBag') {
    const isUnqualifiedItem = yield select(checkoutIfItemIsUnqualified, itemId);
    const isItemInEligible = yield select(isItemBossBopisInEligible, payload);
    const isShowSaveForLaterSwitch = yield select(getSaveForLaterSwitch);
    const isDeleteConfirmationModalEnabled = yield select(getIsDeleteConfirmationModalEnabled);
    if (
      isUnqualifiedItem ||
      isItemInEligible ||
      !isShowSaveForLaterSwitch ||
      !isDeleteConfirmationModalEnabled
    ) {
      yield call(confirmRemoveItem, { payload: itemId });
      return;
    }
    yield put(BAG_PAGE_ACTIONS.openItemDeleteConfirmationModal(payload));
  } else {
    yield put(setLoaderState(false));
    yield call(confirmRemoveItem, { payload: itemId, isMiniBag: true });
  }
}

/**
 *
 * @function updateSagaErrorActions
 * @description decided error actions on basis of result of update item call
 * @param {*} updateActionType
 * @param {*} errorMessage
 */
function* updateSagaErrorActions(updateActionType, errorMessage) {
  if (updateActionType) {
    yield put(AddToPickupError(errorMessage));
  } else {
    yield put(AddToCartError(errorMessage));
  }
}

function* setUpdateItemErrorMessages(payload, errorMessage) {
  if (payload.fromToggling) {
    yield put(
      setToggleCartItemError({
        errorMessage,
        itemId: payload.apiPayload.orderItem[0].orderItemId,
      })
    );
  } else if (payload.fromTogglingBossBopis) {
    yield put(
      setBossBopisToggleCartItemError({
        errorMessage,
        itemId: payload.apiPayload.orderItem[0].orderItemId,
        targetOrderType: payload.apiPayload.x_updatedItemType,
      })
    );
  } else {
    yield put(AddToPickupError(errorMessage));
  }
}

export function* updateCartItemSaga({ payload }) {
  const { updateActionType } = payload;
  try {
    yield put(setLoaderState(true));
    yield put(setSectionLoaderState({ miniBagLoaderState: true, section: 'minibag' }));
    yield put(clearAddToBagErrorState());
    yield put(clearAddToPickupErrorState());
    yield put(clearToggleCartItemError());
    yield put(clearToggleBossBopisCartItemError());
    const errorMapping = yield select(BagPageSelectors.getErrorMapping);
    const res = yield call(updateItem, payload, errorMapping);
    const cartOrderItems = yield select(BagPageSelectors.getOrderItems);
    const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
    yield put(
      setClickAnalyticsData({
        customEvents: ['event68'],
        products: productsData,
        eventName: 'cart update',
      })
    );
    yield put(trackClick('cart update'));
    const { callBack } = payload;
    yield put(updateCartItemComplete(res));
    yield put(BAG_PAGE_ACTIONS.setCartItemsUpdating({ isUpdating: true }));
    /* istanbul ignore else */
    if (callBack) {
      callBack();
    }
    yield put(
      BAG_PAGE_ACTIONS.getCartData({
        recalcRewards: true,
        isRecalculateTaxes: true,
        translation: true,
        excludeCartItems: false,
      })
    );
    yield delay(3000);
    yield put(BAG_PAGE_ACTIONS.setCartItemsUpdating({ isUpdating: false }));
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));
    yield put(setLoaderState(false));
  } catch (err) {
    yield put(setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' }));

    const errorMapping = yield select(BagPageSelectors.getErrorMapping);
    const errorMessage =
      // eslint-disable-next-line no-underscore-dangle
      (err && err.errorMessages && err.errorMessages._error) ||
      (errorMapping && errorMapping.DEFAULT) ||
      'ERROR';
    yield call(updateSagaErrorActions, updateActionType, errorMessage);
    yield setUpdateItemErrorMessages(payload, errorMessage);
    yield put(setLoaderState(false));
  }
}

export function* getProductSKUInfoSaga(payload) {
  // const res = yield call(getProductSkuInfoByUnbxd, payload);
  // yield put(updateCartItemComplete(res));

  const productId = payload.payload.productNum;
  const { itemBrand } = payload.payload;
  let unbxdkey;
  if (itemBrand === 'GYM') {
    unbxdkey = '4c26a092be20e0a237b91e51087453fa/dev1-gymboree-com800681562072113';
  } else {
    unbxdkey = 'd248ac8ed345ce5d29c9a6a3791db213/dev1-childrensplace-com800681565760135';
  }

  const relURI = `/${unbxdkey}/search?variants=true&variants.count=100&version=V2&rows=20&pagetype=boolean&q=${productId}&promotion=false&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant,%20low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price,long_product_title&uid=uid-1562746344280-64813`;

  try {
    const { baseURI, method } = endpoints.getProductSkuInfo;
    // need to do this call using abstractor
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        unbxd: true,
        q: payload.payload,
      },
      method
    );
    const product = res.body.response.products;
    const formattedInfo = parseProductFromAPI(
      product,
      product.uniqueId,
      false,
      getImgPath,
      false,
      false
    );
    yield put(getProductSKUInfoSuccess(formattedInfo));
  } catch (err) {
    logger.error(err);
  }
}

/**
 *
 * @method openPickupModalFromBag
 * @description this method handles opening of pickup modal on click of edit from bag for boss/bopis item
 * @export
 * @param {*} payload
 */
export function* openPickupModalFromBag(payload) {
  try {
    const state = yield select();
    const {
      payload: {
        colorProductId,
        orderInfo,
        openSkuSelectionForm,
        isBopisCtaEnabled,
        isBossCtaEnabled,
        isItemShipToHome,
        alwaysSearchForBOSS,
        openRestrictedModalForBopis,
        isPickUpWarningModal,
      },
    } = payload;
    let itemBrand;
    if (orderInfo) {
      ({ itemBrand } = orderInfo);
    }
    const productDetail = yield call(getProductInfoById, colorProductId, state, itemBrand);
    const { product } = productDetail;
    const currentProduct = product;
    const { generalProductId } = currentProduct;
    yield put(
      openPickupModalWithValues({
        generalProductId,
        colorProductId: generalProductId,
        isBopisCtaEnabled,
        isBossCtaEnabled,
        currentProduct,
        fromBagPage: true,
        openSkuSelectionForm,
        initialValues: { ...orderInfo },
        updateCartItemStore: true,
        isItemShipToHome,
        alwaysSearchForBOSS,
        openRestrictedModalForBopis,
        isPickUpWarningModal,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* CartPageSaga() {
  yield takeLatest(CARTPAGE_CONSTANTS.REMOVE_CART_ITEM, removeCartItem);
  yield takeLatest(CARTPAGE_CONSTANTS.UPDATE_CART_ITEM, updateCartItemSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.GET_PRODUCT_SKU_INFO, getProductSKUInfoSaga);
  yield takeLatest(CARTPAGE_CONSTANTS.CONFIRM_REMOVE_CART_ITEM, confirmRemoveItem);
  yield takeLatest(CARTPAGE_CONSTANTS.PICKUP_MODAL_OPEN_FROM_BAG, openPickupModalFromBag);
}

export default CartPageSaga;
