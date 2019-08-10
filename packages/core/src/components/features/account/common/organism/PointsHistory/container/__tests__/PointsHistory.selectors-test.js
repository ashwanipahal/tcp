import { fromJS } from 'immutable';
import {
  getPointHistoryState,
  getCommonLabels,
} from '../PointsHistory.selectors';

describe('#pointsHistoryData selector', () => {
  it('#getPointHistoryState should return pointsHistoryDataReduer state', () => {
    const pointsHistoryDataState = fromJS({
      pointsHistoryData: [],
      isFetching: false,
    });
    const state = {
      pointHistoryReducer: pointsHistoryDataState,
    };

    expect(getPointHistoryState(state)).toEqual(
      pointsHistoryDataState.get('pointsHistoryData')
    );
  });


  it('#getCommonLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {
          common:{}
        },
      },
    };
    expect(getCommonLabels(state)).toMatchObject({});
  });
});
