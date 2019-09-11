import { fromJS } from 'immutable';
import AddAddressReducer from '../AddEditAddress.reducer';
import constants from '../AddEditAddress.constants';

describe('AddAddressReducer reducer', () => {
  it('should return  default state', () => {
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
    expect(AddAddressReducer(initialState, {}));
  });
  it('should handle failure addAddressFail', () => {
    const initialState = fromJS({
      showNotification: true,
      error: null,
    });
    expect(
      AddAddressReducer(initialState, {
        type: constants.ADD_USER_ADDRESS_FAIL,
        payload: {
          error: 'test error',
        },
      })
    ).toEqual(
      fromJS({
        error: { error: 'test error' },
        showNotification: true,
      })
    );
  });

  it('should handle success addAddressSuccess', () => {
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
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
