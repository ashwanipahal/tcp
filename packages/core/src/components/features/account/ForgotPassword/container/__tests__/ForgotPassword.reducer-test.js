import { fromJS } from 'immutable';
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
    const initialState = null;
    expect(
      ForgotPasswordReducer(initialState, {
        type: FORGOTPASSWORD_CONSTANTS.USER_NOT_AVAILABLE,
        payload: {
          userId: '12345',
        },
      })
    ).toEqual(
      fromJS({
        userId: '12345',
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
});
