import { fromJS } from 'immutable';
import LoginPageReducer from '../LoginPage.reducer';
import { setLoginInfo } from '../LoginPage.actions';

describe('LoginPage reducer', () => {
  const initialState = fromJS({
    loginModalMountedState: false,
    error: null,
    checkoutModalMountedState: false,
  });
  it('should return default state', () => {
    expect(LoginPageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setLoginInfo action correctly', () => {
    const payload = {
      success: true,
    };
    const expectedState = fromJS({
      error: fromJS(payload),
      loginModalMountedState: false,
      checkoutModalMountedState: false,
    });

    expect(LoginPageReducer(initialState, setLoginInfo(payload))).toEqual(expectedState);
  });
});
