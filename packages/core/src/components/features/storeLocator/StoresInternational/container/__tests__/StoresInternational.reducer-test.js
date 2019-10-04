import { fromJS } from 'immutable';
import STORES_INTL_CONSTANTS from '../StoresInternational.constants';
import StoresInternationalReducer from '../StoresInternational.reducer';

describe('StoresInternational Reducer', () => {
  it('should return default state', () => {
    expect(StoresInternationalReducer().get('moduleXContent')).toBe('');
    expect(StoresInternationalReducer('')).toBe('');
  });

  it('should return immutable state for type Object', () => {
    expect(StoresInternationalReducer({}).get('moduleXContent')).not.toBeDefined();
  });

  it('should return immutable state', () => {
    expect(StoresInternationalReducer(fromJS({})).get('moduleXContent')).not.toBeDefined();
  });

  it('should return success state', () => {
    const initialState = fromJS({});
    expect(
      StoresInternationalReducer(initialState, {
        type: STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_SET_MODULEX,
        payload: 'test',
      }).get('moduleXContent')
    ).toEqual('test');
  });
});
