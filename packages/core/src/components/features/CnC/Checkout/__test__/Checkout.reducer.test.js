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
    }
  };

  const checkoutValuesSetShipping = {
    type: 'CHECKOUT_VALUES_SET_SHIPPING',
    payload: {
      values: {
        shipping: {},
      },
    }
  };

  const checkoutOrderOptionsSetGiftWrap = {
    type: 'CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP',
    payload: {
      options: {
        giftWrapOptions: {},
      },
    }
  };

  it('CHECKOUT_VALUES_SET_PICKUP', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetPickup,
    });
    expect(newState.getIn(['values','pickUpContact'])).toEqual(undefined);
  });

  it('CHECKOUT_VALUES_SET_PICKUP_ALT', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetPickupAlt,
    });
    expect(newState.getIn(['values','pickUpAlternative'])).toEqual(undefined);
  });

  it('CHECKOUT_VALUES_SET_SHIPPING', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutValuesSetShipping,
    });
    expect(newState.getIn(['values','shipping'])).toEqual(undefined);
  });

  it('CHECKOUT_ORDER_OPTIONS_SET_GIFT_WRAP', () => {
    const newState = CheckoutReducer(initialState, {
      ...checkoutOrderOptionsSetGiftWrap,
    });
    expect(newState.getIn(['options','giftWrapOptions'])).toEqual(undefined);
  });
});
