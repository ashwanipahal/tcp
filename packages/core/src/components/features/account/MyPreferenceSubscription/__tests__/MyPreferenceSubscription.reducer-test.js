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
});
