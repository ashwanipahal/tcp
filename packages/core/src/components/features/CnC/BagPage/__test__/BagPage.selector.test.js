import { fromJS } from 'immutable';
import BAGPAGE_SELECTORS from '../container/BagPage.selectors';

describe('#Added to bag Selectors', () => {
  const BagPageState = {
    bag: {
      addedToBag: { lbl_header_addedToBag: 'AddedToBag', lbl_cta_checkout: 'Checkout' },
      bagOverview: { lbl_header_bag: 'bagHeading' },
    },
    global: { checkoutConfirmation: {} },
  };
  const CartPageReducer = fromJS({
    orderDetails: {
      totalItems: 0,
      orderItems: [],
    },
  });

  const state = {
    Labels: BagPageState,
    CartPageReducer,
  };

  it('#getAddedToBagData should return itemInfo', () => {
    expect(BAGPAGE_SELECTORS.getBagPageLabels(state)).toEqual({
      addedToBag: 'AddedToBag',
      bagHeading: 'bagHeading',
      checkout: 'Checkout',
    });
  });

  it('#getTotalItems', () => {
    expect(BAGPAGE_SELECTORS.getTotalItems(state)).toEqual(0);
  });

  it('#getOrderItems', () => {
    expect(BAGPAGE_SELECTORS.getOrderItems(state)).toEqual(fromJS([]));
  });

  it('#getUnqualifiedItemsIds', () => {
    expect(BAGPAGE_SELECTORS.getUnqualifiedItemsIds(state)).toEqual(fromJS([]));
  });
  it('#getUnavailableCount', () => {
    expect(BAGPAGE_SELECTORS.getUnavailableCount(state)).toEqual(0);
  });

  it('#getUnqualifiedCount', () => {
    expect(BAGPAGE_SELECTORS.getUnqualifiedCount(state)).toEqual(0);
  });

  it('#getNeedHelpContentId', () => {
    expect(BAGPAGE_SELECTORS.getNeedHelpContentId(state)).toEqual(undefined);
  });

  it('#getConfirmationModalFlag', () => {
    expect(BAGPAGE_SELECTORS.getConfirmationModalFlag(state)).toEqual(undefined);
  });
});
