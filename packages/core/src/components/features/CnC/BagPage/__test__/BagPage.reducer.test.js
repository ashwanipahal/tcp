import { fromJS } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BagPageReducer from '../container/BagPage.reducer';

describe('BagPage Reducer', () => {
  const initialState = {
    orderDetails: { orderItems: [], orderId: '1234' },
    sfl: fromJS([]),
    errors: false,
    uiFlags: {
      isItemMovedToSflList: false,
      isSflItemDeleted: false,
      cartItemSflError: null,
      isCartItemsUpdating: fromJS({}),
    },
    openItemDeleteConfirmationModalInfo: { showModal: false },
  };
  const initialStateMutated = fromJS(initialState);

  const getOrderDetailAction = {
    type: BAGPAGE_CONSTANTS.GET_ORDER_DETAILS_COMPLETE,
    payload: {
      orderDetails: {
        orderItems: [1],
      },
    },
  };

  const setBagPageErrors = {
    type: BAGPAGE_CONSTANTS.SET_BAG_PAGE_ERRORS,
    payload: {
      error: {
        errorMessage: [1],
      },
    },
  };

  it('GET_ORDER_DETAILS_COMPLETE', () => {
    const newState = BagPageReducer(initialStateMutated, {
      ...getOrderDetailAction,
    });

    expect(newState.get('orderDetails').length).toEqual(getOrderDetailAction.payload.length);
  });

  it('GET_ORDER_DETAILS_COMPLETE', () => {
    const newState = BagPageReducer(initialStateMutated, {
      ...setBagPageErrors,
    });

    expect(newState.get('orderDetails').length).toEqual(setBagPageErrors.payload.length);
  });

  it('GET_ORDER_DETAILS_COMPLETE', () => {
    const newState = BagPageReducer(initialState, {});

    expect(newState).toEqual(initialStateMutated);
  });

  it('CLOSE_CHECKOUT_CONFIRMATION_MODAL', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.CLOSE_CHECKOUT_CONFIRMATION_MODAL,
    });

    expect(newState.get('showConfirmationModal')).toEqual(false);
  });

  it('OPEN_CHECKOUT_CONFIRMATION_MODAL', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.OPEN_CHECKOUT_CONFIRMATION_MODAL,
    });

    expect(newState.get('showConfirmationModal')).toEqual(true);
  });

  it('SET_MODULEX_CONTENT', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.SET_MODULEX_CONTENT,
      payload: [],
    });

    expect(newState.get('moduleXContent')).toEqual(fromJS([]));
  });

  it('SET_ITEM_OOS', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.SET_ITEM_OOS,
      payload: '123',
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('CART_ITEMS_SET_SFL', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL,
      payload: false,
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('CART_ITEMS_SET_SFL_ERROR', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_SFL_ERROR,
      payload: null,
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('SET_SFL_DATA', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.SET_SFL_DATA,
      payload: fromJS([]),
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('CART_ITEMS_SET_UPDATING', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.CART_ITEMS_SET_UPDATING,
      payload: fromJS({}),
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('OPEN_ITEM_DELETE_CONFIRMATION_MODAL', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.OPEN_ITEM_DELETE_CONFIRMATION_MODAL,
      payload: { itemId: 123 },
    });

    expect(newState).toEqual(
      initialStateMutated.set('openItemDeleteConfirmationModalInfo', {
        showModal: true,
        itemId: 123,
      })
    );
  });

  it('CLOSE_ITEM_DELETE_CONFIRMATION_MODAL', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.CLOSE_ITEM_DELETE_CONFIRMATION_MODAL,
    });

    expect(newState).toEqual(
      initialStateMutated.set('openItemDeleteConfirmationModalInfo', {
        showModal: false,
      })
    );
  });

  it('CART_SUMMARY_SET_ORDER_ID', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: 'CART_SUMMARY_SET_ORDER_ID',
      orderId: '1234',
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('SFL_ITEMS_SET_DELETED', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: BAGPAGE_CONSTANTS.SFL_ITEMS_SET_DELETED,
      payload: false,
    });

    expect(newState).toEqual(initialStateMutated);
  });

  it('PAYPAL_WEBVIEW_ENABLE', () => {
    const newState = BagPageReducer(initialStateMutated, {
      type: 'PAYPAL_WEBVIEW_ENABLE',
      isPayPalWebViewEnable: false,
    });

    expect(newState).toEqual(initialStateMutated);
  });
});
