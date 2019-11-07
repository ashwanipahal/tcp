import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/web/src/components/features/content/Loader/container/Loader.actions';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';
import { verifyAddressSuccess, verifyAddressError } from './AddressVerification.actions';
import { verifyAddressData } from '../../../../../services/abstractors/account';

export function* verifyAddress({ payload }) {
  yield put(setLoaderState(true));
  try {
    const { suggestedAddress, resultType } = yield call(verifyAddressData, payload);
    yield put(setLoaderState(false));
    yield put(verifyAddressSuccess({ suggestedAddress, resultType }));
  } catch (err) {
    yield put(setLoaderState(false));
    yield put(verifyAddressError({ resultType: 'ERROR' }));
  }
}

export function* verifyAddressSaga() {
  yield takeLatest(ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS, verifyAddress);
}

export default verifyAddressSaga;
