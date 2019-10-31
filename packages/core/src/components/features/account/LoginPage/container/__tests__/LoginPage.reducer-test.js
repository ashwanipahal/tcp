import { fromJS } from 'immutable';
import LoginPageReducer from '../LoginPage.reducer';
import { setLoginInfo } from '../LoginPage.actions';

describe('LoginPage reducer', () => {
  const initialState = fromJS({
    error: null,
    loginModalMountedState: false,
    checkoutModalMountedState: false,
    loginErrorMessage: null,
    componentType: 'login',
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
      loginErrorMessage: null,
      componentType: 'login',
    });

    expect(LoginPageReducer(initialState, setLoginInfo(payload))).toEqual(expectedState);
  });
});
