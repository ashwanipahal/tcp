import { PAYMENT_REDUCER_KEY, PAYMENT_ACTION_PATTERN } from '../../constants/reducer.constants';
import { getReducerKeyByAction, getActionPatternByReducerKey } from '../redux.util';

describe('Redux util methods', () => {
  it('getReducerKeyByAction should return correct reducer key', () => {
    const actionName = `${PAYMENT_ACTION_PATTERN} Payment Action`;
    expect(getReducerKeyByAction(actionName)).toEqual(PAYMENT_REDUCER_KEY);
  });

  it('getActionPatternByReducerKey should return correct actionPattern', () => {
    expect(getActionPatternByReducerKey(PAYMENT_REDUCER_KEY)).toEqual(PAYMENT_ACTION_PATTERN);
  });
});
