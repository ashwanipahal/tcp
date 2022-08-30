import POINTSHISTORY_CONSTANTS from '../../PointsHistory.constants';
import { getPointsHistoryList, setPointsHistoryList } from '../PointsHistory.actions';

describe('Points History actions', () => {
  it('getPointsHistoryList should return action type as GET_POINTSHISTORY_LIST', () => {
    expect(getPointsHistoryList().type).toBe(POINTSHISTORY_CONSTANTS.GET_POINTSHISTORY_LIST);
  });

  it('setPointsHistoryList should return action type as SET_POINTSHISTORY_LIST', () => {
    expect(setPointsHistoryList().type).toBe(POINTSHISTORY_CONSTANTS.SET_POINTSHISTORY_LIST);
  });
});
