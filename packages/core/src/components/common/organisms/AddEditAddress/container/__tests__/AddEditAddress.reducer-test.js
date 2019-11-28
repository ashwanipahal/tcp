import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
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

  it('should call SET_SUBMIT_SUCCEEDED ', () => {
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
    const checkErrorReset = false;
    expect(
      AddAddressReducer(initialState, {
        type: SET_SUBMIT_SUCCEEDED,
        meta: {
          form: constants.ADDRESS_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE  ', () => {
    let checkErrorReset = false;
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });

    const checkErrorResetValue = AddAddressReducer(initialState, {
      type: SET_SUBMIT_SUCCEEDED,
      meta: {
        form: constants.ADDRESS_FORM,
      },
    });
    checkErrorReset = checkErrorResetValue;
    expect(
      AddAddressReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.ADDRESS_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE but not change error ', () => {
    const checkErrorReset = false;
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
    expect(
      AddAddressReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.ADDRESS_FORM,
        },
      })
    ).toEqual(initialState);
  });
});
