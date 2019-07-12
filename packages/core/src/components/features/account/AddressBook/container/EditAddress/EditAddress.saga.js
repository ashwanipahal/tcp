import { call, put, takeLatest } from 'redux-saga/effects';
import constants from './EditAddress.constants';
import { editAddressSuccess, editAddressFail } from './EditAddress.actions';
import fetchData from '../../../../../../service/API';
import endpoints from '../../../../../../service/endpoint';

export function* updateAddressPut({ payload }) {
  try {
    const { relURI, method } = endpoints.updateAddress;
    const baseURI = endpoints.updateAddress.baseURI || endpoints.global.baseURI;
    const payloadParam = {
      addressLine: [payload.address1, payload.address2, ''],
      attributes: [
        {
          key: 'addressField3',
          value: payload.zip,
        },
      ],
      addressType: 'ShippingAndBilling',
      city: payload.city,
      country: payload.country,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone1: payload.phoneNumber,
      phone1Publish: 'false',
      primary: payload.primary,
      state: payload.state,
      zipCode: payload.zip,
      xcont_addressField2: payload.isCommercialAddress ? '2' : '1',
      email1: payload.email,
      xcont_addressField3: payload.zip,
      fromPage: '',
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
      return yield put(editAddressSuccess());
    }
    return yield put(editAddressFail());
  } catch (err) {
    return yield put(editAddressFail(err));
  }
}

export function* EditAddressSaga() {
  yield takeLatest(constants.EDIT_USER_ADDRESS_REQ, updateAddressPut);
}

export default EditAddressSaga;
