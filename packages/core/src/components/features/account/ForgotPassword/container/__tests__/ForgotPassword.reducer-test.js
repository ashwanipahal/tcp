import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import ForgotPasswordReducer from '../ForgotPassword.reducer';
import FORGOTPASSWORD_CONSTANTS from '../../ForgotPassword.constants';

describe('ForgotPasswordReducer List reducer', () => {
  it('should return  default state', () => {
    const initialState = fromJS({
      showNotification: false,
    });
    expect(ForgotPasswordReducer(initialState, {}));
  });

  it('should handle success ForgotPasswordReducer', () => {
    const initialState = fromJS({
      showNotification: true,
    });

    expect(
      ForgotPasswordReducer(initialState, {
        type: FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE,
        payload: {
          userId: '12345',
        },
      })
    ).toEqual(
      fromJS({
        showNotification: true,
        error: { userId: '12345' },
      })
    );
  });

  it('should return toggleSuccessfulEmailSection true', () => {
    const err = fromJS({
      statusCode: 200,
      message: 'Object not found',
    });
    const initialState = fromJS({
      toggleSuccessfulEmailSection: null,
    });
    expect(
      ForgotPasswordReducer(initialState, {
        type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESS,
        payload: err,
      })
    ).toEqual(fromJS({ toggleSuccessfulEmailSection: true }));
  });

  it('should return toggleSuccessfulEmailSection true email', () => {
    const err = fromJS({
      statusCode: 200,
      message: 'Object not found',
    });
    const initialState = fromJS({
      toggleSuccessfulEmailSection: null,
    });
    expect(
      ForgotPasswordReducer(initialState, {
        type: FORGOTPASSWORD_CONSTANTS.RESET_PASSWORD_SUCCESSFULL_EMAIL,
        payload: err,
      })
    ).toEqual(fromJS({ toggleSuccessfulEmailSection: true }));
  });

  it('should call SET_SUBMIT_SUCCEEDED ', () => {
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
    const checkErrorReset = false;
    expect(
      ForgotPasswordReducer(initialState, {
        type: SET_SUBMIT_SUCCEEDED,
        meta: {
          form: FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM,
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

    const checkErrorResetValue = ForgotPasswordReducer(initialState, {
      type: SET_SUBMIT_SUCCEEDED,
      meta: {
        form: FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM,
      },
    });
    checkErrorReset = checkErrorResetValue;
    expect(
      ForgotPasswordReducer(initialState, {
        type: CHANGE,
        meta: {
          form: FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM,
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
      ForgotPasswordReducer(initialState, {
        type: CHANGE,
        meta: {
          form: FORGOTPASSWORD_CONSTANTS.FORGOT_PASSWORD_FORM,
        },
      })
    ).toEqual(initialState);
  });
});
