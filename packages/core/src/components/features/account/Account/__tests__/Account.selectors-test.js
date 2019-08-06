import { fromJS } from 'immutable';
import {
  getAccountNavigationState,
  getAccountNavigationFetchingState,
  getLabels,
} from '../container/Account.selectors';

describe('#AccountNavigation selector', () => {
  it('#getAccountNavigationState should return AccountNavigationReduer state', () => {
    const accountNavigationState = fromJS({
      accountNavigation: [],
      isFetching: false,
    });
    const state = {
      AccountReducer: accountNavigationState,
    };

    expect(getAccountNavigationState(state)).toEqual(
      accountNavigationState.get('accountNavigation')
    );
  });

  it('#getAccountNavigationFetchingState should return fetching state', () => {
    const accountNavigationState = fromJS({
      accountNavigation: [],
      isFetching: false,
    });
    const state = {
      AccountReducer: accountNavigationState,
    };
    expect(getAccountNavigationFetchingState(state)).toEqual(
      accountNavigationState.get('isFetching')
    );
  });

  it('#getLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {},
      },
    };
    expect(getLabels(state)).toMatchObject({});
  });
});
