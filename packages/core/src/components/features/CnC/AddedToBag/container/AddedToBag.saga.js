/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable no-unused-vars */

import { call, takeLatest, put } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../utils/cache.util';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import fetchData from '../../../../../service/API';
import { getOrderDetailsData } from '../../../../../services/abstractors/CnC/CartItemTile';
import {
  AddToCartError,
  SetAddedToBagData,
  openAddedToBag,
  getOrderDetailsComplete,
} from './AddedToBag.actions';
import endpoints from '../../../../../service/endpoint';

export function* addToCartEcom({ payload }) {
  try {
    const sku = payload.skuInfo.skuId;
    const qty = payload.quantity;
    const { wishlistItemId } = payload;

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
        externalId: wishlistItemId || '',
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
          ...payload,
          orderId: res.body.orderId && res.body.orderId[0],
          orderItemId: res.body.orderItemId && res.body.orderItemId[0],
        })
      );
      yield put(openAddedToBag());
    } else {
      yield put(AddToCartError(res.error));
    }
  } catch (err) {
    yield put(AddToCartError(err));
  }
}

function* getOrderDetailSaga() {
  try {
    const res = yield call(getOrderDetailsData);
    yield put(getOrderDetailsComplete(res));
  } catch (err) {
    console.log(err);
  }
}

export function* AddedToBagSaga() {
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.GET_ORDER_DETAILS, getOrderDetailSaga);
}

export default AddedToBagSaga;
