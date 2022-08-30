import POINTSHISTORY_CONSTANTS from '../../EarnExtraPointsTile.constants';
import { getEarnExtraPointsList, setEarnExtraPointsList } from '../EarnExtraPointsTile.actions';

describe(' Earn Extra Points actions', () => {
  it('getEarnExtraPointsList should return action type as GET_EARNEXTRAPOINTS_LIST', () => {
    expect(getEarnExtraPointsList().type).toBe(POINTSHISTORY_CONSTANTS.GET_EARNEXTRAPOINTS_LIST);
  });

  it('setEarnExtraPointsList should return action type as SET_EARNEXTRAPOINTS_LIST', () => {
    expect(setEarnExtraPointsList().type).toBe(POINTSHISTORY_CONSTANTS.SET_EARNEXTRAPOINTS_LIST);
  });
});
