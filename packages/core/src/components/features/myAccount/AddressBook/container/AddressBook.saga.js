import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER_ADDRESSES } from '../AddressBook.contants';
import { setUserAddresses } from './AddressBook.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';

function* fetchUserAddresses(payload) {
  try {
    const { baseURI, relURI, method } = endpoints.getUserAddresses;
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        unbxd: true,
      },
      method
    );
    yield put(setUserAddresses(res.body.response));
  } catch (err) {
    console.log('Error in API');
    console.log(err);
  }
}

function* AddressBookSaga() {
  yield takeLatest(FETCH_USER_ADDRESSES, fetchUserAddresses);
}

export default AddressBookSaga;
