import { fromJS } from 'immutable';
import LoginPageReducer from '../LoginPage.reducer';
import { setLoginInfo, resetLoginInfo } from '../LoginPage.actions';
import { DEFAULT_REDUCER_KEY } from '../../../../../../utils/cache.util';

describe('LoginPage reducer', () => {
  const initialState = fromJS({
    [DEFAULT_REDUCER_KEY]: null,
    userInfo: null
  });

  it('should return default state', () => {
    expect(LoginPageReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setLoginInfo action correctly', () => {
    const payload = {
      firstName: 'test',
    };
    const expectedState = fromJS(payload);
    expect(LoginPageReducer(initialState, setLoginInfo(payload)).get('userInfo')).toEqual(expectedState);
  });

  it('should handle resetLoginInfo action correctly', () => {
    const payload = {
      firstName: 'test',
    };
    const state = fromJS(payload);
    const expectedState = null;
    expect(LoginPageReducer(state, resetLoginInfo()).get('userInfo')).toEqual(expectedState);
  });
});
