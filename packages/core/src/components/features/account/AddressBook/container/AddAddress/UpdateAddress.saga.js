import { call, put, takeLatest } from 'redux-saga/effects';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';
import { addAddressSuccess, addAddressFail } from './AddAddress.actions';
import fetchData from '../../../../../../service/API';
import endpoints from '../../../../../../service/endpoint';

export function* updateAddressPut({ payload }) {
  try {
    const { baseURI, relURI, method } = endpoints.updateAddress;
    const payloadParam = {
      addressLine: [payload.addressLine1 || '', payload.addressLine2 || '', ''],
      attributes: [
        {
          key: 'addressField3',
          value: payload.zip || '',
        },
      ],
      addressType: 'ShippingAndBilling',
      city: payload.city,
      country: payload.country === 'United States' ? 'US' : 'CA',
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone1: payload.phoneNumber || '',
      phone1Publish: 'false',
      primary: 'false', // as string
      state: payload.state,
      zipCode: payload.zip,
      xcont_addressField2: payload.isCommercialAddress ? '2' : '1',
      email1: payload.email,
      xcont_addressField3: payload.zip,
      fromPage: payload.applyToOrder ? 'checkout' : '',
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
        nickName: payload.nickName,
      },
      method
    );
    if (res) {
      return yield put(addAddressSuccess());
    }
    return yield put(addAddressFail());
  } catch (err) {
    return yield put(addAddressFail(err));
  }
}

export function* UpdateAddressSaga() {
  yield takeLatest(ADD_ADDRESS_CONSTANTS.UPDATE_USER_ADDRESS_REQ, updateAddressPut);
}

export default UpdateAddressSaga;
