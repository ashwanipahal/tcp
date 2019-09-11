import { fromJS } from 'immutable';
import { getFormCatEntryId, getCartOrderDetails } from '../GiftServices.selector';

describe('#GiftServices', () => {
  const GiftServicesState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });
  const CartState = fromJS({
    error: null,
    onAddAirmilesBanner: false,
  });
  const state = {
    Checkout: GiftServicesState,
    CartPageReducer: CartState,
  };

  it('#GiftServices should return GiftServices catEntryId', () => {
    expect(getFormCatEntryId(state)).toEqual(
      GiftServicesState.getIn(['options', 'giftWrapOptions', 'text', 'catEntryId']) || ''
    );
  });
  it('#GiftServices should return GiftServices  orderDetails', () => {
    expect(getCartOrderDetails(state)).toEqual(CartState.get('orderDetails'));
  });
});
