import { call, takeLatest, put } from 'redux-saga/effects';
import PAYMENT_CONSTANTS from '../Payment.constants';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';
import { getCardList, setDefaultPaymentSuccess, setDefaultPaymentError } from './Payment.actions';
import { clearGetAddressListTTl } from '../../AddressBook/container/AddressBook.actions';

function getModifiedPayload({ payload }) {
  return {
    action: 'U',
    isDefault: 'true',
    addressId: payload.addressId || '',
    creditCardId: payload.creditCardId,
    billing_firstName: payload.addressDetails.firstName,
    billing_lastName: payload.addressDetails.lastName,
    billing_phone1: payload.addressDetails.phone1 || '',
    billing_address1: payload.addressDetails.addressLine1,
    billing_address2: payload.addressDetails.addressLine2,
    billing_city: payload.addressDetails.city,
    billing_state: payload.addressDetails.state,
    billing_addressField3: payload.addressDetails.zipCode,
    billing_zipCode: payload.addressDetails.zipCode,
    billing_country: payload.addressDetails.country,
    billing_nickName: `Billing_10151_${new Date().getTime().toString()}`,
    pay_account: payload.accountNo,
    pay_expire_month: (payload.expMonth || '').toString(), // on PLCC it's null
    payMethodId: PAYMENT_CONSTANTS.CREDIT_CARDS_PAYMETHODID[payload.ccBrand.toUpperCase()],
    pay_expire_year: (payload.expYear || '').toString(), // on PLCC it's null
    redirecturl: 'AjaxLogonForm',
    viewTaskName: 'RedirectView',
  };
}

export function* setDefaultPayment({ payload }) {
  try {
    const { relURI, method } = endpoints.setDefaultPayment;
    const baseURI = endpoints.setDefaultPayment.baseURI || endpoints.global.baseURI;
    const modifiedPayload = getModifiedPayload({ payload });
    const res = yield call(
      fetchData,
      baseURI,
      relURI,
      {
        payload: modifiedPayload,
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
        isRest: true,
      },
      method
    );
    if (res.body) {
      yield put(getCardList({ ignoreCache: true }));
      yield put(clearGetAddressListTTl());
      yield put(setDefaultPaymentSuccess());
    } else yield put(setDefaultPaymentError());
  } catch (err) {
    yield put(setDefaultPaymentError(err));
  }
}

export function* DefaultPaymentSaga() {
  yield takeLatest(PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT, setDefaultPayment);
}

export default DefaultPaymentSaga;
