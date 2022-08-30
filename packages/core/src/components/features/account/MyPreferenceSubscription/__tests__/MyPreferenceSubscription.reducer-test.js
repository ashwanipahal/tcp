import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import MyPreferenceReducer from '../container/MyPreferenceSubscription.reducer';
import {
  setSubscribeStore,
  getSubscribeStore,
} from '../container/MyPreferenceSubscription.actions';

const initialState = { subscribeStoreData: null };
const subscribePayload = {};

describe('OrderDetails Reducer', () => {
  it('should return default state', () => {
    const state = MyPreferenceReducer(undefined, {});
    expect(state.subscribeStoreData).toBeNull();
  });

  it('should return subscribeStoreData state', () => {
    const state = MyPreferenceReducer(initialState, setSubscribeStore(subscribePayload));
    expect(state.subscribeStoreData).toBe(subscribePayload);
  });

  it('should return subscribeStoreData state', () => {
    const state = MyPreferenceReducer(initialState, getSubscribeStore());
    expect(state.subscribeStoreData).toBe(null);
  });
  it('should return initial state in case of LOGOUT action', () => {
    const state = MyPreferenceReducer(undefined, setSubscribeStore(subscribePayload));
    const loggedOutState = MyPreferenceReducer(state, logout());
    expect(loggedOutState.subscribeStoreData).toBeNull();
  });
});
