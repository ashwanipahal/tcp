import { call, put, takeLatest } from 'redux-saga/effects';
import constants from '../MailingAddress.constants';
import { addMailingAddressSuccess, addMailingAddressFail } from './MailingAddress.actions';
import {
  setAddressBookNotification,
  clearGetAddressListTTL,
} from '../../../../AddressBook/container/AddressBook.actions';
import { getUserInfo } from '../../../../User/container/User.actions';
import { updateProfileSuccess } from '../../../container/MyProfile.actions';

import { updateAddress } from '../../../../../../../services/abstractors/account';

export function* updateMailingAddressPut({ payload }) {
  try {
    const res = yield call(updateAddress, payload);
    if (res) {
      yield put(
        setAddressBookNotification({
          status: 'success',
        })
      );
      yield put(clearGetAddressListTTL());
      yield put(getUserInfo());
      yield put(updateProfileSuccess('successMessage'));
      return yield put(addMailingAddressSuccess(res.body));
    }
    return yield put(addMailingAddressFail(res.body));
  } catch (err) {
    let error = {};
    if (err instanceof Error) {
      error = err.response.body;
    }
    return yield put(addMailingAddressFail(error));
  }
}

export default function* MailingAddressSaga() {
  yield takeLatest(constants.ADD_MAILING_ADDRESS, updateMailingAddressPut);
}
