import { fromJS, List } from 'immutable';
import PAYMENT_CONSTANTS from '../Payment.constants';
import { DEFAULT_REDUCER_KEY, setCacheTTL } from '../../../../../utils/cache.util';

const initialState = fromJS({
  [DEFAULT_REDUCER_KEY]: null,
  cardList: null,
  isFetching: false,
  showNotification: null,
  showNotificationCaptcha: null,
  showUpdatedNotificationOnModal: null,
  giftcardBalance: {},
});

const updateCardList = (state, action) => {
  let updatedCardList = state.get('cardList');
  updatedCardList = updatedCardList.filter(item => {
    return item.creditCardId.toString() !== action.payload.creditCardId;
  });
  return updatedCardList;
};

const returnPaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CONSTANTS.SHOW_LOADER:
      return state.set('isFetching', true);
    case PAYMENT_CONSTANTS.DELETE_MODAL_MOUNT_STATE:
      return state
        .set('deleteModalMountedState', action.payload.state)
        .set('showUpdatedNotificationOnModal', null);
    case PAYMENT_CONSTANTS.UPDATE_CARD_LIST_ON_DELETE:
      return state
        .set('cardList', updateCardList(state, action))
        .set('showNotification', 'success');
    case PAYMENT_CONSTANTS.UPDATE_CARD_LIST_ON_DELETE_ERR:
      return state
        .set('error', action.payload)
        .set('showUpdatedNotification', null)
        .set('showUpdatedNotificationOnModal', 'error');
    case PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_SUCCESS:
      return state.set('showNotification', 'success');
    case PAYMENT_CONSTANTS.SET_DEFAULT_PAYMENT_ERROR:
      return state.set('showNotification', 'error');
    case PAYMENT_CONSTANTS.SET_PAYMENT_NOTIFICATION:
      return state.set('showNotification', action.payload.status);
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};
const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CONSTANTS.SET_CARD_LIST:
      return state
        .set(DEFAULT_REDUCER_KEY, setCacheTTL(PAYMENT_CONSTANTS.GET_CARD_LIST_TTL))
        .set('cardList', List(action.payload))
        .set('isFetching', false);
    case PAYMENT_CONSTANTS.GET_CARD_LIST_ERR:
      return state.set('showNotification', 'error').set('isFetching', false);
    case PAYMENT_CONSTANTS.CHECK_BALANCE:
      return state.setIn(['giftcardBalance', action.payload.card.accountNo], null);
    case PAYMENT_CONSTANTS.SET_CHECK_BALANCE:
      return state.setIn(
        ['giftcardBalance', action.payload.giftCardNbr],
        action.payload.giftCardAuthorizedAmt
      );
    case PAYMENT_CONSTANTS.SET_CHECK_BALANCE_ERROR:
      return state
        .set('showNotificationCaptcha', 'error')
        .deleteIn(['giftcardBalance', action.payload.card.accountNo]);
    case PAYMENT_CONSTANTS.ADD_GIFT_CARD_SUCCESS:
      return state.set('showNotification', 'success');
    case PAYMENT_CONSTANTS.CLEAR_CARD_LIST_TTL:
      return state.set(DEFAULT_REDUCER_KEY, null);
    case PAYMENT_CONSTANTS.SET_RICH_TEXT:
      return state.set('paymentBannerRichText', action.payload);
    default:
      return returnPaymentReducer(state, action);
  }
};

export default PaymentReducer;
