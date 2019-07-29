import { fromJS } from 'immutable';
import LoginPageReducer from '../LoginPage.reducer';
import { setLoginInfo } from '../LoginPage.actions';

describe('LoginPage reducer', () => {
  const initialState = null;

  it('should return default state', () => {
    expect(LoginPageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setLoginInfo action correctly', () => {
    const payload = {
      firstName: 'test',
    };
    const expectedState = fromJS(payload);
    expect(LoginPageReducer(initialState, setLoginInfo(payload))).toEqual(expectedState);
  });
});
