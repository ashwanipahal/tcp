import { fromJS } from 'immutable';
import { BIRTHDAY_SAVING_LIST_REDUCER_KEY } from '../../../../../../../../constants/reducer.constants';
import { getStatus, getMessage } from '../BirthdaySavingsList.selectors';

describe('#BirthdaySavingsList Selectors', () => {
  let state;

  describe('getStatus', () => {
    beforeEach(() => {
      const birthdaySavingListState = fromJS({
        success: null,
        error: null,
      });
      state = {
        [BIRTHDAY_SAVING_LIST_REDUCER_KEY]: birthdaySavingListState,
        Labels: {
          account: {
            profile: {},
          },
        },
      };
    });

    it('should return empty string if no success or error', () => {
      expect(getStatus(state)).toBe('');
    });

    it('should return success string for success', () => {
      state[BIRTHDAY_SAVING_LIST_REDUCER_KEY] = state[BIRTHDAY_SAVING_LIST_REDUCER_KEY].set(
        'success',
        fromJS({ childId: '1234' })
      );
      expect(getStatus(state)).toBe('success');
    });

    it('should return error string for error', () => {
      state[BIRTHDAY_SAVING_LIST_REDUCER_KEY] = state[BIRTHDAY_SAVING_LIST_REDUCER_KEY].set(
        'error',
        fromJS({ errorCode: '1234' })
      );
      expect(getStatus(state)).toBe('error');
    });

    it('should return empty string if no success or error', () => {
      expect(getMessage(state)).toBe('');
    });

    it('should return correct message key', () => {
      state[BIRTHDAY_SAVING_LIST_REDUCER_KEY] = state[BIRTHDAY_SAVING_LIST_REDUCER_KEY].set(
        'success',
        { childId: '1234' }
      );
      expect(getMessage(state)).toBe('lbl_profile_removeBirthdaySuccess');
    });

    it('should return correct error string for error if errorCode is present', () => {
      state[BIRTHDAY_SAVING_LIST_REDUCER_KEY] = state[BIRTHDAY_SAVING_LIST_REDUCER_KEY].set(
        'error',
        fromJS({ errorCode: '1234' })
      );
      expect(getMessage(state)).toBe('lbl_profile_1234');
    });

    it('should return default error string for error if errorCode is not present', () => {
      state[BIRTHDAY_SAVING_LIST_REDUCER_KEY] = state[BIRTHDAY_SAVING_LIST_REDUCER_KEY].set(
        'error',
        fromJS({})
      );
      expect(getMessage(state)).toBe('lbl_profile_genericError');
    });
  });
});
