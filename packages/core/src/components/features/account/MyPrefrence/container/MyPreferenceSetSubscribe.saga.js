import { call, takeLatest, put } from 'redux-saga/effects';
import MY_PREFERENCE_CONSTANTS from '../MyPrefrence.constants';
import { setSubscribeStore } from './MyPreference.actions';
import { myPreferenceModalSubmit } from '../../../../../services/abstractors/account/myPreferernce';

export function* setSubscribeStoreSaga(data) {
  const { payload } = data;
  const { mobileNumber, CustomerPreferences } = payload;

  console.log('khan--------------------------------------');
  console.log(mobileNumber);
  console.log(CustomerPreferences);
  console.log('khan--------------------------------------');
  try {
    const subscribeData = yield call(myPreferenceModalSubmit, mobileNumber, CustomerPreferences);

    console.log(
      'furkan ali ifsldfnlsndflksdf  --------------testing-------------------------------------'
    );
    console.log(subscribeData);
    console.log(
      'furkan ali ifsldfnlsndflksdf  --------------testing-------------------------------------'
    );

    yield put(setSubscribeStore(subscribeData));
  } catch (err) {
    yield null;
  }
}

export function* SubscribeBrandStoreSaga() {
  yield takeLatest(MY_PREFERENCE_CONSTANTS.SET_BRAND_SUBSCRIBE_DATA, setSubscribeStoreSaga);
}

export default SubscribeBrandStoreSaga;
