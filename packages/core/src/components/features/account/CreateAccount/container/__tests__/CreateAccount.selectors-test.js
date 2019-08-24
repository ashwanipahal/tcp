import { fromJS } from 'immutable';
import { getLabels, getErrorMessage } from '../CreateAccount.selectors';

describe('#CreateAccount selector', () => {
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
