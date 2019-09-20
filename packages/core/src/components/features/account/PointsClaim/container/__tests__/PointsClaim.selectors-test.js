import { fromJS } from 'immutable';
import { POINTS_CLAIM_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getError, getSuccess } from '../PointsClaim.selectors';

describe('#PointsClaim Selectors', () => {
  let state;
  beforeEach(() => {
    const PointsClaimState = fromJS({
      success: 'success message',
      error: 'error message',
    });
    state = {
      [POINTS_CLAIM_REDUCER_KEY]: PointsClaimState,
    };
  });

  it('#getError should return error state', () => {
    expect(getError(state)).toEqual('error message');
  });

  it('#getSuccess should return success state', () => {
    expect(getSuccess(state)).toEqual('success message');
  });
});
