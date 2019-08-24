import { fromJS } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BagPageReducer from '../container/BagPage.reducer';

describe('BagPage Reducer', () => {
  const initialState = {
    orderDetails: { orderItems: [] },
    errors: false,
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
});
