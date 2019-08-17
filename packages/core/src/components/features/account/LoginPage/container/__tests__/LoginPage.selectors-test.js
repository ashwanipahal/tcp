import { fromJS } from 'immutable';
import {
  getUserLoggedInState,
  getLoginError,
  getLoginErrorMessage,
  shouldShowRecaptcha,
  getLabels,
  isPlccUser,
} from '../LoginPage.selectors';
import { LOGINPAGE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#LoginPage selector', () => {
  it('#getUserLoggedInState should return if user is logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          isLoggedin: true,
        }
      }),
    };
    expect(getUserLoggedInState(initialState)).toBeTruthy();
  });

  it('#getUserLoggedInState should return false if user is not logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: null
      }),
    };
    expect(getUserLoggedInState(initialState)).toBeFalsy();
  });

  it('#getLoginError should return true if user is successfully logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          success: true,
        }
      }),
    };
    expect(getLoginError(initialState)).toBeFalsy();
  });

  it('#getLoginError should return false if user is successfully logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          success: false,
        }
      }),
    };
    expect(getLoginError(initialState)).toBeTruthy();
  });

  it('#getLoginErrorMessage should return error message', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          success: true,
          errorMessage: 'test',
        }
      }),
    };
    expect(getLoginErrorMessage(initialState)).toEqual('test');
  });

  it('#shouldShowRecaptcha should return true or false based on error response', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          retiresCount: '1',
        }
      }),
    };
    expect(shouldShowRecaptcha(initialState)).toEqual(false);
  });

  it('#getLabels should return labels', () => {
    const state = {
      Labels: {
        global: {},
      },
    };
    const returnedLabels = {};

    expect(getLabels(state)).toMatchObject(returnedLabels);
  });

  it('#isPlccUser should return true for plcc user', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {
          isPlcc: 'true',
        }
      }),
    };
    expect(isPlccUser(initialState)).toEqual(true);
  });

  it('#isPlccUser should return false if x_hasPLCC flag is not present', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        userInfo: {}
      }),
    };
    expect(isPlccUser(initialState)).toEqual(false);
  });
});
