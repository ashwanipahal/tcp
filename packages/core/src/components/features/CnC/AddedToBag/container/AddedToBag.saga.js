/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable no-unused-vars */

import { call, takeLatest, put } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../utils/cache.util';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import fetchData from '../../../../../service/API';
import {
  AddToCartError,
  SetAddedToBagData,
  openAddedToBag,
  getOrderDetailsComplete,
} from './AddedToBag.actions';
import { getOrderDetailsData } from '../../../../../services/abstractors/CnC/CartItemTile';
import endpoints from '../../../../../service/endpoint';

export function* addToCartEcom({ payload: { sku, qty, wishlistId, cartItemInfo } }) {
  try {
    const params = {
      payload: {
        storeId: 10151,
        catalogId: 10551,
        langId: '-1',
        orderId: '.',
        field2: '0',
        requesttype: 'ajax',
        catEntryId: sku,
        quantity: qty.toString(),
        'calculationUsage[]': '-7',
      },
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const { relURI, method } = endpoints.addProductToCart;
    const baseURI = endpoints.addProductToCart.baseURI || endpoints.global.baseURI;
    const res = yield call(fetchData, baseURI, relURI, params, method);
    if (res.body) {
      yield put(
        SetAddedToBagData({
          ...cartItemInfo,
          orderId: res.body.orderId && res.body.orderId[0],
          orderItemId: res.body.orderItemId && res.body.orderItemId[0],
        })
      );
      yield put(openAddedToBag());
      // return yield put(setCardList(res.body.creditCardListJson || []));
    } else {
      return yield put(AddToCartError(res.error));
    }
  } catch (err) {
    // yield put(SetAddedToBagData({
    //   ...cartItemInfo,
    // }));
    // yield put(openAddedToBag());
    return yield put(AddToCartError(err));
  }
}

// addItemToCart(sku, quantity, wishlistId) {
//   let payload = {
//     header: {
//     },
//     body: {
//       // comment:62132,
//       'calculationUsage[]': '-7',
//       storeId: this.apiHelper._configOptions.storeId,
//       catalogId: this.apiHelper._configOptions.catalogId,
//       langId: this.apiHelper._configOptions.langId,
//       orderId: '.',
//       field2: '0',
//       requesttype: 'ajax',
//       catEntryId: sku,
//       quantity: quantity.toString(),
//       externalId: wishlistId
//     },
//     webService: endpoints.addProductToCart
//   };

//   return this.apiHelper.webServiceCall(payload).then((res) => {
//     if (this.apiHelper.responseContainsErrors(res)) {
//       throw new ServiceResponseError(res);
//     }
//     return {
//       orderId: res.body.orderId && res.body.orderId[0],
//       orderItemId: res.body.orderItemId && res.body.orderItemId[0]
//     };
//   }).catch((err) => {
//     throw this.apiHelper.getFormattedError(err);
//   });
// }

function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    yield put(getOrderDetailsComplete(res));
  } catch (err) {
    console.log(err);
  }
}

export function* AddedToBagSaga() {
  // const cachedCardList = validateReduxCache(getCardList);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
}

export default AddedToBagSaga;
