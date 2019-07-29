import { call, takeLatest, put } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../utils/cache.util';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import fetchData from '../../../../../service/API';
import { AddToCartError, SetAddedToBagData, openAddedToBag } from './AddedToBag.actions';
import { getOrderDetails } from '../../Cart/containers/Cart.actions';
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
    if (res.body && !res.body.error && !res.body.errors) {
      yield put(
        SetAddedToBagData({
          ...payload,
          orderId: res.body.orderId && res.body.orderId[0],
          orderItemId: res.body.orderItemId && res.body.orderItemId[0],
        })
      );
      yield put(openAddedToBag());
      yield put(getOrderDetails());
    } else {
      yield put(AddToCartError(res.error || res.body.error));
    }
  } catch (err) {
    yield put(AddToCartError(err));
  }
}

export function* addItemToCartBopis({ payload }) {
  try {
    const {
      storeLocId,
      isBoss,
      quantity,
      skuInfo: { skuId, variantId, variantNo },
    } = payload;
    const PICKUP_TYPE = {
      boss: 'boss',
      bopis: 'bopis',
    };
    const params = {
      payload: {
        storeLocId: storeLocId.toString(),
        quantity: quantity.toString(),
        catEntryId: skuId,
        isRest: 'false',
        pickupType: isBoss ? PICKUP_TYPE.boss : PICKUP_TYPE.bopis,
        variantNo,
        itemPartNumber: variantId,
      },
      langId: -1,
      storeId: 10151,
      catalogId: 10551,
    };
    const { relURI, method } = endpoints.addOrderBopisItem;
    const baseURI = endpoints.addOrderBopisItem.baseURI || endpoints.global.baseURI;
    const res = yield call(fetchData, baseURI, relURI, params, method);
    if (res.body && !res.body.error && !res.body.errors) {
      yield put(
        SetAddedToBagData({
          ...payload,
          orderItemId: res.body.orderItemId && res.body.orderItemId[0],
        })
      );
      yield put(openAddedToBag());
    } else {
      yield put(AddToCartError(res.error || res.body.error));
    }
  } catch (err) {
    yield put(AddToCartError(err));
  }
}

export function* AddedToBagSaga() {
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS, addItemToCartBopis);
}

export default AddedToBagSaga;
