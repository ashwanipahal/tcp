import { fromJS } from 'immutable';
import BONUS_POINTS_DAYS_CONSTANTS from '../../BonusPointsDays.constants';
import BonusPointsDaysReducer from '../BonusPointsDays.reducer';
import { setBonusDaysSuccess } from '../BonusPointsDays.actions';

describe('BonusPointsDaysReducer', () => {
  it('should return isFetching true', () => {
    const initialState = fromJS({
      isFetching: false,
    });
    expect(
      BonusPointsDaysReducer(initialState, {
        type: BONUS_POINTS_DAYS_CONSTANTS.SHOW_LOADER,
      })
    ).toEqual(fromJS({ isFetching: true }));
  });
  it('should return bonusPointsDays data', () => {
    const payload = fromJS({
      appliedToBagBonusPointDays: 0,
      availableBonusPointDays: 1,
      bonusDayAvailableToday: 0,
      customerTier: 1,
      isBlackOutDay: false,
      totalBonusPointDays: 1,
      usedBonusPointDates: [],
      usedBonusPointDays: 0,
    });
    expect(
      BonusPointsDaysReducer(undefined, setBonusDaysSuccess(payload))
        .get('bonusDaysData')
        .isEmpty()
    ).toBe(false);
  });
  it('should return error object', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      isFetching: false,
      error: null,
    });
    expect(
      BonusPointsDaysReducer(initialState, {
        type: BONUS_POINTS_DAYS_CONSTANTS.SET_BONUS_DAYS_ERROR,
        payload: err,
      })
    ).toEqual(fromJS({ isFetching: false, error: err }));
  });
  it('should return module x content data', () => {
    const richText = '<p>Hello</p>';
    const initialState = fromJS({
      bonusPointsDetails: null,
    });
    expect(
      BonusPointsDaysReducer(initialState, {
        type: BONUS_POINTS_DAYS_CONSTANTS.SET_MODULEX_CONTENT,
        payload: { richText },
      })
    ).toEqual(
      fromJS({
        bonusPointsDetails: richText,
      })
    );
  });
});
