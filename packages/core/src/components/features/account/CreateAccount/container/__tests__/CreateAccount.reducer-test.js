import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../../CreateAccount.constants';
import CreateAccountReducer from '../CreateAccount.reducer';
import { resetCreateAccountErr, createAccountErr } from '../CreateAccount.actions';

const initialState = fromJS({
  error: null,
});

describe('CreateAccount Reducer', () => {
  it('should return default state', () => {
    const state = CreateAccountReducer(undefined, {});
    expect(state.get('error')).toBeNull();
  });

  it('should return resetCreateAccount error state', () => {
    const state = CreateAccountReducer(initialState, resetCreateAccountErr('error'));
    expect(state.get('error')).toBeNull();
  });

  it('should return createAccount error state', () => {
    const state = CreateAccountReducer(initialState, createAccountErr('error'));
    expect(state.get('error')).toBe('error');
  });

  it('should call SET_SUBMIT_SUCCEEDED ', () => {
    const checkErrorReset = false;
    expect(
      CreateAccountReducer(initialState, {
        type: SET_SUBMIT_SUCCEEDED,
        meta: {
          form: constants.CREATE_ACCOUNT_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE  ', () => {
    let checkErrorReset = false;

    const checkErrorResetValue = CreateAccountReducer(initialState, {
      type: SET_SUBMIT_SUCCEEDED,
      meta: {
        form: constants.CREATE_ACCOUNT_FORM,
      },
    });
    checkErrorReset = checkErrorResetValue;
    expect(
      CreateAccountReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.CREATE_ACCOUNT_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE but not change error ', () => {
    const checkErrorReset = false;
    expect(
      CreateAccountReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.CREATE_ACCOUNT_FORM,
        },
      })
    ).toEqual(initialState);
  });
});
