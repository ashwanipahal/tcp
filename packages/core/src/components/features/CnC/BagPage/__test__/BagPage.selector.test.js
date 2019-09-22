import { fromJS } from 'immutable';
import BAGPAGE_SELECTORS from '../container/BagPage.selectors';

describe('#Added to bag Selectors', () => {
  const BagPageState = {
    checkout: {
      bagPage: {
        lbl_header_bag: 'bagHeading',
        lbl_emptyBag_loggedInMsg: 'loggedInMsg',
        lbl_emptyBag_notLoggedInMsg: 'guestUserMsg',
        lbl_emptyBag_loginIn: 'login',
        lbl_emptyBag_shopNow: 'shopNow',
        lbl_emptyBag_inspirationTagLine: 'tagLine',
        lbl_emptyBag_helperMsg: 'helperMsg',
        lbl_sfl_myBagButton: 'myBagButton',
        lbl_sfl_savedForLater: 'savedForLaterText',
        lbl_sfl_savedLaterButton: 'savedLaterButton',
      },
    },
    global: {
      addedToBagModal: { lbl_header_addedToBag: 'AddedToBag', lbl_cta_checkout: 'Checkout' },
      checkoutConfirmation: {},
    },
  };
  const CartPageReducer = fromJS({
    orderDetails: {
      totalItems: 0,
      orderItems: [],
    },
    sfl: [],
    openItemDeleteConfirmationModalInfo: true,
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
      guestUserMsg: 'guestUserMsg',
      helperMsg: 'helperMsg',
      loggedInMsg: 'loggedInMsg',
      login: 'login',
      shopNow: 'shopNow',
      tagLine: 'tagLine',
      myBagButton: 'myBagButton',
      savedForLaterText: 'savedForLaterText',
      savedLaterButton: 'savedLaterButton',
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
    expect(BAGPAGE_SELECTORS.getConfirmationModalFlag(state)).toEqual({
      isEditingItem: undefined,
      showModal: undefined,
    });
  });
  it('#getCurrentOrderId', () => {
    expect(BAGPAGE_SELECTORS.getCurrentOrderId(state)).toEqual(0);
  });
  it('#getsflItemsList', () => {
    expect(BAGPAGE_SELECTORS.getsflItemsList(state)).toEqual(fromJS([]));
  });

  it('#checkoutIfItemIsUnqualified', () => {
    expect(BAGPAGE_SELECTORS.checkoutIfItemIsUnqualified(state, 123)).toEqual(false);
  });
  it('#getCurrentDeleteSelectedItemInfo', () => {
    expect(BAGPAGE_SELECTORS.getCurrentDeleteSelectedItemInfo(state)).toEqual(true);
  });
  it('#itemDeleteModalLabels', () => {
    expect(BAGPAGE_SELECTORS.itemDeleteModalLabels(state)).toEqual({
      modalButtonConfirmDelete: 'lbl_itemDelete_modalButtonConfirmDelete',
      modalButtonSFL: 'lbl_itemDelete_modalButtonSFL',
      modalHeading: 'lbl_itemDelete_modalHeading',
      modalTitle: 'lbl_itemDelete_modalTitle',
    });
  });
});
