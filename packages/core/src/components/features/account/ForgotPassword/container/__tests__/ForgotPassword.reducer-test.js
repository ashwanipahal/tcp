import { fromJS } from 'immutable';
import ForgotPasswordReducer from '../ForgotPassword.reducer';
import FORGOTPASSWORD_CONSTANTS from '../../ForgotPassword.constants';

describe('Address List reducer', () => {
  it('should return  default state', () => {
    const initialState = fromJS({
      showNotification: false,
    });
    expect(ForgotPasswordReducer(initialState, {}));
  });

  it('should handle success addAddressSuccess', () => {
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
});
