import { call, takeLatest } from 'redux-saga/effects';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';

function* deleteAddress({ payload }) {
  try {
    const { relURI, method } = endpoints.deleteAddress;
    const baseURI = endpoints.deleteAddress.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        nickName: payload.nickName,
      },
      method
    );
    if (res.body) {
      // yield put(setAddressList(res.body.contact || []));
    }
    yield null;
  } catch (err) {
    yield null;
  }
}

export function* AccountModalSaga() {
  yield takeLatest(ACCOUNT_MODAL_CONSTANTS.DELETE_ADDRESS, deleteAddress);
}

export default AccountModalSaga;
