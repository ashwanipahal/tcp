import { call, takeLatest, put, select } from 'redux-saga/effects';
import ADDEDTOBAG_CONSTANTS from '../AddedToBag.constants';
import {
  addCartEcomItem,
  addCartBopisItem,
  addMultipleProductsInEcom,
} from '../../../../../services/abstractors/CnC/AddedToBag';
import {
  AddToCartError,
  AddToCartMultipleItemError,
  clearAddToCartMultipleItemErrorState,
  SetAddedToBagData,
  openAddedToBag,
  clearAddToBagErrorState,
  clearAddToPickupErrorState,
  AddToPickupError,
} from './AddedToBag.actions';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { removeItem } from '../../../../../services/abstractors/CnC';
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
    yield put(AddToCartError(errMsg, payload.skuInfo.unbxdProdId));
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
    yield put(clearAddToPickupErrorState());
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
      (err && err.errorMessages && err.errorMessages._error) ||
      (errorMapping && errorMapping.DEFAULT) ||
      'ERROR';
    yield put(AddToPickupError(errorMessage));
  }
}

export function* addMultipleItemToCartECOM({ payload: { productItemsInfo, callBack } }) {
  try {
    const paramsArray = productItemsInfo.map(product => {
      const { productId, skuId: catEntryId } = product.skuInfo;
      const { wishlistItemId, quantity } = product;
      const { storeId, langId, catalogId } = getAPIConfig();
      const apiConfigParams = {
        catalogId,
        storeId,
        langId,
      };
      return {
        ...apiConfigParams,
        orderId: '.',
        field2: '0',
        requesttype: 'ajax',
        catEntryId,
        quantity: quantity.toString(),
        'calculationUsage[]': '-7',
        externalId: wishlistItemId || '',
        productId,
      };
    });

    yield put(clearAddToCartMultipleItemErrorState());
    const res = yield call(addMultipleProductsInEcom, paramsArray);
    if (callBack) {
      callBack();
    }
    console.log(' API has no Error and all the products have been added to bag', res);

    // TODO - res and below code is for CnC team to be used for AddedToBag Modal
    // yield put(
    //   SetAddedToBagData({
    //     ...payload,
    //     ...res,
    //   })
    // );
    // if (!fromMoveToBag) {
    //   yield put(openAddedToBag());
    // }
    // yield put(BAG_PAGE_ACTIONS.getOrderDetails());
  } catch (errorObj) {
    const { error, errorProductId, atbSuccessProducts } = errorObj;
    if (atbSuccessProducts && atbSuccessProducts.length) {
      const removeProducts = atbSuccessProducts.map(product => product.orderItemId);
      yield call(removeItem, removeProducts);
    }
    const errMsg = error && error.errorResponse && error.errorResponse.errorMessage;
    yield put(AddToCartMultipleItemError({ errMsg, errorProductId }));
  }
}

export function* AddedToBagSaga() {
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM, addToCartEcom);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_TO_CART_BOPIS, addItemToCartBopis);
  yield takeLatest(ADDEDTOBAG_CONSTANTS.ADD_MULTIPLE_ITEMS_CART_ECOM, addMultipleItemToCartECOM);
}

export default AddedToBagSaga;
