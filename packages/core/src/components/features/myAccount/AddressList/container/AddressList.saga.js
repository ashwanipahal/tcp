import { call, takeLatest, put } from 'redux-saga/effects';
import ADDRESS_LIST_CONSTANTS from '../AddressList.constants';
import fetchData from '../../../../../service/API';
import { setAddressList } from './AddressList.actions';
import endpoints from '../../../../../service/endpoint';

export function* getAddressList() {
  try {
    const { relURI, method } = endpoints.getAddressList;
    const baseURI = endpoints.getAddressList.baseURI || endpoints.global.baseURI;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    if (res.body.contact) {
      yield put(setAddressList(res.body.contact));
    }
    yield null;
  } catch (err) {
    yield null;
  }
}

export function* AddressListSaga() {
  yield takeLatest(ADDRESS_LIST_CONSTANTS.GET_ADDRESS_LIST, getAddressList);
}

export default AddressListSaga;
