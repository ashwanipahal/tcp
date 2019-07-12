import { fromJS, List } from 'immutable';
import PAYMENT_CONSTANTS from '../Payment.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  cardList: null,
  isFetching: false,
  showNotification: null,
});

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case PAYMENT_CONSTANTS.SET_CARD_LIST:
      return state
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(PAYMENT_CONSTANTS.GET_CARD_LIST_TTL))
        .set('cardList', List(action.payload))
        .set('isFetching', false);
    case PAYMENT_CONSTANTS.GET_CARD_LIST_ERR:
      return state.set('showNotification', 'error').set('isFetching', false);
    case PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_SUCCESS:
      return state.set('showNotification', 'success');
    case PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_ERROR:
      return state.set('showNotification', 'error');
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default PaymentReducer;
