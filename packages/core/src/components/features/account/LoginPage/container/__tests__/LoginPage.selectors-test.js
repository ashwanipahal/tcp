import { fromJS } from 'immutable';
import {
  getUserLoggedInState,
  getLoginError,
  getLoginErrorMessage,
  shouldShowRecaptcha,
} from '../LoginPage.selectors';
import { LOGINPAGE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#LoginPage selector', () => {
  it('#getUserLoggedInState should return if user is logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        isLoggedin: true,
      }),
    };
    expect(getUserLoggedInState(initialState)).toBeTruthy();
  });

  it('#getUserLoggedInState should return false if user is not logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({}),
    };
    expect(getUserLoggedInState(initialState)).toBeFalsy();
  });

  it('#getLoginError should return true if user is successfully logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        success: true,
      }),
    };
    expect(getLoginError(initialState)).toBeFalsy();
  });

  it('#getLoginError should return false if user is successfully logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        success: false,
      }),
    };
    expect(getLoginError(initialState)).toBeTruthy();
  });

  it('#getLoginErrorMessage should return error message', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        success: true,
        errorMessage: 'test',
      }),
    };
    expect(getLoginErrorMessage(initialState)).toEqual('test');
  });

  it('#shouldShowRecaptcha should return true or false based on error response', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        retiresCount: '1',
      }),
    };
    expect(shouldShowRecaptcha(initialState)).toEqual(false);
  });
});
