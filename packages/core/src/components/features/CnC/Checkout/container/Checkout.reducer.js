import { fromJS } from 'immutable';
import CheckoutConstants from '../Checkout.constants';

const initialState = fromJS({
  values: {
    pickUpContact: {},
    pickUpAlternative: {},
    shipping: {},
    billing: {},
    giftWrap: {},
    smsInfo: {
      numberForUpdates: null,
      numberForMarketing: null,
    },
    selectedShippingPhoneNumber: '',
    giftCards: [],
    venmoData: {
      nonce: '',
      venmoClientTokenData: '',
      deviceData: '',
      supportedByBrowser: true,
    },
  },
  options: {
    shippingMethods: [],
    giftWrapOptions: [],
    paypalPaymentSettings: null,
    internationalUrl: null,
  },
  uiFlags: {
    stage: CheckoutConstants.CHECKOUT_STAGES.SHIPPING,
    stageChangeCount: 0,
    isGiftOptionsEnabled: true,
    isPLCCPaymentEnabled: false,
    maxGiftCards: 5,
    isPaypalPaymentInProgress: false,
    venmoPaymentInProgress: false,
    venmoInformationMessageDisplayed: false,
    isLoadingShippingMethods: false,
    isEditingSubform: false,
    isBillingVisited: false,
    isReviewVisited: false,
    alertMessage: null,
    paymentError: null,
    addressError: null,
  },
});

export default function CheckoutReducer(state = initialState, action) {
  let checkout = state;
  if (checkout instanceof Object) {
    checkout = fromJS(checkout);
  }
  // const orderValues = checkout.get('values');
  // const orderOptions = checkout.get('options');
  // const uiFlags = checkout.get('uiFlags');
  switch (action.type) {
    case 'CHECKOUT_VALUES_SET_PICKUP':
      return checkout.setIn(['values', 'pickUpContact'], action.pickUpContact);
    case 'CHECKOUT_VALUES_SET_PICKUP_ALT':
      return checkout.setIn(['values', 'pickUpAlternative'], action.pickUpAlternative);
    // case 'CHECKOUT_VALUES_SET_GIFTCARDS':
    //   return merge(orderValues, { giftCards: action.giftCards });
    case 'CHECKOUT_VALUES_SET_SHIPPING':
      return checkout.setIn(['values', 'shipping'], action.shipping);
    case 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP':
      return checkout.setIn(['options', 'giftWrapOptions'], action.giftWrapOptions);
    // case 'CHECKOUT_VALUES_SET_BILLING':
    //   return merge(orderValues, { billing: action.billing });
    // case 'CHECKOUT_VALUES_SET_SHIPPING_METHOD':
    //   return orderValues.setIn(['shipping', 'method'], action.method);
    // case 'CHECKOUT_VALUES_SET_GIFT_WRAP':
    //   return merge(orderValues, { giftWrap: action.giftWrap });
    case CheckoutConstants.CHECKOUT_VALUES_SET_SMS_UPDATES:
      return checkout.setIn(['values', 'smsInfo'], { numberForUpdates: action.phoneNumber });
    // case 'CHECKOUT_VALUES_SET_SMS_MARKETING':
    //   return orderValues.setIn(['smsInfo', 'numberForMarketing'], action.phoneNumber);
    // case 'CHECKOUT_VALUES_SET_SELECTED_SHIPPING_PHONE_NUMBER':
    //   return orderValues.set('selectedShippingPhoneNumber', action.payload);
    // case 'CHECKOUT_VALUES_SET_VENMO_DATA':
    //   return merge(orderValues, { venmoData: action.payload }, { deep: true });
    // case 'CHECKOUT_VALUES_SET_VENMO_CLIENT_TOKEN_DATA':
    //   return merge(
    //     orderValues,
    //     {
    //       venmoData: {
    //         venmoClientTokenData: action.payload,
    //       },
    //     },
    //
    //   );
    case CheckoutConstants.CHECKOUT_ORDER_OPTIONS_SET_SHIPPING:
      return checkout.setIn(['options', 'shippingMethods'], action.shippingMethods);
    // case 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP':
    //   return merge(orderOptions, { giftWrapOptions: action.giftWrapOptions });
    // case 'CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT':
    //   return merge(orderOptions, { paypalPaymentSettings: action.paypalPaymentSettings });
    // case 'CHECKOUT_ORDER_OPTIONS_SET_INTL_URL':
    //   return merge(orderOptions, { internationalUrl: action.internationalUrl });
    // case 'CHECKOUT_FLAGS_SET_STAGE':
    //   return merge(uiFlags, {
    //     stage: action.stage,
    //     stageChangeCount: uiFlags.stageChangeCount + 1,
    //   });
    // case 'CHECKOUT_FLAGS_SET_ALERT_MESSAGE':
    //   return merge(uiFlags, { alertMessage: action.message });
    // case 'CHECKOUT_FLAGS_SET_PAYPAL_IN_PROGRESS':
    //   return merge(uiFlags, { isPaypalPaymentInProgress: action.isPaypalPaymentInProgress });
    // case 'CHECKOUT_FLAGS_SET_IS_GIFT_OPTIONS_ENABLED':
    //   return merge(uiFlags, { isGiftOptionsEnabled: action.isGiftOptionsEnabled });
    // case 'CHECKOUT_FLAGS_SET_MAX_GIFTCARDS':
    //   return merge(uiFlags, { maxGiftCards: action.maxGiftCards });
    // case 'CHECKOUT_FLAGS_SET_PLCC_ENABLED':
    //   return merge(uiFlags, { isPLCCPaymentEnabled: action.isPLCCPaymentEnabled });
    case CheckoutConstants.CHECKOUT_FLAGS_SET_LOAD_METHODS:
      return checkout.setIn(['uiFlags', 'isLoadingShippingMethods'], action.isLoading);
    // case 'CHECKOUT_FLAGS_SET_EDITING_SUBFORM':
    //   return merge(uiFlags, { isEditingSubform: action.isEditingSubform });
    // case 'CHECKOUT_FLAGS_SET_LOAD_METHODS':
    //   return merge(uiFlags, { isLoadingShippingMethods: action.isLoading });
    case 'CHECKOUT_FLAGS_SET_EDITING_SUBFORM':
      return checkout.setIn(['uiFlags', 'isEditingSubform'], action.isEditingSubform);
    // case 'CHECKOUT_FLAGS_SET_BILLING_VISITED':
    //   return merge(uiFlags, { isBillingVisited: action.isBillingVisited });
    // case 'CHECKOUT_FLAGS_SET_REVIEW_VISTED':
    //   return merge(uiFlags, { isReviewVisited: action.payload });
    // case 'CHECKOUT_FLAGS_SET_PAYMENT_ERROR':
    //   return merge(uiFlags, { paymentError: action.paymentError });
    // case CheckoutConstants.CHECKOUT_FLAGS_SET_ADDRESS_ERROR:
    //   return checkout.setIn(['uiFlags', 'addressError'], action.addressError);
    //  case 'CHECKOUT_FLAGS_SET_VENMO_PAYMENT_IN_PROGRESS':
    //    return uiFlags.setIn(['venmoPaymentInProgress'], action.payload);
    // case 'CHECKOUT_FLAGS_SET_VENMO_INFO_MESG_DISPLAYED':
    //   return uiFlags.setIn(['venmoInformationMessageDisplayed'], action.payload);
    // case actionTypes.CHANGE: { // Listen in on redux-form change events and enjoy the pure function approach
    //    const { meta, payload } = action;
    //    const { form, field } = meta;
    //    if (form === 'checkoutBilling' && field === 'paymentMethod') {
    //      const result = payload === 'venmo';
    //      return uiFlags.setIn(['venmoPaymentInProgress'], result);
    //    }
    //    return uiFlags;
    //  }
    default:
      return checkout;
  }
}
