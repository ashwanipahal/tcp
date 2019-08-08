import { call, takeLatest, put } from 'redux-saga/effects';
// import { validateReduxCache } from '../../../../../utils/cache.util';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import {
  addCartEcomItem,
  addCartBopisItem,
} from '../../../../../services/abstractors/CnC/AddedToBag';
import { AddToCartError, SetAddedToBagData, openAddedToBag } from './AddedToBag.actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

export function* addToCartEcom({ payload }) {
  try {
    const sku = payload.skuInfo.skuId;
    const qty = payload.quantity;
    const { wishlistItemId } = payload;
    const params = {
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
    };
    const res = yield call(addCartEcomItem, params);
    yield put(
      SetAddedToBagData({
        ...payload,
        ...res,
      })
    );
    yield put(openAddedToBag());
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
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
      storeLocId: storeLocId.toString(),
      quantity: quantity.toString(),
      catEntryId: skuId,
      isRest: 'false',
      pickupType: isBoss ? PICKUP_TYPE.boss : PICKUP_TYPE.bopis,
      variantNo,
      itemPartNumber: variantId,
    };
    const res = yield call(addCartBopisItem, params);
    yield put(
      SetAddedToBagData({
        ...payload,
        ...res,
      })
    );
    yield put(openAddedToBag());
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    yield put(AddToCartError(err));
  }
}

export function* AddedToBagSaga() {
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS, addItemToCartBopis);
}

export default AddedToBagSaga;
