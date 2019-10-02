import { call, takeLatest, put, select } from 'redux-saga/effects';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import {
  addCartEcomItem,
  addCartBopisItem,
} from '../../../../../services/abstractors/CnC/AddedToBag';
import {
  AddToCartError,
  SetAddedToBagData,
  openAddedToBag,
  clearAddToBagErrorState,
} from './AddedToBag.actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import BagPageSelectors from '../../BagPage/container/BagPage.selectors';
import { getAPIConfig } from '../../../../../utils';

export function* addToCartEcom({ payload }) {
  try {
    const sku = payload.skuInfo.skuId;
    const qty = payload.quantity;
    const { wishlistItemId } = payload;
    const { storeId, langId, catalogId } = getAPIConfig();
    const apiConfigParams = {
      catalogId,
      storeId,
      langId,
    };

    const { callBack, fromMoveToBag } = payload;

    const params = {
      ...apiConfigParams,
      orderId: '.',
      field2: '0',
      requesttype: 'ajax',
      catEntryId: sku,
      quantity: qty.toString(),
      'calculationUsage[]': '-7',
      externalId: wishlistItemId || '',
    };
    yield put(clearAddToBagErrorState());
    const res = yield call(addCartEcomItem, params);
    yield put(
      SetAddedToBagData({
        ...payload,
        ...res,
      })
    );
    if (callBack) {
      callBack();
    }
    if (!fromMoveToBag) {
      yield put(openAddedToBag());
    }

    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    const errMsg = err && err.errorResponse && err.errorResponse.errorMessage;
    yield put(AddToCartError(errMsg));
  }
}

export function* addItemToCartBopis({ payload }) {
  try {
    const {
      productInfo,
      productInfo: {
        storeLocId,
        isBoss,
        quantity,
        skuInfo: { skuId, variantId, variantNo },
      },
      callback,
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
    yield put(clearAddToBagErrorState());
    const errorMapping = yield select(BagPageSelectors.getErrorMapping);
    const res = yield call(addCartBopisItem, params, errorMapping);
    if (callback) {
      callback();
    }
    yield put(
      SetAddedToBagData({
        ...productInfo,
        ...res,
      })
    );
    yield put(openAddedToBag());
    yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (err) {
    const errorMapping = yield select(BagPageSelectors.getErrorMapping);
    const errorMessage =
      // eslint-disable-next-line no-underscore-dangle
      (err && err.errorMessages && err.errorMessages._error) || errorMapping.DEFAULT;
    yield put(AddToCartError(errorMessage));
  }
}

export function* AddedToBagSaga() {
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS, addItemToCartBopis);
}

export default AddedToBagSaga;
