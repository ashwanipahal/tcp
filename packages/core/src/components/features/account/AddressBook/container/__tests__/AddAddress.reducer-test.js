import { fromJS } from 'immutable';
import AddAddressReducer from '../AddAddress/AddAddress.reducer';
import ADD_ADDRESS_CONSTANTS from '../AddAddress/AddAddress.constants';

describe('AddAddressReducer reducer', () => {
  it('should return  default state', () => {
    expect(AddAddressReducer(undefined, {})).toBeNull();
  });
  it('should handle failure addAddressFail', () => {
    const initialState = null;
    expect(
      AddAddressReducer(initialState, {
        type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL,
        payload: {},
      })
    ).toEqual(fromJS({}));
  });

  it('should handle success addAddressSuccess', () => {
    const initialState = null;
    expect(
      AddAddressReducer(initialState, {
        type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS,
        payload: {},
      })
    ).toEqual(fromJS({}));
  });
});
