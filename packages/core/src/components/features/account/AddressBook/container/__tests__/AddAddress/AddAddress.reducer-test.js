import { Map, fromJS, List } from 'immutable';
import AddAddressReducer from '../../AddAddress/AddAddress.reducer';
import { addAddressSuccess, addAddressFail } from '../../AddAddress/AddAddress.actions';
import ADD_ADDRESS_CONSTANTS from '../../AddAddress/AddAddress.constants';

describe('AddAddressReducer reducer', () => {
  it('should handle success addAddressSuccess', () => {
    const error = fromJS({
      statusCode: 400,
      message: 'Add address Successful',
    });
    const initialState = fromJS({
      addAddressSuccess: false,
    });
    expect(
      AddAddressReducer(initialState, {
        type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS,
        payload: error,
      })
    ).toEqual(
      fromJS({
        error,
        addAddressLoaded: true,
      })
    );
  });

  it('should handle failure addAddressFail', () => {
    const error = fromJS({
      statusCode: 400,
      message: 'Add address Fail',
    });
    const initialState = fromJS({
      addAddressSuccess: false,
    });
    expect(
      AddAddressReducer(initialState, {
        type: ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL,
        payload: error,
      })
    ).toEqual(
      fromJS({
        error,
        addAddressLoaded: false,
      })
    );
  });
});
