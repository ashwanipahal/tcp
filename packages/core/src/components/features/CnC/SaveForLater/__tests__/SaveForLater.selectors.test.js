import { getSflMaxCount, getSaveForLaterSwitch } from '../container/SaveForLater.selectors';

describe('#Save For Later Selectors', () => {
  const sessionState = {
    siteDetails: {
      SFL_MAX_COUNT: '200',
      IS_SAVE_FOR_LATER_ENABLED: true,
    },
  };
  const state = {
    session: sessionState,
  };

  it('#getSflMaxCount should return max count', () => {
    expect(getSflMaxCount(state)).toEqual(sessionState.siteDetails.SFL_MAX_COUNT);
  });
  it('#getCouponsTotal should return couponsTotal', () => {
    expect(getSaveForLaterSwitch(state)).toEqual(
      sessionState.siteDetails.IS_SAVE_FOR_LATER_ENABLED
    );
  });
});
