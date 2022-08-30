import { fromJS } from 'immutable';
import {
  getLabels,
  getErrorMessage,
  getIAgree,
  getHideShowPwd,
  getConfirmHideShowPwd,
} from '../CreateAccount.selectors';

describe('#CreateAccount selector', () => {
  it('#getIAgree should return labels', () => {
    const state = {
      form: {
        CreateAccountForm: {
          values: {
            iAgree: true,
          },
        },
      },
    };
    const returnedLabels = true;
    expect(getIAgree(state)).toBe(returnedLabels);
  });

  it('#getHideShowPwd should return labels', () => {
    const state = {
      form: {
        CreateAccountForm: {
          values: {
            hideShowPwd: true,
          },
        },
      },
    };
    const returnedLabels = true;
    expect(getHideShowPwd(state)).toBe(returnedLabels);
  });

  it('#getConfirmHideShowPwd should return labels', () => {
    const state = {
      form: {
        CreateAccountForm: {
          values: {
            confirmHideShowPwd: true,
          },
        },
      },
    };
    const returnedLabels = true;
    expect(getConfirmHideShowPwd(state)).toBe(returnedLabels);
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

  describe('#getErrorMessage', () => {
    let state;
    const message = 'test error message';
    beforeEach(() => {
      state = {
        Labels: {
          global: {
            registration: {
              lbl_createAccount_error_1234: message,
            },
          },
        },
        CreateAccountReducer: fromJS({
          error: {
            errorCode: '1234',
          },
        }),
      };
    });

    it('should return label message if errorCode present in label', () => {
      const errorMessage = getErrorMessage(state);
      expect(errorMessage).toBe(message);
    });

    it('should return error message from the response if errorCode is not present', () => {
      const APIError = 'internal server error';
      const updatedState = {
        Labels: {
          global: {
            registration: {
              lbl_createAccount_error_1234: message,
            },
          },
        },
        CreateAccountReducer: fromJS({
          error: {
            errorCode: '2222',
            errorMessage: {
              _error: APIError,
            },
          },
        }),
      };
      const errorMessage = getErrorMessage(updatedState);
      expect(errorMessage).toBe(APIError);
    });
  });
});
