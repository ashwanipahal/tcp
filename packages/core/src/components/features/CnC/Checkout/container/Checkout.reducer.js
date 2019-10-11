import { fromJS } from 'immutable';
import { setLocalStorage } from '../../../../../utils/localStorageManagement';
import { constants as venmoConstants } from '../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';
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
      deviceData: '',
      supportedByBrowser: true,
      loading: false,
      timestamp: '',
      error: null,
    },
    venmoClientTokenData: {
      userState: 'G',
      venmoCustomerIdAvailable: false,
      venmoIsDefaultPaymentType: false,
      venmoPaymentTokenAvailable: false,
      venmoSecurityToken: '',
    },
    addEditResponseAddressId: null,
    giftCardError: null,
    isShippingFormLoading: false,
    orderBalanceTotal: 0,
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
    venmoPickupMessageDisplayed: false,
    venmoShppingMessageDisplayed: false,
    venmoPaymentOptionSave: false,
    isLoadingShippingMethods: false,
    isEditingSubform: false,
    isBillingVisited: false,
    isReviewVisited: false,
    alertMessage: null,
    paymentError: null,
    addressError: null,
  },
});

const mergedVenmoDetails = (state, payload) => {
  const currentValue = fromJS(state.getIn(['values', 'venmoData']));
  return currentValue.merge(payload).toObject();
};

function venmoFlagReducer(checkout, action) {
  switch (action.type) {
    case CheckoutConstants.GET_VENMO_CLIENT_TOKEN_SUCCESS:
      return checkout.setIn(
        ['values', 'venmoClientTokenData'],
        action.payload && action.payload.venmoClientTokenData
      );
    case CheckoutConstants.GET_VENMO_CLIENT_TOKEN_ERROR:
      return checkout.setIn(['values', 'venmoData'], action.payload);
    case CheckoutConstants.SET_VENMO_DATA: {
      const venmoData = mergedVenmoDetails(checkout, action.payload);
      setLocalStorage({ key: venmoConstants.VENMO_STORAGE_KEY, value: JSON.stringify(venmoData) });
      return checkout.setIn(['values', 'venmoData'], venmoData);
    }
    case CheckoutConstants.SET_VENMO_PAYMENT_INPROGRESS: {
      setLocalStorage({
        key: venmoConstants.VENMO_INPROGRESS_KEY,
        value: action.payload,
      });
      return checkout.setIn(['uiFlags', 'venmoPaymentInProgress'], action.payload);
    }
    case CheckoutConstants.SET_VENMO_PICKUP_MESSAGE_STATE: {
      setLocalStorage({
        key: venmoConstants.VENMO_PICKUP_BANNER,
        value: action.payload,
      });
      return checkout.setIn(['uiFlags', 'venmoPickupMessageDisplayed'], action.payload);
    }
    case CheckoutConstants.SET_VENMO_SHIPPING_MESSAGE_STATE: {
      setLocalStorage({
        key: venmoConstants.VENMO_SHIPPING_BANNER,
        value: action.payload,
      });
      return checkout.setIn(['uiFlags', 'venmoShippingMessageDisplayed'], action.payload);
    }
    case CheckoutConstants.SET_VENMO_PAYMENT_OPTION_SAVE: {
      return checkout.setIn(['uiFlags', 'venmoPaymentOptionSave'], action.payload);
    }
    default:
      return checkout;
  }
}

function paypalReducer(checkout, action) {
  switch (action.type) {
    case CheckoutConstants.CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT:
      return checkout.setIn(['options', 'paypalPaymentSettings'], action.paypalPaymentSettings);
    default:
      return venmoFlagReducer(checkout, action);
  }
}

function uiGiftCardFlagReducer(checkout, action) {
  switch (action.type) {
    case CheckoutConstants.CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_SHOW:
      return checkout
        .setIn(['values', 'addGiftCardError'], null)
        .setIn(['values', 'showAddGiftCard'], true);
    case CheckoutConstants.CHECKOUT_FLAGS_SET_BILLING_ADD_GIFT_CARD_HIDE:
      return checkout.setIn(['values', 'showAddGiftCard'], false);
    case CheckoutConstants.ADD_GIFT_CARD_SUCCESS:
      return checkout.setIn(['values', 'addGiftCardResponse'], 'success');
    case CheckoutConstants.ADD_GIFT_CARD_FAILED:
      return checkout.setIn(['values', 'addGiftCardError'], fromJS(action.payload));
    case CheckoutConstants.RESET_ADD_GIFT_CARD:
      return checkout.setIn(['values', 'addGiftCardError'], null);
    case CheckoutConstants.RESET_ADD_GIFT_CARD_SUCCESS:
      return checkout.setIn(['values', 'addGiftCardResponse'], null);
    case CheckoutConstants.RESET_CHECKOUT_REDUCER:
      return initialState;
    case CheckoutConstants.CHECKOUT_VALUES_SET_SHIPPING_LOADING:
      return checkout.setIn(['values', 'isShippingFormLoading'], action.isLoading);
    default:
      return paypalReducer(checkout, action);
  }
}

function uiFlagReducer(checkout, action) {
  switch (action.type) {
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
    case 'CHECKOUT_UIFLAGS_SET_STAGE':
      return checkout.setIn(['uiFlags', 'stage'], action.payload);
    case CheckoutConstants.CHECKOUT_FLAGS_SET_BILLING_VISITED:
      return checkout.setIn(['uiFlags', 'isBillingVisited'], action.isBillingVisited);
    case CheckoutConstants.SET_GIFTCARD_ERROR:
      return checkout.setIn(['values', 'giftCardError'], action.payload);
    case CheckoutConstants.RESET_GIFTCARD_ERROR:
      return checkout.setIn(['values', 'giftCardError'], null);
    case CheckoutConstants.SET_ORDER_TOTAL:
      return checkout.setIn(['values', 'orderBalanceTotal'], action.payload);
    case CheckoutConstants.CHECKOUT_VAlUES_SET_GIFT_WRAP:
      return checkout.CartPageReducer.setIn(['orderDetails', 'checkout', 'giftWrap']);
    case 'CHECKOUT_ORDER_OPTIONS_SET_INTL_URL':
      return checkout.setIn(['options', 'internationalUrl'], action.internationalUrl);
    // case 'CHECKOUT_FLAGS_SET_REVIEW_VISTED':
    //   return merge(uiFlags, { isReviewVisited: action.payload });
    // case 'CHECKOUT_FLAGS_SET_PAYMENT_ERROR':
    //   return merge(uiFlags, { paymentError: action.paymentError });
    // case CheckoutConstants.CHECKOUT_FLAGS_SET_ADDRESS_ERROR:
    //   return checkout.setIn(['uiFlags', 'addressError'], action.addressError);
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
      return uiGiftCardFlagReducer(checkout, action);
  }
}

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
    case 'CHECKOUT_VALUES_SET_BILLING':
      return checkout.setIn(['values', 'billing'], action.billing);
    // case 'CHECKOUT_VALUES_SET_SHIPPING_METHOD':
    //   return orderValues.setIn(['shipping', 'method'], action.method);
    // case 'CHECKOUT_VALUES_SET_GIFT_WRAP':
    //   return merge(orderValues, { giftWrap: action.giftWrap });
    case CheckoutConstants.CHECKOUT_VALUES_SET_SMS_UPDATES:
      return checkout.setIn(['values', 'smsInfo'], { numberForUpdates: action.phoneNumber });
    case CheckoutConstants.SET_ON_FILE_ADDRESS_KEY:
      return checkout.setIn(['values', 'addEditResponseAddressId'], action.payload.addressId);
    // case 'CHECKOUT_VALUES_SET_SMS_MARKETING':
    //   return orderValues.setIn(['smsInfo', 'numberForMarketing'], action.phoneNumber);
    // case 'CHECKOUT_VALUES_SET_SELECTED_SHIPPING_PHONE_NUMBER':
    //   return orderValues.set('selectedShippingPhoneNumber', action.payload);
    case CheckoutConstants.CHECKOUT_ORDER_OPTIONS_SET_SHIPPING:
      return checkout.setIn(['options', 'shippingMethods'], action.shippingMethods);
    // case CheckoutConstants.CHECKOUT_ORDER_OPTIONS_SET_PAYPAL_PAYMENT:
    //   return checkout.setIn(['options', 'shippingMethods'], action.shippingMethods);
    // case 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP':
    //   return merge(orderOptions, { giftWrapOptions: action.giftWrapOptions });
    default:
      return uiFlagReducer(checkout, action);
  }
}
