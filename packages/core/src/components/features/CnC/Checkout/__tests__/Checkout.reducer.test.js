import { fromJS } from 'immutable';
import CheckoutReducer from '../container/Checkout.reducer';

describe('Checkout Reducer', () => {
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
      stage: 'shipping',
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
      checkoutServerError: null,
    },
  });

  const checkoutValuesSetPickup = {
    type: 'CHECKOUT_VALUES_SET_PICKUP',
    payload: {
      values: {
        pickUpContact: {},
      },
    },
  };

  const checkoutValuesSetPickupAlt = {
    type: 'CHECKOUT_VALUES_SET_PICKUP_ALT',
    payload: {
      values: {
        pickUpAlternative: {},
      },
    },
  };

  const checkoutValuesSetShipping = {
    type: 'CHECKOUT_VALUES_SET_SHIPPING',
    payload: {
      values: {
        shipping: {},
      },
    },
  };

  const checkoutOrderOptionsSetGiftWrap = {
    type: 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP',
    payload: {
      options: {
        giftWrapOptions: {},
      },
    },
  };

  const getSetIsBillingVisitedActn = {
    type: 'CHECKOUT_FLAGS_SET_BILLING_VISITED',
    isBillingVisited: true,
  };

  const checkoutValuesSetBilling = {
    type: 'CHECKOUT_VALUES_SET_BILLING',
    billing: true,
  };

  const checkoutFlagsSetLoadMethods = {
    type: 'CHECKOUT_FLAGS_SET_LOAD_METHODS',
    isLoading: true,
  };

  const checkoutUiflagsSetStage = {
    type: 'CHECKOUT_UIFLAGS_SET_STAGE',
    payload: true,
  };

  const checkoutFlagsSetEditingSubform = {
    type: 'CHECKOUT_FLAGS_SET_EDITING_SUBFORM',
    isEditingSubform: true,
  };

  const setGiftcardError = {
    type: 'SET_GIFTCARD_ERROR',
    payload: true,
  };

  const resetGiftcardError = {
    type: 'RESET_GIFTCARD_ERROR',
  };

  const setCheckoutServerError = {
    type: 'SET_SERVER_ERROR_CHECKOUT',
  };

  const setOrderTotal = {
    type: 'SET_ORDER_TOTAL',
    payload: true,
  };

  it('CHECKOUT_VALUES_SET_PICKUP', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetPickup,
    });
    expect(newState.getIn(['values', 'pickUpContact'])).toEqual(undefined);
  });

  it('CHECKOUT_VALUES_SET_PICKUP_ALT', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetPickupAlt,
    });
    expect(newState.getIn(['values', 'pickUpAlternative'])).toEqual(undefined);
  });

  it('CHECKOUT_VALUES_SET_SHIPPING', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetShipping,
    });
    expect(newState.getIn(['values', 'shipping'])).toEqual(undefined);
  });

  it('CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutOrderOptionsSetGiftWrap,
    });
    expect(newState.getIn(['options', 'giftWrapOptions'])).toEqual(undefined);
  });

  it('CHECKOUT_FLAGS_SET_BILLING_VISITED', () => {
    const newState = CheckoutReducer(initialState, {
      ...getSetIsBillingVisitedActn,
    });
    expect(newState.getIn(['uiFlags', 'isBillingVisited'])).toEqual(true);
  });

  it('CHECKOUT_VALUES_SET_BILLING', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetBilling,
    });
    expect(newState.getIn(['values', 'billing'])).toEqual(true);
  });

  it('CHECKOUT_FLAGS_SET_LOAD_METHODS', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutFlagsSetLoadMethods,
    });
    expect(newState.getIn(['uiFlags', 'isLoadingShippingMethods'])).toEqual(true);
  });

  it('CHECKOUT_FLAGS_SET_EDITING_SUBFORM', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutFlagsSetEditingSubform,
    });
    expect(newState.getIn(['uiFlags', 'isEditingSubform'])).toEqual(true);
  });

  it('CHECKOUT_UIFLAGS_SET_STAGE', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutUiflagsSetStage,
    });
    expect(newState.getIn(['uiFlags', 'stage'])).toEqual(true);
  });

  it('SET_GIFTCARD_ERROR', () => {
    const newState = CheckoutReducer(initialState, {
      ...setGiftcardError,
    });
    expect(newState.getIn(['values', 'giftCardError'])).toEqual(true);
  });

  it('RESET_GIFTCARD_ERROR', () => {
    const newState = CheckoutReducer(initialState, {
      ...resetGiftcardError,
    });
    expect(newState.getIn(['values', 'giftCardError'])).toEqual(null);
  });

  it('SET_SERVER_ERROR_CHECKOUT', () => {
    const newState = CheckoutReducer(initialState, {
      ...setCheckoutServerError,
    });
    expect(newState.getIn(['uiFlags', 'checkoutServerError'])).toEqual(undefined);
  });

  it('SET_ORDER_TOTAL', () => {
    const newState = CheckoutReducer(initialState, {
      ...setOrderTotal,
    });
    expect(newState.getIn(['values', 'orderBalanceTotal'])).toEqual(true);
  });
});
