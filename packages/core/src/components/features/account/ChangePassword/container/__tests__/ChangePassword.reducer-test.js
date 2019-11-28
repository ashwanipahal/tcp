import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../../ChangePassword.constants';
import ChangePasswordReducer from '../ChangePassword.reducer';
import { changePasswordSuccess, changePasswordError } from '../ChangePassword.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('ChangePassword Reducer', () => {
  it('should return default state', () => {
    const state = ChangePasswordReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = ChangePasswordReducer(initialState, changePasswordSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = ChangePasswordReducer(initialState, changePasswordError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });

  it('should call SET_SUBMIT_SUCCEEDED ', () => {
    const checkErrorReset = false;
    expect(
      ChangePasswordReducer(initialState, {
        type: SET_SUBMIT_SUCCEEDED,
        meta: {
          form: constants.CHANGE_PASSWORD_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE  ', () => {
    let checkErrorReset = false;

    const checkErrorResetValue = ChangePasswordReducer(initialState, {
      type: SET_SUBMIT_SUCCEEDED,
      meta: {
        form: constants.CHANGE_PASSWORD_FORM,
      },
    });
    checkErrorReset = checkErrorResetValue;
    expect(
      ChangePasswordReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.CHANGE_PASSWORD_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE but not change error ', () => {
    const checkErrorReset = false;
    expect(
      ChangePasswordReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.CHANGE_PASSWORD_FORM,
        },
      })
    ).toEqual(initialState);
  });
});
