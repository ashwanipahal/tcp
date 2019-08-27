import { fromJS } from 'immutable';
import { getCollectorNumber, getOfferCode, getCartOrderDetails } from '../AirmilesBanner.selector';

describe('#AirmilesBannerselector', () => {
  const AirmilesBannerState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });
  const CartState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });
  const state = {
    User: AirmilesBannerState,
    CartPageReducer: CartState,
  };

  it('#AirmilesBanner should return AirmilesBanner  accountNumber', () => {
    expect(getCollectorNumber(state)).toEqual(
      AirmilesBannerState.getIn(['airmiles', 'accountNumber']) || 0
    );
  });

  it('#AirmilesBanner should return AirmilesBanner promoOffer', () => {
    expect(getOfferCode(state)).toEqual(AirmilesBannerState.getIn(['airmiles', 'promoOffer']) || 0);
  });
  it('#AirmilesBanner should return AirmilesBanner  orderDetails', () => {
    expect(getCartOrderDetails(state)).toEqual(CartState.get('orderDetails'));
  });
});
