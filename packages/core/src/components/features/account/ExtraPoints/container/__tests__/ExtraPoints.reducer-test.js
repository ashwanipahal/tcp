import { fromJS } from 'immutable';
import ExtraPointsReducer from '../ExtraPoints.reducer';

import EXTRA_POINTS_CONSTANTS from '../../ExtraPoints.constants';

describe('ExtraPointsReducer', () => {
  it('should return promo list content  data', () => {
    const promoList = fromJS({ promoListDetails: [{ class: null, headline: [] }] });

    const initialState = fromJS({
      promoListDetails: null,
    });
    expect(
      ExtraPointsReducer(initialState, {
        type: EXTRA_POINTS_CONSTANTS.SET_MODULEX_CONTENT,
        payload: promoList,
      })
    ).toEqual(
      fromJS({
        promoListDetails: promoList,
      })
    );
  });
  it('should return default content  data', () => {
    const initialState = fromJS({
      promoListDetails: null,
    });
    expect(
      ExtraPointsReducer(initialState, {
        type: 'default',
        payload: null,
      })
    ).toEqual(
      fromJS({
        promoListDetails: null,
      })
    );
  });
});
