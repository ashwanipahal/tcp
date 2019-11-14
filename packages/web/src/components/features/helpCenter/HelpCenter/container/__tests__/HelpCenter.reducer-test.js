import { fromJS } from 'immutable';
import HelpCenterReducer from '../HelpCenter.reducer';
import HELPCENTER_CONSTANTS from '../../HelpCenter.constants';

describe('Help Center reducer', () => {
    it('should return empty subNavigationData as default state', () => {
      const mockResponse = {subNavigationData: []};
      expect(HelpCenterReducer(undefined, {})).toEqual(mockResponse);
    });
  
    it('should return subNavigationData array', () => {
      const initialState = fromJS({
        subNavigationData: [],
      });
      expect(
        HelpCenterReducer(initialState, {
          type: HELPCENTER_CONSTANTS.SET_SUBNAVIGATION_DATA,
        })
      ).toEqual(fromJS({ subNavigationData: [] }));
    });
  });
  