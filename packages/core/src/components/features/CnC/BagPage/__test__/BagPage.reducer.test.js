import { fromJS } from 'immutable';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BagPageReducer from '../container/BagPage.reducer';

describe('BagPage Reducer', () => {
  const initialState = {
    orderDetails: {},
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
});
