import { fromJS } from 'immutable';
import AddAddressReducer from '../AddAddress/AddAddress.reducer';
import ADD_ADDRESS_CONSTANTS from '../AddAddress/AddAddress.constants';

describe('AddAddressReducer reducer', () => {
  it('should return  default state', () => {
    expect(AddAddressReducer(undefined, {}).get('addAddressNotification')).toEqual(false);
  });
  it('should handle failure addAddressFail', () => {
    const initialState = fromJS({
      addAddressNotification: false,
    });
    expect(
      AddAddressReducer(initialState, {
        type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL,
      })
    ).toEqual(
      fromJS({
        addAddressNotification: true,
      })
    );
  });
});
