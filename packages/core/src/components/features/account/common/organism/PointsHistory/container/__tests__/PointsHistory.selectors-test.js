import { fromJS } from 'immutable';
import {
  getPointHistoryState,
  getCommonLabels,
  getPointHistoryRichTextSelector,
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

    expect(getPointHistoryState(state)).toEqual(pointsHistoryDataState.get('pointsHistoryData'));
  });

  it('#getCommonLabels should return all the account labels', () => {
    const state = {
      Labels: {
        account: {
          common: {},
        },
      },
    };
    expect(getCommonLabels(state)).toMatchObject({});
  });

  it('#getPointHistoryRichTextSelector should return Rich Text', () => {
    const historyData = fromJS({
      pointsHistoryRichText: '<h1>New Module X</h1><p>Module X content</p>',
    });
    const state = {
      pointHistoryReducer: historyData,
    };
    expect(getPointHistoryRichTextSelector(state)).toEqual(
      '<h1>New Module X</h1><p>Module X content</p>'
    );
  });
});
