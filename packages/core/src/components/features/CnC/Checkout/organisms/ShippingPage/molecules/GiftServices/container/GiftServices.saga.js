// @flow
import type { Saga } from 'redux-saga';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import GIFT_SERVICES_CONSTANTS from '../GiftServices.constants';
import { addGiftServicesFailure } from './GiftServices.actions';
import {
  addGiftWrappingOption,
  removeGiftWrappingOption,
} from '../../../../../../../../../services/abstractors/CnC/Checkout';
import { getFormGiftMsg, getFormCatEntryId, getCartOrderId } from './GiftServices.selector';

export function* addGiftServices() {
  try {
    const giftMsg = yield select(getFormGiftMsg);
    const catEntryId = yield select(getFormCatEntryId);
    const orderIdNum = yield select(getCartOrderId);
    const orderId = orderIdNum.toString();
    const quantity = 1;
    yield call(addGiftWrappingOption, { giftMsg, orderId, catEntryId, quantity });
  } catch (err) {
    yield put(addGiftServicesFailure(err.message));
  }
}
export function* removeGiftServices() {
  try {
    const GiftMsg = '';
    const catEntryId = '';
    const orderId = '';
    const quantity = '';

    yield call(removeGiftWrappingOption, { GiftMsg, orderId, catEntryId, quantity });
  } catch (err) {
    yield put(addGiftServicesFailure(err.message));
  }
}
export function* AddGiftServicesSaga(): Saga<void> {
  yield takeLatest(GIFT_SERVICES_CONSTANTS.ADD_GIFT_SERVICES_REQUEST, addGiftServices);
}

export default AddGiftServicesSaga;
