import { fromJS } from 'immutable';
import ProductTabListReducer from '../ProductTabList.reducer';
import constants from '../ProductTabList.constants';

const initialState = fromJS({
  errors: { '112': null },
});

describe('ProductTabListReducer', () => {
  it('should return default state', () => {
    const mockResponse = fromJS({
      errors: { '112': null },
    });
    expect(ProductTabListReducer(initialState, {})).toEqual(mockResponse);
  });

  it('should return default state', () => {
    const mockResponse = {};
    expect(ProductTabListReducer()).toEqual(mockResponse);
  });

  it('should trigger PRODUCT_TAB_LIST_SUCCESS action', () => {
    const ResponsePayload = {
      type: constants.PRODUCT_TAB_LIST_SUCCESS,
      payload: { errors: { '112': null } },
    };

    const mockResponse = {
      errors: { '112': null },
    };
    expect(ProductTabListReducer({}, ResponsePayload)).toEqual(mockResponse);
  });

  it('should trigger PRODUCT_TAB_LIST_FAIL action', () => {
    const ResponsePayload = {
      type: constants.PRODUCT_TAB_LIST_FAIL,
      payload: { errors: { '112': 'Product Info Fetch Failed' } },
    };

    const mockResponse = {
      errors: { '112': 'Product Info Fetch Failed' },
    };
    expect(ProductTabListReducer({}, ResponsePayload)).toEqual(mockResponse);
  });
});
