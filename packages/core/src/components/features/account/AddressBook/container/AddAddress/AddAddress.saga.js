import { call, put, takeLatest } from 'redux-saga/effects';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';
import { addAddressSuccess, addAddressFail } from './AddAddress.actions';
import fetchData from '../../../../../../service/API';
import endpoints from '../../../../../../service/endpoint';

export function* addAddressGet({ payload }) {
  try {
    const { relURI, method } = endpoints.addAddress;
    const baseURI = endpoints.addAddress.baseURI || endpoints.global.baseURI;
    const addressKey = Date.now().toString();
    const payloadParam = {
      contact: [
        {
          addressLine: [payload.address1, payload.address2, ''],
          attributes: [
            {
              key: 'addressField3',
              value: payload.zip,
            },
          ],
          addressType: 'ShippingAndBilling',
          city: payload.city,
          country: payload.country === 'United States' ? 'US' : 'CA',
          firstName: payload.FirstName,
          lastName: payload.LastName,
          nickName: addressKey,
          phone1: payload.phoneNumber,
          phone1Publish: 'false',
          primary: payload.primary, // as string
          state: payload.state,
          zipCode: payload.zip,
          xcont_addressField2: payload.isCommercialAddress ? '2' : '1',
          email1: payload.email,
          xcont_addressField3: payload.zip,
          fromPage: '',
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
      return yield put(addAddressSuccess(res.body));
    }
    return yield put(addAddressFail(res.body));
  } catch (err) {
    let error = {};
    if (err instanceof Error) {
      error = err.response.body;
    }
    return yield put(addAddressFail(error));
  }
}

export function* AddAddressSaga() {
  yield takeLatest(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_REQ, addAddressGet);
}

export default AddAddressSaga;
