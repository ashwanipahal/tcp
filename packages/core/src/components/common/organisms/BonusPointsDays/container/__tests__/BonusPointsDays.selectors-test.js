import { fromJS } from 'immutable';

import {
  getLabels,
  getBonusData,
  getIsFetching,
  getError,
  getBonusDetailsContentId,
  getBonusDetailsData,
  getBonusPointsSwitch,
} from '../BonusPointsDays.selectors';

describe('#BonusPointsDays Selectors', () => {
  it('#getLabels should return labels', () => {
    const state = {
      Labels: {},
    };
    expect(getLabels(state)).toEqual(state.Labels);
  });
  it('#getBonusData should return bonus data ', () => {
    const BonusPointsDaysState = fromJS({
      bonusDaysData: {
        appliedToBagBonusPointDays: 0,
        availableBonusPointDays: 1,
        bonusDayAvailableToday: 0,
        customerTier: 1,
        isBlackOutDay: false,
        totalBonusPointDays: 1,
        usedBonusPointDates: [],
        usedBonusPointDays: 0,
      },
    });
    const state = {
      BonusPointsDaysReducer: BonusPointsDaysState,
    };
    expect(getBonusData(state)).toEqual(BonusPointsDaysState.get('bonusDaysData'));
  });
  it('#getIsFetching should return isFetching', () => {
    const BonusPointsDaysState = fromJS({
      isFetching: false,
    });
    const state = {
      BonusPointsDaysReducer: BonusPointsDaysState,
    };
    expect(getIsFetching(state)).toEqual(BonusPointsDaysState.get('isFetching'));
  });

  it('#getBonusPointsSwitch should return isFetching', () => {
    const sessionState = {
      siteDetails: {
        isBonusPointsEnabled: true,
      },
    };
    const state = {
      session: sessionState,
    };
    expect(getBonusPointsSwitch(state)).toEqual(sessionState.siteDetails.isBonusPointsEnabled);
  });
  it('#getError should return error', () => {
    const BonusPointsDaysState = fromJS({
      error: {},
    });
    const state = {
      BonusPointsDaysReducer: BonusPointsDaysState,
    };
    expect(getError(state)).toEqual(BonusPointsDaysState.get('error'));
  });
  it('#getBonusDetailsContentIdSelector should return content ID', () => {
    const state = {
      Labels: {
        account: {
          myPlaceRewards: {
            referred: [
              {
                name: 'Bonus Points Days Details',
                contentId: '66b73859-0893-4abe-9d0d-dc3d58fa2782',
              },
            ],
          },
        },
      },
    };
    expect(getBonusDetailsContentId(state)).toEqual('66b73859-0893-4abe-9d0d-dc3d58fa2782');
  });
  it('#getBonusDetailsDataSelector should return Rich Text', () => {
    const bonusDetailsData = fromJS({
      bonusPointsDetails: '<h1>New Module X</h1><p>Module X content</p>',
    });
    const state = {
      BonusPointsDaysReducer: bonusDetailsData,
    };
    expect(getBonusDetailsData(state)).toEqual('<h1>New Module X</h1><p>Module X content</p>');
  });
});
