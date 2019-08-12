import { call, put, takeLatest } from 'redux-saga/effects';
import countrySelectorAbstractor from '@tcp/core/src/services/abstractors/common/countrySelector';

import COUNTRY_SELECTOR_CONSTANTS from './CountrySelector.constants';
import { getCountryListData, submitCountrySelection } from './CountrySelector.actions';

export function* fetchountryListData() {
  const res = yield call(countrySelectorAbstractor.getData);
  const countryList = res && res.data;
  yield put(getCountryListData(countryList));
}

export function* submitCountrySelectionData() {
  const res = yield call(countrySelectorAbstractor.submitData);
  const body = res && res.body;
  const data = {
    flagName: body.flagName,
    iShipCookie: body.shippingCookie,
  };
  console.log(res);

  yield put(submitCountrySelection(data));
}

function* CountrySelectorSaga() {
  yield takeLatest(COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_GET_DATA, fetchountryListData);
  yield takeLatest(
    COUNTRY_SELECTOR_CONSTANTS.COUNTRY_SELECTOR_SUBMIT_DATA,
    submitCountrySelectionData
  );
}

export default CountrySelectorSaga;
