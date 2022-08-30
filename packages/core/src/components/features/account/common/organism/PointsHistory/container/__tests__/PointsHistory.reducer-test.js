import { Map, fromJS } from 'immutable';
import PointsHistoryReducer from '../PointsHistory.reducer';
import POINTSHISTORY_CONSTANTS from '../../PointsHistory.constants';

describe('Point History reducer', () => {
  it('should return empty Point History as default state', () => {
    expect(PointsHistoryReducer(undefined, {}).get('pointsHistoryData')).toBeNull();
  });

  it('should return List object for the pointsHistoryData if state is passed as an array', () => {
    const state = PointsHistoryReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should handle default Points History', () => {
    const payload = [
      {
        pointsEarned: 5,
        transactionTypeName: 'AddBirthDate',
        transactionDate: '08/08/19',
        transactionType: 'non-transactional',
        pointAwardedDate: '08/08/19',
        pointTransactionType: 'Credit',
      },
    ];
    const initialState = fromJS({
      pointsHistoryData: null,
    });
    const updatedState = PointsHistoryReducer(initialState, {
      type: POINTSHISTORY_CONSTANTS.SET_POINTSHISTORY_LIST,
      payload,
    });
    expect(updatedState.get('pointsHistoryData')).toEqual(payload);
  });

  it('should return point history rich text', () => {
    const initialState = fromJS({});
    const updatedState = initialState.set('pointsHistoryRichText', '<div></div>');
    expect(
      PointsHistoryReducer(initialState, {
        type: POINTSHISTORY_CONSTANTS.SET_MODULEX_CONTENT,
        payload: {
          richText: '<div></div>',
        },
      })
    ).toEqual(updatedState);
  });
});
