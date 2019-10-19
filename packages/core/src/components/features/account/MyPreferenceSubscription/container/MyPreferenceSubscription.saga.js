import { call, takeLatest, put } from 'redux-saga/effects';
import MY_PREFERENCE_CONSTANTS from '../MyPreferenceSubscription.constants';
import { setSubscribeStore, getSubscribeStore } from './MyPreferenceSubscription.actions';
import {
  getUserSubscriptionPreference,
  myPreferenceModalSubmit,
} from '../../../../../services/abstractors/account/myPreferernce';

export function* getSubscribeStoreSaga() {
  try {
    const subscribeStoreData = yield call(getUserSubscriptionPreference);
    yield put(setSubscribeStore(subscribeStoreData));
  } catch (err) {
    yield null;
  }
}

export function* setSubscribeStoreSaga(data) {
  const { payload } = data;

  const { mobileNumber, brand, CustomerPreferences, CustomerPreferencesGym } = payload;
  const customerPreferencesData = CustomerPreferencesGym || CustomerPreferences;
  try {
    yield call(myPreferenceModalSubmit, mobileNumber, customerPreferencesData, brand);
    yield put(getSubscribeStore());
  } catch (err) {
    yield null;
  }
}

export function* SubscribeStoreSaga() {
  yield takeLatest(MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE, getSubscribeStoreSaga);
  yield takeLatest(MY_PREFERENCE_CONSTANTS.SET_BRAND_SUBSCRIBE_DATA, setSubscribeStoreSaga);
}

export default SubscribeStoreSaga;
