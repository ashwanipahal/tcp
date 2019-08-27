import { Map, fromJS } from 'immutable';
import { TrackOrderReducer, initialState } from '../TrackOrder.reducer';
import {
  setTrackOrderModalMountedState,
  setOrderDetailInfo,
  setError,
  setErrorInfoNull,
} from '../TrackOrder.actions';

describe('Track Order reducer', () => {
  it('should return state as Map object if state is passsed as an object', () => {
    const state = TrackOrderReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should get an initial state when the reducer is called first', () => {
    const state = TrackOrderReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should set track order modal mount state to true', () => {
    const state = TrackOrderReducer(initialState, setTrackOrderModalMountedState({ state: true }));
    const updatedState = fromJS({
      cacheUntil: null,
      showNotificationOnModal: null,
      trackOrderMountedState: true,
    });
    expect(state).toEqual(updatedState);
  });

  it('should set track order modal mount state to false', () => {
    const state = TrackOrderReducer(initialState, setTrackOrderModalMountedState({ state: false }));
    const updatedState = fromJS({
      cacheUntil: null,
      showNotificationOnModal: null,
      trackOrderMountedState: false,
    });
    expect(state).toEqual(updatedState);
  });

  it('should set order detail information', () => {
    const state = TrackOrderReducer(initialState, setOrderDetailInfo({}));
    const updatedState = fromJS({
      cacheUntil: null,
      trackOrderInfo: fromJS({}),
      showNotificationOnModal: null,
      trackOrderMountedState: false,
    });
    expect(state).toEqual(updatedState);
  });

  it('should set error information', () => {
    const state = TrackOrderReducer(initialState, setError({ message: 'Test Error Message' }));
    const updatedState = fromJS({
      cacheUntil: null,
      showNotificationOnModal: 'Test Error Message',
      trackOrderMountedState: false,
    });
    expect(state).toEqual(updatedState);
  });

  it('should set error information to null', () => {
    const state = TrackOrderReducer(initialState, setErrorInfoNull());
    const updatedState = fromJS({
      cacheUntil: null,
      showNotificationOnModal: null,
      trackOrderMountedState: false,
    });
    expect(state).toEqual(updatedState);
  });
});
