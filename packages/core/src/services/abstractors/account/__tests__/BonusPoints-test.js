import { getBonusPointsData, getMassagedBonusData } from '../BonusPoints';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#getBonusPointsData', () => {
  it('Should get bonus points days data', () => {
    const result = {
      body: {
        totalBonusPointDays: 2,
        availableBonusPointDays: 1,
        usedBonusPointDays: 1,
        appliedToBagBonusPointDays: 0,
        isBlackOutDay: false,
        bonusDayAvailableToday: 0,
        usedBonusPointDates: ['15/7'],
      },
    };
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getBonusPointsData().then(data => {
      expect(getMassagedBonusData(data.body)).toMatchObject(result.body);
    });
  });
  it('Should return error', () => {
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.resolve(result));
    getBonusPointsData().then(data => {
      expect(getMassagedBonusData(data.body)).toMatchObject(result.body);
    });
  });

  it('Should throw errors in case of server side error', () => {
    // TO DO - Add appropirate server side messages for Test
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));
    getBonusPointsData().then(data => {
      expect(data).toEqual('res body is null');
    });
  });
});
