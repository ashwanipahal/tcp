import { call, put, takeLatest } from 'redux-saga/effects';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';
import { addAddressReq, addAddressSuccess, addAddressFail } from './AddAddress.actions';
import fetchData from '../../../../../../service/API';
import endpoints from '../../../../../../service/endpoint';

function* addAddressGet({payload}) {
  try {
    const { baseURI, relURI, method } = endpoints.addAddress;

    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      { payload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    if (res) {
      yield put(addAddressSuccess());
    }
  } catch (err) {
    yield put(addAddressFail(err));
  }
}

function* AddAddressSaga() {
  yield takeLatest(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_REQ, addAddressGet);
}

export default AddAddressSaga;
