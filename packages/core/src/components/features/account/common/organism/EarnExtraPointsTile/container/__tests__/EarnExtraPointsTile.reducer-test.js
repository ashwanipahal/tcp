import { Map, fromJS } from 'immutable';
import EarnExtraPointsReducer from '../EarnExtraPointsTile.reducer';
import EARNEXTRAPOINTS_CONSTANTS from '../../EarnExtraPointsTile.constants';

describe('Account Navigation reducer', () => {
  it('should return empty Account Navigation as default state', () => {
    expect(EarnExtraPointsReducer(undefined, {}).get('earnExtraPointsData')).toBeNull();
  });

  it('should return List object for the earnExtraPointsData if state is passed as an array', () => {
    const state = EarnExtraPointsReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should handle default earn Extra Points Data', () => {
    const payload = [
      {
        activityCode: 'AppDownload',
        activityTitle: 'Earn 5 Points',
        description: 'Download & Log in to our App',
        displayOrder: 1,
        iconImage: '/wcsstore/static/images/download-app.jpg',
      },
    ];
    const initialState = fromJS({
      earnExtraPointsData: null,
    });
    const updatedState = EarnExtraPointsReducer(initialState, {
      type: EARNEXTRAPOINTS_CONSTANTS.SET_EARNEXTRAPOINTS_LIST,
      payload,
    });
    expect(updatedState.get('earnExtraPointsData')).toEqual(payload);
  });
});
