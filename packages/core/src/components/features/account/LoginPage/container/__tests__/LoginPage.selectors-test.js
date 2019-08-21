import { fromJS } from 'immutable';
import {
  getLoginError,
  getLoginErrorMessage,
  shouldShowRecaptcha,
  getLabels,
} from '../LoginPage.selectors';
import { LOGINPAGE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#LoginPage selector', () => {
  it('#getLoginError should return false if user is logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        success: true,
      }),
    };
    expect(getLoginError(initialState)).toBeFalsy();
  });

  it('#getLoginError should return true if user is not logged in', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        success: false,
      }),
    };
    expect(getLoginError(initialState)).toBeTruthy();
  });

  it('#shouldShowRecaptcha should return true or false based on error response', () => {
    const initialState = {
      [LOGINPAGE_REDUCER_KEY]: fromJS({
        retiresCount: '1',
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

  describe('#getLoginErrorMessage', () => {
    let state;
    const message = 'test error message';
    beforeEach(() => {
      state = {
        Labels: {
          global: {
            login: {
              lbl_login_error_1234: message,
            },
          },
        },
        [LOGINPAGE_REDUCER_KEY]: fromJS({
          errorCode: '1234',
        }),
      };
    });

    it('should return label message if errorCode present in label', () => {
      const errorMessage = getLoginErrorMessage(state);
      expect(errorMessage).toBe(message);
    });

    it('should return error message from the response if errorCode is not present', () => {
      const APIError = 'internal server error';
      const updatedState = {
        Labels: {
          global: {
            login: {
              lbl_login_error_1234: message,
            },
          },
        },
        [LOGINPAGE_REDUCER_KEY]: fromJS({
          errorCode: '2222',
          errorMessage: {
            _error: APIError,
          },
        }),
      };
      const errorMessage = getLoginErrorMessage(updatedState);
      expect(errorMessage).toBe(APIError);
    });
  });
});
