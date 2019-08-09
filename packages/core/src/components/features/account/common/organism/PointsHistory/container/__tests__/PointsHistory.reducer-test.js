import { Map, fromJS } from 'immutable';
import PointsHistoryReducer from '../PointsHistory.reducer';
import ACCOUNT_CONSTANTS from '../../PointsHistory.constants';


describe('Account Navigation reducer', () => {
  it('should return empty Account Navigation as default state', () => {
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
          transactionTypeName: "AddBirthDate",
          transactionDate: "08/08/19",
          transactionType: "non-transactional",
          pointAwardedDate: "08/08/19",
          pointTransactionType: "Credit"
        },
        {
          pointsEarned: 5,
          transactionTypeName: "AddMailingAddress",
          transactionDate: "08/08/19",
          transactionType: "non-transactional",
          pointAwardedDate: "08/08/19",
          pointTransactionType: "Credit"
        }];

    const pointsHistoryData = payload;

    const initialState = fromJS({
      payload,
    });

    expect(
      PointsHistoryReducer(initialState, {
        type: ACCOUNT_CONSTANTS.SET_POINTSHISTORY_LIST,
        payload,
      })
    ).toEqual(
      fromJS({
        pointsHistoryData,
      })
    );
  });




});
