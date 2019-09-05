import { fromJS } from 'immutable';
import {
  getLabelsMiniBag,
  getTotalItemCount,
  getIsCartItemsUpdating,
} from '../container/MiniBag.selectors';

describe('#MiniBag Selectors', () => {
  const MinibagLabelsState = {
    global: {
      minibag: {
        lbl_miniBag_createAccount: 'createAccount',
        lbl_miniBag_logIn: 'logIn',
      },
      addedToBagModal: { lbl_footer_continueShopping: 'continueShopping' },
    },
  };

  const CartPageState = fromJS({
    orderDetails: {
      pointsToNextReward: '2',
      estimatedRewards: '3',
      totalItems: '5',
      grandTotal: '100',
      giftCardsTotal: '6',
      orderItems: [
        {
          itemInfo: {
            itemId: 12345,
            quantity: '3',
          },
        },
      ],
    },
    uiFlags: {
      isCartItemsUpdating: true,
    },
  });

  const state = {
    Labels: MinibagLabelsState,
    CartPageReducer: CartPageState,
  };

  it('#mini bag should return labels', () => {
    expect(getLabelsMiniBag(state)).toEqual({
      createAccount: 'createAccount',
      logIn: 'logIn',
      checkOut: undefined,
      continueShopping: 'continueShopping',
      createOne: undefined,
      dontHaveAccount: undefined,
      hi: undefined,
      inRewards: undefined,
      itemDeleted: undefined,
      itemUpdated: undefined,
      points: undefined,
      subTotal: undefined,
      viewBag: undefined,
      viewSaveForLater: undefined,
      yourShoppingBag: undefined,
    });
  });

  it('#getTotalItemCount', () => {
    expect(getTotalItemCount(state)).toEqual('5');
  });

  it('#getIsCartItemsUpdating', () => {
    expect(getIsCartItemsUpdating(state)).toEqual(true);
  });
});
