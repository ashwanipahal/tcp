import { fromJS } from 'immutable';
import { getCollectorNumber, getOfferCode } from '../AirmilesBanner.selector';

describe('#AirmilesBannerselector', () => {
  const AirmilesBannerState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });

  const state = {
    CartPageReducer: AirmilesBannerState,
  };

  it('#AirmilesBanner should return AirmilesBanner  state', () => {
    expect(getCollectorNumber(state)).toEqual(
      AirmilesBannerState.getIn(['userDetails', 'collectorNumber']) || 0
    );
  });

  it('#AirmilesBanner should return AirmilesBanner state', () => {
    expect(getOfferCode(state)).toEqual(
      AirmilesBannerState.getIn(['userDetails', 'promoOffer']) || 0
    );
  });
});
