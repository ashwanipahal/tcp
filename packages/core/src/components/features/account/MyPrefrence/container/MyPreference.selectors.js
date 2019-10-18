import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';
import { MY_PREFERENCE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import MyPreferenceConst from '../MyPrefrence.constants';

const getState = state => state[MY_PREFERENCE_REDUCER_KEY];

export const getIsTcpSubscribe = state => {
  const selector = formValueSelector(MyPreferenceConst.MY_PREFERENCE_FORM);
  return selector(state, 'tcpWebSubscribe');
};

export const getSmsSubscriptionState = createSelector(
  getState,
  state => state && state.subscribeStoreData && state.subscribeStoreData.smsSubscriptionState
);
