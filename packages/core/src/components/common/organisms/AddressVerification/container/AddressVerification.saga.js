import { call, put, takeLatest } from 'redux-saga/effects';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';
import { verifyAddressSuccess, verifyAddressError } from './AddressVerification.actions';
import { verifyAddressData } from '../../../../../services/abstractors/account';

export function* verifyAddress({ payload }) {
  try {
    const { suggestedAddress, resultType } = yield call(verifyAddressData, payload);
    yield put(verifyAddressSuccess({ suggestedAddress, resultType }));
  } catch (err) {
    yield put(verifyAddressError({ resultType: 'ERROR' }));
  }
}

export function* verifyAddressSaga() {
  yield takeLatest(ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS, verifyAddress);
}

export default verifyAddressSaga;
