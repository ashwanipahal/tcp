import { Map, fromJS } from 'immutable';
import { logout } from '@tcp/core/src/components/features/account/Logout/container/LogOut.actions';
import PaymentReducer from '../Payment.reducer';
import { setCardList } from '../Payment.actions';
import PAYMENT_CONSTANTS from '../../Payment.constants';

const payload = [{}];

describe('Payment Reducer', () => {
  it('should return empty cardList as default state', () => {
    expect(PaymentReducer(undefined, {}).get('cardList')).toBeNull();
  });

  it('should return cardList object for the cardList', () => {
    expect(PaymentReducer(undefined, setCardList(payload)).get('cardList').size).toBe(1);
  });

  it('should return cardList object for the cardList if state is passed as an array', () => {
    const state = PaymentReducer(fromJS({}), {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should return isFetching true', () => {
    const initialState = fromJS({
      isFetching: false,
    });
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SHOW_LOADER,
      })
    ).toEqual(fromJS({ isFetching: true }));
  });

  it('should return showNotification as error if error occurs', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      showNotification: null,
    });
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.GET_CARD_LIST_ERR,
        payload: err,
      })
    ).toEqual(fromJS({ showNotification: 'error', isFetching: false }));
  });
  it('should return showNotification as success if error occurs', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'error',
    });
    const initialState = fromJS({
      showNotification: null,
    });
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_SUCCESS,
        payload: err,
      })
    ).toEqual(fromJS({ showNotification: 'success' }));
  });
  it('should return showNotification as error if error occurs', () => {
    const err = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      showNotification: null,
    });
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_ERROR,
        payload: err,
      })
    ).toEqual(fromJS({ showNotification: 'error' }));
  });

  it('should return showNotificationCaptcha as error if error occurs', () => {
    const initialState = fromJS({
      showNotificationCaptcha: null,
      giftcardBalance: {},
    });
    const updatedState = initialState
      .set('showNotificationCaptcha', 'error')
      .deleteIn(['giftcardBalance', '1234']);
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SET_CHECK_BALANCE_ERROR,
        payload: {
          card: {
            accountNo: '1234',
          },
        },
      })
    ).toEqual(updatedState);
  });
  it('should return payment banner rich text', () => {
    const initialState = fromJS({});
    const updatedState = initialState.set('paymentBannerRichText', '<div></div>');
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SET_MODULEX_CONTENT,
        payload: {
          richText: '<div></div>',
        },
      })
    ).toEqual(updatedState);
  });

  it('should return state after clear the account check balance for given account no ', () => {
    const initialState = fromJS({
      giftcardBalance: { '1234': 100 },
    });

    const updatedState = initialState.deleteIn(['giftcardBalance', '1234']);
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.CLEAR_CARD_BALANCE,
        payload: {
          creditCardId: '123456',
          action: 'D',
          ccType: 'GiftCard',
          accountNo: '1234',
        },
      })
    ).toEqual(updatedState);
  });

  it('should return initial state in case of LOGOUT action', () => {
    const state = PaymentReducer(undefined, setCardList(payload));
    const loggedOutState = PaymentReducer(state, logout());
    expect(loggedOutState.get('cardList')).toBeNull();
  });
});
