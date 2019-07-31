import { Map, fromJS } from 'immutable';
import AccountReducer from '../container/Account.reducer';
// import { getAccountNavigationList } from '../container/Account.actions';
import ACCOUNT_CONSTANTS from '../Account.constants';

// et accountNavigationList = [{}];

describe('Account Navigation reducer', () => {
  it('should return empty Account Navigation as default state', () => {
    expect(AccountReducer(undefined, {}).get('accountNavigation')).toBeNull();
  });

  it('should return List object for the accountNavigationList if state is passed as an array', () => {
    const state = AccountReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should return isFetching true', () => {
    const initialState = fromJS({
      isFetching: false,
    });
    expect(
      AccountReducer(initialState, {
        type: ACCOUNT_CONSTANTS.SHOW_LOADER,
      })
    ).toEqual(fromJS({ isFetching: true }));
  });
});
