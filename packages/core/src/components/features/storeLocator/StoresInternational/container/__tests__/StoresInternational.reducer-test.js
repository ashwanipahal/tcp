import { fromJS } from 'immutable';
import constants from '../StoresInternational.constants';
import StoresInternationalReducer from '../StoresInternational.reducer';

describe('StoresInternational Reducer', () => {
  it('should return default state', () => {
    const initialState = fromJS({});
    expect(StoresInternationalReducer(initialState, {}).get('action_one')).not.toBeDefined();
  });

  it('should return success state', () => {
    const initialState = fromJS({});
    expect(
      StoresInternationalReducer(initialState, {
        type: constants.STORES_INTERNATIONAL_TEST_ACTION_ONE,
        payload: 'test',
      }).get('action_one')
    ).toEqual('test');
  });

  it('should return error state', () => {
    const initialState = fromJS({});
    expect(
      StoresInternationalReducer(initialState, {
        type: constants.STORES_INTERNATIONAL_TEST_ACTION_TWO,
        payload: 'test',
      }).get('action_two')
    ).toEqual('test');
  });
});
