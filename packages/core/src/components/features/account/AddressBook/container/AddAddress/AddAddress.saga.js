import { call, put, takeLatest } from 'redux-saga/effects';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';
import { addAddressSuccess, addAddressFail } from './AddAddress.actions';
import fetchData from '../../../../../../service/API';
import endpoints from '../../../../../../service/endpoint';

function* addAddressGet({ payload }) {
  const { baseURI, relURI, method } = endpoints.addAddress;
  const addressKey = Date.now().toString();
  const payloadParam = {
    contact: [
      {
        addressLine: [payload.address1 || '', payload.address2 || '', ''],
        attributes: [
          {
            key: 'addressField3',
            value: payload.zip || '',
          },
        ],
        addressType: 'ShippingAndBilling',
        city: payload.city,
        country: payload.country === 'United States' ? 'US' : 'CA',
        firstName: payload.FirstName,
        lastName: payload.LastName,
        nickName: addressKey,
        phone1: payload.phoneNumber || '',
        phone1Publish: 'false',
        primary: 'false', // as string
        state: payload.state,
        zipCode: payload.zip,
        xcont_addressField2: payload.isCommercialAddress ? '2' : '1',
        email1: '11OCTRAWAL@GMAIL.COM',
        xcont_addressField3: payload.zip,
        fromPage: payload.applyToOrder ? 'checkout' : '',
      },
    ],
  };
  const fullRelURI = `${relURI}`;
  const res = yield call(
    fetchData,
    baseURI,
    fullRelURI,
    {
      payload: payloadParam,
      langId: -1,
      catalogId: 10551,
      storeId: 10151,
    },
    method
  );
  if (res) {
    yield put(addAddressSuccess());
  } else {
    yield put(addAddressFail());
  }
}

function* AddAddressSaga() {
  yield takeLatest(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_REQ, addAddressGet);
}

export default AddAddressSaga;
