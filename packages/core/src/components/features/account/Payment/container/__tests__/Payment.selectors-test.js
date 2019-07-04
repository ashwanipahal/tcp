import { fromJS } from 'immutable';
import {
  getCardListState,
  getCardListFetchingState,
  getShowNotificationState,
} from '../Payment.selectors';

describe('#Payment Selectors', () => {
  it('#getCardListState should return card list', () => {
    const PaymentState = fromJS({
      cardList: [],
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getCardListState(state)).toEqual(PaymentState.get('cardList'));
  });
  it('#getCardListFetchingState should return fetching state', () => {
    const PaymentState = fromJS({
      cardList: [],
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getCardListFetchingState(state)).toEqual(PaymentState.get('isFetching'));
  });
  it('#getShowNotificationState should return showNotification state', () => {
    const PaymentState = fromJS({
      cardList: [],
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getShowNotificationState(state)).toEqual(PaymentState.get('showNotification'));
  });
});
