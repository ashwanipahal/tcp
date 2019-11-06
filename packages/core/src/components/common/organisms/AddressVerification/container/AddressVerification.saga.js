import { call, put, takeLatest } from 'redux-saga/effects';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';
import { verifyAddressSuccess, verifyAddressError } from './AddressVerification.actions';
import { verifyAddressData } from '../../../../../services/abstractors/account';
import {setLoadingState} from '../../AddEditAddress/container/AddEditAddress.actions'

export function* verifyAddress({ payload }) {
  try {
    const { suggestedAddress, resultType } = yield call(verifyAddressData, payload);
    yield put(setLoadingState({ isLoading: true }));
    yield put(verifyAddressSuccess({ suggestedAddress, resultType }));
    yield put(setLoadingState({ isLoading: false }));
  } catch (err) {
    yield put(verifyAddressError({ resultType: 'ERROR' }));
    yield put(setLoadingState({ isLoading: false }));
  }
}

export function* verifyAddressSaga() {
  yield takeLatest(ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS, verifyAddress);
}

export default verifyAddressSaga;
