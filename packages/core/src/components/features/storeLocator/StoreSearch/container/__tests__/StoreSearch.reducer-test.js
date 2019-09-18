import { fromJS } from 'immutable';
import constants from '../StoreSearch.constants';
import StoreSearchReducer from '../StoreSearch.reducer';

describe('StoreSearch Reducer', () => {
  it('should return default state', () => {
    const initialState = fromJS({});
    expect(StoreSearchReducer(initialState, {}).get('action_one')).not.toBeDefined();
  });

  it('should return success state', () => {
    const initialState = fromJS({});
    expect(
      StoreSearchReducer(initialState, {
        type: constants.STORE_SEARCH_TEST_ACTION_ONE,
        payload: 'test',
      }).get('action_one')
    ).toEqual('test');
  });

  it('should return error state', () => {
    const initialState = fromJS({});
    expect(
      StoreSearchReducer(initialState, {
        type: constants.STORE_SEARCH_TEST_ACTION_TWO,
        payload: 'test',
      }).get('action_two')
    ).toEqual('test');
  });
});
