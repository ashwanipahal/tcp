import { fromJS, List } from 'immutable';
import {
  getCardListState,
  getCardListFetchingState,
  getShowNotificationState,
  getCreditDebitCards,
  getGiftCards,
  getVenmoCards,
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
  it('#getCreditDebitCards should return creditDebitCards state', () => {
    const PaymentState = fromJS({
      cardList: List([
        {
          accountNo: '1111',
          ccType: 'COMPASSVISA',
        },
        {
          accountNo: '2222',
          ccType: 'VenmoCard',
        },
        {
          accountNo: '3333',
          ccType: 'GiftCard',
        },
      ]),
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getCreditDebitCards(state)).toEqual(
      List([
        {
          accountNo: '1111',
          ccType: 'COMPASSVISA',
        },
      ])
    );
  });
  it('#getGiftCards should return giftCards state', () => {
    const PaymentState = fromJS({
      cardList: List([
        {
          accountNo: '1111',
          ccType: 'COMPASSVISA',
        },
        {
          accountNo: '2222',
          ccType: 'VenmoCard',
        },
        {
          accountNo: '3333',
          ccType: 'GiftCard',
        },
      ]),
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getGiftCards(state)).toEqual(
      List([
        {
          accountNo: '3333',
          ccType: 'GiftCard',
        },
      ])
    );
  });
  it('#getVenmoCards should return venmoCards state', () => {
    const PaymentState = fromJS({
      cardList: List([
        {
          accountNo: '1111',
          ccType: 'COMPASSVISA',
        },
        {
          accountNo: '2222',
          ccType: 'VenmoCard',
        },
        {
          accountNo: '3333',
          ccType: 'GiftCard',
        },
      ]),
      isFetching: false,
      showNotification: null,
    });
    const state = {
      PaymentReducer: PaymentState,
    };
    expect(getVenmoCards(state)).toEqual(
      List([
        {
          accountNo: '2222',
          ccType: 'VenmoCard',
        },
      ])
    );
  });
});
