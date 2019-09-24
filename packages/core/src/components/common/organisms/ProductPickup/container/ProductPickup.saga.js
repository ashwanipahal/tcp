import { call, put, takeLatest } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import PRODUCT_PICKUP_ACTIONS_CONSTANTS from '../ProductPickup.constants';
import { setBopisInventoryDetailsAction } from './ProductPickup.actions';
import getBopisInventoryDetails from '../../../../../services/abstractors/common/bopisInventory/bopisInventory';

export function* getBopisInventory({ payload }) {
  yield put(setBopisInventoryDetailsAction({}));
  try {
    const { itemInfo } = payload;
    const inventoryResponse = yield call(getBopisInventoryDetails, itemInfo);
    yield put(setBopisInventoryDetailsAction({ inventoryResponse }));
  } catch (err) {
    logger.error(err);
  }
}

function* ProductPickupStoreSaga() {
  yield takeLatest(PRODUCT_PICKUP_ACTIONS_CONSTANTS.GET_BOPIS_INVENTORY, getBopisInventory);
}

export default ProductPickupStoreSaga;
