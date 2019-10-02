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
        lbl_miniBag_checkout: 'checkout',
        lbl_miniBag_createOne: 'createOne',
        lbl_miniBag_dontHaveAccount: '',
        lbl_miniBag_hi: '',
        lbl_miniBag_inRewards: '',
        lbl_minibag_itemDeleted: '',
        lbl_minibag_itemUpdated: '',
        lbl_miniBag_subTotal: '',
        lbl_miniBag_viewBag: '',
        lbl_miniBag_ViewSaveForLater: '',
        lbl_miniBag_yourShoppingBag: '',
      },
      cartItemTile: {
        lbl_cartTile_points: '',
      },
      addedToBagModal: { lbl_footer_continueShopping: 'continueShopping' },
    },
    checkout: {
      bagPage: {
        lbl_sfl_viewsfl: '',
        bl_sfl_actionSuccess: '',
        lbl_sfl_success_tickIcon: '',
      },
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
      checkOut: 'checkout',
      continueShopping: 'continueShopping',
      createOne: 'createOne',
      dontHaveAccount: '',
      hi: '',
      inRewards: '',
      itemDeleted: '',
      itemUpdated: '',
      points: '',
      subTotal: '',
      viewBag: '',
      viewSaveForLater: '',
      yourShoppingBag: '',
      viewSfl: '',
      sflSuccess: '',
      tickIcon: '',
    });
  });

  it('#getTotalItemCount', () => {
    expect(getTotalItemCount(state)).toEqual('5');
  });

  it('#getIsCartItemsUpdating', () => {
    expect(getIsCartItemsUpdating(state)).toEqual(true);
  });
});
