import { call, takeLatest, put, all } from 'redux-saga/effects';
import { getStoresByCountry } from '../../../../../services/abstractors/common/storeLocator';
import { defaultCountries } from '../../../../../constants/site.constants';
import constants from './StoreList.constants';
// TBD: Update sagas for container components with contextual ones
import { setStoreList } from './StoreList.actions';

export function* getStoresList() {
  try {
    const [storesUS, storesCA] = yield all([
      call(getStoresByCountry, defaultCountries[0]),
      call(getStoresByCountry, defaultCountries[1]),
    ]);
    const payloadUS = {
      stores: storesUS,
      id: defaultCountries[0].id,
    };
    const payloadCA = {
      stores: storesCA,
      id: defaultCountries[1].id,
    };
    return yield all([put(setStoreList(payloadUS)), put(setStoreList(payloadCA))]);
  } catch (err) {
    return yield null;
  }
}

export function* StoreListSaga() {
  yield takeLatest(constants.GET_STORE_LIST, getStoresList);
}

export default StoreListSaga;
