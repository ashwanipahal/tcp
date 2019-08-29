/* eslint-disable no-param-reassign */
/* eslint-disable extra-rules/no-commented-out-code */
import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import {
  getOrderDetailsData,
  getCartData,
  getUnqualifiedItems,
  removeItem,
  getProductInfoForTranslationData,
} from '../../../../../services/abstractors/CnC';
// import endpoints from '../../../../../service/endpoint';
// import fetchData from '../../../../../service/API';

import BAG_PAGE_ACTIONS from './BagPage.actions';
import { checkoutSetCartData } from '../../Checkout/container/Checkout.action';
import BAG_SELECTORS from './BagPage.selectors';
import { getModuleX } from '../../../../../services/abstractors/common/moduleX';
import { routerPush } from '../../../../../utils';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import { setCheckoutModalMountedState } from '../../../account/LoginPage/container/LoginPage.actions';

export const filterProductsBrand = (arr, searchedValue) => {
  const obj = [];
  const filterArray = arr.filter(value => {
    return value.productInfo.itemBrand === searchedValue;
  });
  filterArray.forEach(item => {
    obj.push(item.productInfo.productPartNumber);
  });
  return obj;
};

const getProductsTypes = orderItems => {
  let tcpProducts = [];
  let gymProducts = [];
  if (orderItems) {
    tcpProducts = filterProductsBrand(orderItems, 'TCP');
    gymProducts = filterProductsBrand(orderItems, 'GYM');
  }
  return {
    tcpProducts,
    gymProducts,
  };
};

export function* getTranslatedProductInfo(cartInfo) {
  const productypes = getProductsTypes(cartInfo.orderDetails.orderItems);
  const gymProdpartNumberList = productypes.gymProducts;
  const tcpProdpartNumberList = productypes.tcpProducts;
  let tcpProductsResults;
  let gymProductsResults;
  if(tcpProdpartNumberList.length) {
    tcpProductsResults = yield call(getProductInfoForTranslationData,tcpProdpartNumberList.join());
  }

  if(gymProdpartNumberList.length) {
    gymProductsResults = yield call(getProductInfoForTranslationData,gymProdpartNumberList.join());
  }
  gymProductsResults = (gymProductsResults && gymProductsResults.body.response.products) || []
  tcpProductsResults = (tcpProductsResults && tcpProductsResults.body.response.products) || []

  return [...gymProductsResults,...tcpProductsResults];

  // const relURI = `/sites/childrensplace-com702771523455856/products?id=${partNumberList}&fields=alt_img,style_partno,giftcard,TCPProductIndUSStore,TCPWebOnlyFlagUSStore,TCPWebOnlyFlagCanadaStore,TCPFitMessageUSSstore,TCPFit,product_name,TCPColor,top_rated,imagename,productid,uniqueId,favoritedcount,TCPBazaarVoiceReviewCount,categoryPath3_catMap,categoryPath2_catMap,product_short_description,style_long_description,min_list_price,min_offer_price,TCPBazaarVoiceRating,product_long_description,seo_token,variantCount,prodpartno,variants,v_tcpfit,v_qty,v_tcpsize,style_name,v_item_catentry_id,v_listprice,v_offerprice,v_qty,variantId,auxdescription,list_of_attributes,additional_styles,TCPLoyaltyPromotionTextUSStore,TCPLoyaltyPLCCPromotionTextUSStore,v_variant, low_offer_price, high_offer_price, low_list_price, high_list_price&uid=uid-1566211834006-42481`;

  // try {
  //   const { baseURI, method } = endpoints.getProductInfoForTranslationByPartNumber;
  //   // need to do this call using abstractor
  //   return yield call(
  //     fetchData,
  //     baseURI,
  //     relURI,
  //     {
  //       unbxd: true,
  //       q: '2084642_757',
  //     },
  //     method
  //   );
  // } catch (err) {
  //   console.log(err);
  //   return err;
  // }
}

function createMatchObject(res, translatedProductInfo) {
  res.orderDetails.orderItems.forEach(orderItem => {
    translatedProductInfo.body.response.products.forEach(item => {
      if (orderItem.productInfo.productPartNumber === item.prodpartno) {
        orderItem.productInfo.name = item.product_name;
        orderItem.productInfo.color.name = item.TCPColor;
      }
    });
  });
}

export function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);
    // yield getFinalTranslatedOrderDetails( res.orderDetails.orderItems ,getTranslatedProductInfo.body.response.products);

    createMatchObject(res, translatedProductInfo);
    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

// const getFinalTranslatedOrderDetails = (orderItems, translatedProducts) => {
//   console.log("getFinalTranslatedOrderDetails", translatedProducts);
//   orderItems.forEach((orderItem) => {
//     console.log("orderItem", orderItem);
//   })
//   return null;
// }

export function* getCartDataSaga(payload) {
  try {
    const {
      payload: { isRecalculateTaxes, isCheckoutFlow, isCartNotRequired, updateSmsInfo } = {},
    } = payload;
    const isCartPage = true;
    // const recalcOrderPointsInterval = 3000; // TODO change it to coming from AB test
    const recalcOrderPoints = false; // TODO getOrderPointsRecalcFlag(recalcRewards, recalcOrderPointsInterval);
    const isRadialInvEnabled = true; // TODO to get current country
    const isCanada = false; // TODO to get current country
    const res = yield call(getCartData, {
      calcsEnabled: isCartPage || isRecalculateTaxes,
      excludeCartItems: false,
      recalcRewards: recalcOrderPoints,
      isCanada,
      isRadialInvEnabled,
    });
    const translatedProductInfo = yield call(getTranslatedProductInfo, res);
    // yield getFinalTranslatedOrderDetails( res.orderDetails.orderItems ,getTranslatedProductInfo.body.response.products);

    createMatchObject(res, translatedProductInfo);

    yield put(BAG_PAGE_ACTIONS.getOrderDetailsComplete(res.orderDetails));
    if (isCheckoutFlow) {
      yield put(checkoutSetCartData({ res, isCartNotRequired, updateSmsInfo }));
    }
    yield put(BAG_PAGE_ACTIONS.setCouponsData(res.coupons));
  } catch (err) {
    yield put(BAG_PAGE_ACTIONS.setBagPageError(err));
  }
}

export function* fetchModuleX({ payload = [] }) {
  try {
    let result = yield all(payload.map(uuid => call(getModuleX, uuid)));
    result = result.map((val, index) => ({ ...val, name: payload[index] }));
    yield put(BAG_PAGE_ACTIONS.setModuleX(result));
  } catch (err) {
    yield null;
  }
}

export function* checkoutCart(recalc) {
  const isLoggedIn = yield select(getUserLoggedInState);
  if (!isLoggedIn) {
    return yield put(setCheckoutModalMountedState({ state: true }));
  }
  return yield call(routerPush, '/checkout', '/checkout', { recalc });
}

function* confirmStartCheckout() {
  // this.store.dispatch(setVenmoData({ error: null })); // Clear Venmo error message
  // if (cartStoreView.getIsEditingSomeItem(state)) {
  //   // editing an item, display warning modal
  //   confirmationsResult = confirmationsResult.then(() =>
  //     generalOperator.openConfirmationModal(CONFIRM_MODAL_IDS.EDITING, null, null)
  //   );
  // }

  const [OOSCount, unavailableCount] = yield all(
    [BAG_SELECTORS.getOOSCount, BAG_SELECTORS.getUnavailableCount].map(val => select(val))
  );
  if (OOSCount > 0 || unavailableCount > 0) {
    yield put(BAG_PAGE_ACTIONS.openCheckoutConfirmationModal());
    return yield true;
  }
  return false;
}

export function* startCartCheckout() {
  // this.store.dispatch(setVenmoPaymentInProgress(false));
  let res = yield call(getUnqualifiedItems);
  res = res || [];
  yield all(
    res.map(({ orderItemId, isOOS }) =>
      isOOS
        ? put(BAG_PAGE_ACTIONS.setItemOOS(orderItemId))
        : put(BAG_PAGE_ACTIONS.setItemUnavailable(orderItemId))
    )
  );
  const oOSModalOpen = yield call(confirmStartCheckout);
  if (!oOSModalOpen) {
    yield call(checkoutCart);
  }
}

export function* removeUnqualifiedItemsAndCheckout() {
  const unqualifiedItemsIds = yield select(BAG_SELECTORS.getUnqualifiedItemsIds);
  if (unqualifiedItemsIds && unqualifiedItemsIds.size > 0) {
    yield call(removeItem, unqualifiedItemsIds);
    yield call(getCartDataSaga);
  }
  yield call(checkoutCart, true);
}

export function* BagPageSaga() {
  yield takeLatest(BAGPAGE_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.GET_CART_DATA, getCartDataSaga);
  yield takeLatest(BAGPAGE_CONSTANTS.FETCH_MODULEX_CONTENT, fetchModuleX);
  yield takeLatest(BAGPAGE_CONSTANTS.START_BAG_CHECKOUT, startCartCheckout);
  yield takeLatest(
    BAGPAGE_CONSTANTS.REMOVE_UNQUALIFIED_AND_CHECKOUT,
    removeUnqualifiedItemsAndCheckout
  );
}

export default BagPageSaga;
