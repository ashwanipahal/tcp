import { fromJS } from 'immutable';
import AddAddressReducer from '../AddEditAddress.reducer';
import constants from '../AddEditAddress.constants';

describe('AddAddressReducer reducer', () => {
  it('should return  default state', () => {
    expect(AddAddressReducer(undefined, {})).toBeNull();
  });
  it('should handle failure addAddressFail', () => {
    const initialState = null;
    expect(
      AddAddressReducer(initialState, {
        type: constants.ADD_USER_ADDRESS_FAIL,
        payload: {
          error: 'test error',
        },
      })
    ).toEqual(
      fromJS({
        error: 'test error',
      })
    );
  });

  it('should handle success addAddressSuccess', () => {
    const initialState = null;
    expect(
      AddAddressReducer(initialState, {
        type: constants.ADD_USER_ADDRESS_SUCCESS,
        payload: {
          addressId: '12345',
        },
      })
    ).toEqual(
      fromJS({
        addressId: '12345',
      })
    );
  });
});
