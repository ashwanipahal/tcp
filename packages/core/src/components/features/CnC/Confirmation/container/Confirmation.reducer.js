import { fromJS } from 'immutable';
import CONFIRMATION_CONSTANTS from '../Confirmation.constants';

const initialState = fromJS({
  orderConfirmation: {
    emailAddress: '',
    encryptedEmailAddress: '',
    createAccountSuccess: false,
    summary: {
      itemsTotal: 0,
      itemsCount: 0,
      savingsTotal: 0,
      taxTotal: 0,
      shippingTotal: 0,
      estimatedRewards: 0,
      subTotal: 0,
      grandTotal: 0,
      pointsToNextReward: 0,
      earnedReward: '',
      totalOrderSavings: 0,
    },

    orderDetails: {
      date: null,
      orderNumber: null,
      trackingLink: '',
    },

    rewardedPoints: 0,

    userDetails: {},
  },
  loading: true,
  aquiredCouponCode: [],
  venmoPaymentConfirmationDisplayed: false,
  updateOrderDetails: null,
});

const orderConfirmationNotificationReducer = (state, action) => {
  switch (action.type) {
    case CONFIRMATION_CONSTANTS.SET_LOADING_STATE:
      return state.set('isLoading', action.payload.isLoading);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SMS_NOTIFICATION:
      return state.setIn(['orderConfirmation', 'error'], null);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SMS_NOTIFICATION_ERR:
      return state.setIn(['orderConfirmation', 'error'], action.payload);
    case CONFIRMATION_CONSTANTS.RESET_CONFIRMATION_SMS_NOTIFICATION_ERR:
      return state.setIn(['orderConfirmation', 'error'], null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

const orderConfirmationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_CONFIRMATION:
      return state.set('orderConfirmation', action.orderConfirmation);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_VALUES_COUPONS_SET:
      return state.set('loading', false).set('aquiredCouponCode', action.couponsInfo);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_ORDER_PRODUCTS:
      return state.set('orderProducts', action.orderProducts);
    // case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_VENMO_PAYMENT_MESSAGE_DISPLAYED:
    //   return state.set('venmoPaymentConfirmationDisplayed', action.payload);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_REWARDS_POINTS:
      return state.setIn(['orderConfirmation', 'summary'], action.updatedSummary);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_UPDATE_ORDER_DETAILS:
      return state.set('updateOrderDetails', action.payload);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_CREATE_ACCOUNT_SUCCESS:
      return state.setIn(['orderConfirmation', 'createAccountSuccess'], action.payload);
    case CONFIRMATION_CONSTANTS.CONFIRMATION_SET_SMS_NOTIFICATION_SUCCESS:
      return state.setIn(['orderConfirmation', 'smsNotificationSuccess'], action.payload);
    default:
      return orderConfirmationNotificationReducer(state, action);
  }
};

export default orderConfirmationReducer;
