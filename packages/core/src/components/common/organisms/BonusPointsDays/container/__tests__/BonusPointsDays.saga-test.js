import { put, takeLatest } from 'redux-saga/effects';
import { validateReduxCache } from '../../../../../../utils/cache.util';
import { getBonusDaysData, BonusPointsSaga, fetchModuleX } from '../BonusPointsDays.saga';
import { setBonusDaysSuccess, setBonusDaysError, setModuleX } from '../BonusPointsDays.actions';
import BONUS_POINTS_DAYS_CONSTANTS from '../../BonusPointsDays.constants';

describe('BonusPointsDays saga', () => {
  describe('getBonusDaysData', () => {
    let bonusDaysGen;
    beforeEach(() => {
      bonusDaysGen = getBonusDaysData();
      bonusDaysGen.next();
      bonusDaysGen.next();
    });

    it('should dispatch setBonusDaysSuccess action for success resposnse', () => {
      const response = {
        body: {
          contact: [],
        },
      };
      const putDescriptor = bonusDaysGen.next(response).value;
      expect(putDescriptor).toEqual(put(setBonusDaysSuccess(response)));
    });

    it('should not dispatch setBonusDaysSuccess action for error', () => {
      const response = {
        error: 'Error in API',
      };
      const putDescriptor = bonusDaysGen.throw(response).value;
      expect(putDescriptor).toEqual(put(setBonusDaysError(response)));
    });
  });

  describe('BonusPointsDaysSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = BonusPointsSaga();
      const takeLatestDescriptor = generator.next().value;
      const cachedMethod = validateReduxCache(getBonusDaysData);
      const expected = takeLatest(BONUS_POINTS_DAYS_CONSTANTS.GET_BONUS_DAYS, cachedMethod);
      expect(takeLatestDescriptor.toString()).toMatch(expected.toString());
    });
  });
});

describe('Module X Saga', () => {
  let moduleXGen;
  const payload = '66b73859-0893-4abe-9d0d-dc3d58fa2782';
  beforeEach(() => {
    moduleXGen = fetchModuleX({ payload });
  });
  describe('fetchmoduleX', () => {
    it('should dispatch setmoduleX action for success response', () => {
      const response = moduleXGen.next().value;
      expect(moduleXGen.next(response).value).toEqual(put(setModuleX(response)));
    });
  });
});
