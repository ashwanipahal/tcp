import { call, put, takeLatest, select } from 'redux-saga/effects';
import constants from './AddEditCreditCard.constants';
import { addCreditCardSuccess, addCreditCardError } from './AddEditCreditCard.actions';
import { addCreditCard, updateCreditCard } from '../../../../../services/abstractors/account';
import { getCreditDebitCards } from '../../Payment/container/Payment.selectors';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';
import {
  clearGetAddressListTTL,
  getAddressList,
} from '../../AddressBook/container/AddressBook.actions';
import { clearCardListTTL } from '../../Payment/container/Payment.actions';

export function* addCreditCardSaga({ payload }) {
  try {
    const { address, cardType, onFileAddressKey, isDefault, ...otherPayloadProps } = payload;
    const ccBook = yield select(getCreditDebitCards);
    const addressList = yield select(getAddressListState);

    const isEmptyAccount = !ccBook || ccBook.size === 0;
    let addressEntry;

    if (onFileAddressKey) {
      addressEntry = addressList.find(add => add.addressId === onFileAddressKey);
    } else {
      addressEntry = Object.assign({}, address, {
        phoneNumber: yield select(state => state.LoginPageReducer.loginInfo.phone1),
      });
    }

    if (!addressEntry.addressLine1 && addressEntry.addressLine) {
      const { addressLine } = addressEntry;
      [addressEntry.addressLine1, addressEntry.addressLine2] = addressLine;
    }

    const paymentInfo = {
      ...otherPayloadProps,
      ...addressEntry,
      isDefault: isDefault || isEmptyAccount,
      addressId: addressEntry ? addressEntry.addressId : null,
      cardType,
      saveToAccount: true,
    };
    const response = yield call(addCreditCard, paymentInfo);
    yield put(clearGetAddressListTTL());
    yield put(clearCardListTTL());
    yield put(getAddressList());
    return yield put(addCreditCardSuccess({ response }));
  } catch (err) {
    return yield put(
      addCreditCardError({
        errorMessage: err.message,
      })
    );
  }
}

export function* updateCreditCardSaga({ payload }) {
  try {
    const { address, cardType, onFileAddressKey, ...otherPayloadProps } = payload;
    const addressList = yield select(getAddressListState);

    let addressEntry;

    if (onFileAddressKey) {
      addressEntry = addressList.find(add => add.addressId === onFileAddressKey);
    } else {
      addressEntry = Object.assign({}, address, {
        phoneNumber: yield select(state => state.LoginPageReducer.loginInfo.phone1),
      });
    }

    if (!addressEntry.addressLine1 && addressEntry.addressLine) {
      const { addressLine } = addressEntry;
      [addressEntry.addressLine1, addressEntry.addressLine2] = addressLine;
    }

    const paymentInfo = {
      ...otherPayloadProps,
      ...addressEntry,
      addressId: addressEntry ? addressEntry.addressId : null,
      cardType,
    };
    const response = yield call(updateCreditCard, paymentInfo);
    yield put(clearGetAddressListTTL());
    yield put(clearCardListTTL());
    yield put(getAddressList());
    return yield put(addCreditCardSuccess({ response }));
  } catch (err) {
    return yield put(
      addCreditCardError({
        errorMessage: err.message,
      })
    );
  }
}

export function* AddEditCreditCardSaga() {
  yield takeLatest(constants.ADD_CREDIT_CARD, addCreditCardSaga);
  yield takeLatest(constants.EDIT_CREDIT_CARD, updateCreditCardSaga);
}
export default AddEditCreditCardSaga;
