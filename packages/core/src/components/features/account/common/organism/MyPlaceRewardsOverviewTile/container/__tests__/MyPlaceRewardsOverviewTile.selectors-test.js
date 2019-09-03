import { getBrierleySwitch } from '../MyPlaceRewardsOverviewTile.selectors';

describe('MyPlaceRewardsOVerviewTile selector', () => {
  it('should return isBrierleyEnabled from session state', () => {
    const state = {
      session: {
        siteDetails: {
          isBrierleyEnabled: false,
        },
      },
    };
    expect(getBrierleySwitch(state)).toBeFalsy();
  });

  it('should return isBrierleyEnabled as true if not available in session', () => {
    const state = {
      session: {
        siteDetails: {},
      },
    };
    expect(getBrierleySwitch(state)).toBeTruthy();
  });
});
