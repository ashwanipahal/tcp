import { call, takeLatest, put } from 'redux-saga/effects';
import MY_PREFERENCE_CONSTANTS from '../MyPrefrence.constants';
import { setSubscribeStore } from './MyPreference.actions';
import { getUserSubscriptionPreference } from '../../../../../services/abstractors/account/myPreferernce';

export function* getSubscribeStoreSaga() {
  try {
    const subscribeStoreData = yield call(getUserSubscriptionPreference);
    yield put(setSubscribeStore(subscribeStoreData));
  } catch (err) {
    yield null;
  }
}

export function* SubscribeStoreSaga() {
  yield takeLatest(MY_PREFERENCE_CONSTANTS.GET_SUBSCRIBE_STORE, getSubscribeStoreSaga);
}

export default SubscribeStoreSaga;
