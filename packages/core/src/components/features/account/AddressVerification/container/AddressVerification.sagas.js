import { call, put, takeLatest } from 'redux-saga/effects';
import ADDRESS_VERIFICATION_CONSTANTS from '../AddressVerification.constants';
import { verifyAddressSuccess } from './AddressVerification.actions';
import fetchData from '../../../../../service/API';
import endpoints from '../../../../../service/endpoint';

const objectToQueryString = params => {
  return Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
};
const getSuggestedAddress = (response, userAddress) => {
  const suggestedAddress = response.Records[0];
  return Object.assign({}, userAddress, {
    addressLine: [suggestedAddress.AddressLine1, suggestedAddress.AddressLine2 || ''],
    city: suggestedAddress.City,
    state: suggestedAddress.State,
    zipCode: suggestedAddress.postalCode,
  });
};

const getResultType = response => {
  const result = response.Records[0].Results.split(',');

  if (result[0] === 'AE11') {
    return ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_RESULT.COLORED_COPY_MODAL;
  }
  if (result[0] === 'AE09') {
    return ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_RESULT.ADDRESS_LINE_2_MODAL;
  }

  if (result.length === 1 && result[0] === 'AS01') {
    return ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_RESULT.NO_MODAL;
  }

  return ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS_RESULT.TRADITIONAL_MODAL;
};

function* verifyAddress({ payload }) {
  try {
    const { baseURI, relURI, method } = endpoints.verifyAddress;

    const queryDataObject = {
      a1: payload.addressLine[0],
      a2: payload.addressLine[1] || '',
      city: payload.city,
      state: payload.state,
      postal: payload.zipCode,
      ctry: payload.country === 'Canada' ? 'CA' : 'US',
    };

    const fullRelURI = `${relURI}${objectToQueryString(queryDataObject)}`;

    const res = yield call(
      fetchData,
      baseURI,
      fullRelURI,
      {
        langId: -1,
        catalogId: 10551,
        storeId: 10151,
      },
      method
    );
    if (res) {
      const suggestedAddress = getSuggestedAddress(res.body, payload);
      const resultType = getResultType(res.body);
      yield put(verifyAddressSuccess(suggestedAddress, resultType));
    }
    return null;
  } catch (err) {
    return null;
  }
}

function* verifyAddressSaga() {
  yield takeLatest(ADDRESS_VERIFICATION_CONSTANTS.VERIFY_ADDRESS, verifyAddress);
}

export default verifyAddressSaga;
