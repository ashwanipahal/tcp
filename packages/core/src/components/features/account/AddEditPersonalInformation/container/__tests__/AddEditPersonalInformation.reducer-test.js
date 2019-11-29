import { fromJS } from 'immutable';
import { SET_SUBMIT_SUCCEEDED, CHANGE } from 'redux-form/lib/actionTypes';
import constants from '../../AddEditPersonalInformation.constants';
import UpdateProfileReducer from '../AddEditPersonalInformation.reducer';
import { updateProfileSuccess, updateProfileError } from '../AddEditPersonalInformation.actions';

const initialState = fromJS({
  success: null,
  error: null,
});

describe('UpdateProfile Reducer', () => {
  it('should return default state', () => {
    const state = UpdateProfileReducer(undefined, {});
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBeNull();
  });

  it('should return success state', () => {
    const state = UpdateProfileReducer(initialState, updateProfileSuccess('success'));
    expect(state.get('success')).toBe('success');
    expect(state.get('error')).toBeNull();
  });

  it('should return error state', () => {
    const state = UpdateProfileReducer(initialState, updateProfileError('error'));
    expect(state.get('success')).toBeNull();
    expect(state.get('error')).toBe('error');
  });

  it('should call SET_SUBMIT_SUCCEEDED ', () => {
    expect(
      UpdateProfileReducer(initialState, {
        type: SET_SUBMIT_SUCCEEDED,
        meta: {
          form: constants.ADD_PROFILE_INFORMATION_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE  ', () => {
    UpdateProfileReducer(initialState, {
      type: SET_SUBMIT_SUCCEEDED,
      meta: {
        form: constants.ADD_PROFILE_INFORMATION_FORM,
      },
    });
    expect(
      UpdateProfileReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.ADD_PROFILE_INFORMATION_FORM,
        },
      })
    ).toEqual(initialState);
  });

  it('should call CHANGE but not change error ', () => {
    expect(
      UpdateProfileReducer(initialState, {
        type: CHANGE,
        meta: {
          form: constants.ADD_PROFILE_INFORMATION_FORM,
        },
      })
    ).toEqual(initialState);
  });
});
