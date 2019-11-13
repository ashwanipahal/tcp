import { call, takeLatest, put } from 'redux-saga/effects';
import { setLoaderState } from '@tcp/core/src/components/common/molecules/Loader';
import { validateReduxCache } from '../../../../../utils/cache.util';
import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';
import { setSubscribeStore, getSubscribeStore } from './MyPreferenceSubscription.actions';
import {
  getUserSubscriptionPreference,
  myPreferenceModalSubmit,
} from '../../../../../services/abstractors/account/myPreferernce';

export function* getSubscribeStoreSaga() {
  yield put(setLoaderState(true));
  try {
    const subscribeStoreData = yield call(getUserSubscriptionPreference);
    yield put(setLoaderState(false));
    yield put(setSubscribeStore(subscribeStoreData));
  } catch (err) {
    yield put(setLoaderState(false));
    yield null;
  }
}

export function* setSubscribeStoreSaga(data) {
  yield put(setLoaderState(true));
  const { payload } = data;
  const { mobileNumber, brand, CustomerPreferences, CustomerPreferencesGym } = payload;
  const customerPreferencesData = CustomerPreferencesGym || CustomerPreferences;
  try {
    yield call(myPreferenceModalSubmit, mobileNumber, customerPreferencesData, brand);
    yield put(setLoaderState(false));
    yield put(
      getSubscribeStore({
        ignoreCache: true,
      })
    );
  } catch (err) {
    yield put(setLoaderState(false));
    yield null;
  }
}

export function* SubscribeStoreSaga() {
  const cachedSubscribeStoreSaga = validateReduxCache(getSubscribeStoreSaga);
  yield takeLatest(MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE, cachedSubscribeStoreSaga);
  yield takeLatest(MY_PREFERENCE_CONSTANTS.SET_BRAND_SUBSCRIBE_DATA, setSubscribeStoreSaga);
}

export default SubscribeStoreSaga;
