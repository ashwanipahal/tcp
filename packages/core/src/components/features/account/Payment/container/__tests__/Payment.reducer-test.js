import { Map, fromJS } from 'immutable';
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
    const state = PaymentReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });

  it('should return isFetching true', () => {
    const initialState = fromJS({
      isFetching: false,
    });
    expect(
      PaymentReducer(initialState, {
        type: PAYMENT_CONSTANTS.SET_LOADER,
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
});
