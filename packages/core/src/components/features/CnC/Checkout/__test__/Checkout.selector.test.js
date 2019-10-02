import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS, {
  isGuest,
  isExpressCheckout,
  getUserContactInfo,
  getCheckoutStage,
  getPickupAltValues,
  getCheckoutState,
  isRemembered,
  isUsSite,
} from '../container/Checkout.selector';

import { isMobileApp, getViewportInfo, getAPIConfig } from '../../../../../utils';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
  getViewportInfo: jest.fn(),
  getAPIConfig: jest.fn(),
}));

describe('Checkout Selectors', () => {
  it('#isGuest should return boolean', () => {
    const UserState = fromJS({
      personalData: {
        isGuest: true,
      },
    });

    const State = {
      User: fromJS({
        personalData: {
          isGuest: true,
        },
      }),
    };
    expect(isGuest(State)).toEqual(UserState.getIn(['personalData', 'isGuest']));
  });

  it('#isExpressCheckout should return boolean', () => {
    const UserState = fromJS({
      personalData: {
        isExpressEligible: true,
      },
    });

    const State = {
      User: fromJS({
        personalData: {
          isExpressEligible: true,
        },
      }),
    };
    expect(isExpressCheckout(State)).toEqual(
      UserState.getIn(['personalData', 'isExpressEligible'])
    );
  });

  it('#getCheckoutStage', () => {
    const Checkout = fromJS({
      uiFlags: {
        stage: '',
      },
    });

    const State = {
      Checkout: fromJS({
        uiFlags: {
          stage: '',
        },
      }),
    };
    expect(getCheckoutStage(State)).toEqual(Checkout.getIn(['uiFlags', 'stage']));
  });

  it('#getRecalcOrderPointsInterval', () => {
    expect(CHECKOUT_SELECTORS.getRecalcOrderPointsInterval()).toEqual(300000);
  });

  it('#igetIsOrderHasShipping', () => {
    const State = {
      CartPageReducer: fromJS({ orderItems: [] }),
    };
    expect(CHECKOUT_SELECTORS.getIsOrderHasShipping(State)).toEqual(0);
  });

  it('#getShippingPhoneAndEmail', () => {
    const State = {
      Checkout: fromJS({
        values: { shipping: { emailAddress: 'abc@test.com', phoneNumber: 987654322 } },
      }),
      User: fromJS({ personalData: {} }),
    };
    expect(CHECKOUT_SELECTORS.getShippingPhoneAndEmail(State)).toEqual({
      emailAddress: 'abc@test.com',
      phoneNumber: 987654322,
    });
  });

  it('#getShippingDestinationValues', () => {
    const State = {
      Checkout: fromJS({ values: { shipping: {} } }),
      User: fromJS({ personalData: {} }),
    };
    expect(CHECKOUT_SELECTORS.getShippingDestinationValues(State)).toEqual({
      emailAddress: undefined,
    });
  });

  it('#isCardNotUpdated', () => {
    const State = {
      Checkout: fromJS({ values: { billing: {} } }),
    };
    expect(CHECKOUT_SELECTORS.isCardNotUpdated(State)).toEqual(true);
  });

  it('#getBillingValues', () => {
    const State = {
      Checkout: fromJS({ values: { billing: {} } }),
    };
    expect(CHECKOUT_SELECTORS.getBillingValues(State)).toEqual(fromJS({}));
  });

  it('#getDetailedCreditCardById', () => {
    const State = {
      PaymentReducer: fromJS({ cardList: [{ creditCardId: '123' }] }),
    };
    expect(CHECKOUT_SELECTORS.getDetailedCreditCardById(State, 123)).toEqual({
      creditCardId: '123',
    });
  });

  it('#getAddressByKey', () => {
    const State = {
      PaymentReducer: fromJS({ cardList: [{ creditCardId: '123' }] }),
    };
    expect(CHECKOUT_SELECTORS.getDetailedCreditCardById(State, 99)).toEqual(undefined);
  });

  it('#getShipmentMethods', () => {
    const State = {
      Checkout: fromJS({ options: { shippingMethods: '123' } }),
    };
    expect(CHECKOUT_SELECTORS.getShipmentMethods(State)).toEqual('123');
  });

  // it('#getEmailSignUpLabels', () => {
  //   const State = {
  //     Labels: {
  //       checkout: {
  //         pickup: {
  //           lbl_pickup_emailSignupHeading: 'contact',
  //           lbl_pickup_emailSignupSubHeading: 'heading',
  //           lbl_pickup_emailSignupSubSubHeading: 'sub',
  //           lbl_pickup_emailSignupContact: 'heading',
  //         },
  //       },
  //     },
  //   };
  //   expect(CHECKOUT_SELECTORS.getEmailSignUpLabels(State)).toEqual({
  //     emailSignupHeading: 'contact',
  //     emailSignupSubHeading: 'heading',
  //     emailSignupSubSubHeading: 'sub',
  //     emailSignupContact: 'heading',
  //   });
  // });

  it('#getPickUpContactFormLabels', () => {
    const State = {
      Labels: { global: {}, checkout: { pickup: { lbl_pickup_title: '' }, shipping: {} } },
    };
    expect(CHECKOUT_SELECTORS.getPickUpContactFormLabels(State)).toEqual({
      SMSHeading: undefined,
      SMSLongText: undefined,
      SMSPrivatePolicy: undefined,
      alternativeEmail: undefined,
      alternativeFirstName: undefined,
      alternativeGovIdText: undefined,
      alternativeHeading: undefined,
      alternativeLastName: undefined,
      alternativeSubHeading: undefined,
      anchorEdit: undefined,
      billingText: undefined,
      btnCancel: undefined,
      btnSaveUpdate: undefined,
      btnUpdate: undefined,
      email: undefined,
      firstName: undefined,
      govIdText: undefined,
      lastName: undefined,
      mobile: undefined,
      nextText: undefined,
      pickupContactText: undefined,
      pickupText: undefined,
      returnTo: undefined,
      shippingText: undefined,
      title: '',
      titleEditPickup: undefined,
    });
  });

  // it('#getCheckoutProgressBarLabels', () => {
  //   const State = {
  //     Labels: { checkout: { checkoutHeader: { lbl_pickup_title: '' }, shipping: {} } },
  //   };
  //   expect(CHECKOUT_SELECTORS.getCheckoutProgressBarLabels(State)).toEqual({
  //     pickupLabel: undefined,
  //     shippingLabel: undefined,
  //     billingLabel: undefined,
  //     reviewLabel: undefined,
  //   });
  // });

  // it('#getBillingLabels', () => {
  //   const State = {
  //     Labels: { checkout: { billing: {} } },
  //   };
  //   expect(CHECKOUT_SELECTORS.getBillingLabels(State)).toEqual({
  //     header: undefined,
  //     backLinkPickup: undefined,
  //     backLinkShipping: undefined,
  //     nextSubmitText: undefined,
  //   });
  // });

  it('#igetUserContactInfo', () => {
    const UserState = fromJS({
      personalData: {
        contactInfo: {},
      },
    });

    const State = {
      User: fromJS({
        personalData: {
          contactInfo: {},
        },
      }),
    };
    expect(getUserContactInfo(State)).toEqual(UserState.getIn(['personalData', 'contactInfo']));
  });

  it('#getIsMobile', () => {
    isMobileApp.mockImplementation(() => false);
    getViewportInfo.mockImplementation(() => {
      return {
        isMobile: false,
      };
    });
    expect(CHECKOUT_SELECTORS.getIsMobile()).toEqual(false);
  });

  it('#getIsMobile if isMobileApp true', () => {
    isMobileApp.mockImplementation(() => true);
    expect(CHECKOUT_SELECTORS.getIsMobile()).toEqual(true);
  });

  it('#getPickupAltValues', () => {
    const Checkout = fromJS({
      values: {
        pickUpAlternative: {},
      },
    });

    const State = {
      Checkout: fromJS({
        values: {
          pickUpAlternative: {},
        },
      }),
    };
    expect(getPickupAltValues(State)).toEqual(Checkout.getIn(['values', 'pickUpAlternative']));
  });

  it('#getIsPaymentDisabled', () => {
    const State = {
      CartPageReducer: fromJS({
        orderDetails: { grandTotal: 1, giftCardsTotal: 12 },
      }),
    };

    expect(CHECKOUT_SELECTORS.getIsPaymentDisabled(State)).toEqual(true);
  });

  it('#getIsOrderHasPickup', () => {
    const State = {
      CartPageReducer: fromJS({
        orderDetails: { orderItems: [] },
      }),
    };

    expect(CHECKOUT_SELECTORS.getIsOrderHasPickup(State)).toEqual(0);
  });

  it('should get checkout state', () => {
    const state = {
      Checkout: fromJS({}),
    };
    expect(getCheckoutState(state)).toEqual(fromJS({}));
  });
  it('#getIsOrderHasShipping', () => {
    const state = {
      CartPageReducer: fromJS({
        orderDetails: {
          orderItems: [{ miscInfo: {} }],
        },
      }),
    };
    expect(CHECKOUT_SELECTORS.getIsOrderHasShipping(state)).toEqual(true);
  });
  it('#isRemembered', () => {
    const UserState = fromJS({
      personalData: {
        isRemembered: true,
      },
    });

    const State = {
      User: fromJS({
        personalData: {
          isRemembered: true,
        },
      }),
    };
    expect(isRemembered(State)).toEqual(UserState.getIn(['personalData', 'isRemembered']));
  });
  it('#getShippingDestinationValues', () => {
    const CheckoutState = fromJS({
      values: {
        shipping: {
          emailAddress: 'abc123@test.com',
          address: {
            addressLine: ['abc', 'def'],
          },
        },
      },
    });
    const UserState = fromJS({
      personalData: {
        email: 'test',
      },
    });

    const State = {
      Checkout: CheckoutState,
      User: UserState,
    };
    expect(CHECKOUT_SELECTORS.getShippingDestinationValues(State)).toEqual({
      emailAddress: 'abc123@test.com',
      address: {
        addressLine: ['abc', 'def'],
      },
    });
  });
  it('#getAddEditResponseAddressId', () => {
    const CheckoutState = fromJS({
      values: {
        addEditResponseAddressId: '123',
      },
    });
    const State = {
      Checkout: CheckoutState,
    };
    expect(CHECKOUT_SELECTORS.getAddEditResponseAddressId(State)).toEqual('123');
  });
  it('#getGiftWrappingValues', () => {
    const CheckoutState = fromJS({
      values: {
        giftWrap: '123',
      },
    });
    const State = {
      Checkout: CheckoutState,
    };
    expect(CHECKOUT_SELECTORS.getGiftWrappingValues(State)).toEqual('123');
  });
  it('#getCurrentSiteId', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us' };
    });
    expect(CHECKOUT_SELECTORS.getCurrentSiteId()).toEqual('us');
  });
  it('#getIsSmsUpdatesEnabled', () => {
    getAPIConfig.mockImplementation(() => {
      return { isSmsUpdatesEnabled: true };
    });
    expect(CHECKOUT_SELECTORS.getIsSmsUpdatesEnabled()).toEqual(true);
  });
  it('#isUsSite', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us' };
    });
    expect(isUsSite()).toEqual(true);
  });
  it('#isSmsUpdatesEnabled', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us', isSmsUpdatesEnabled: true };
    });
    expect(CHECKOUT_SELECTORS.isSmsUpdatesEnabled()).toEqual(true);
  });
  const FormState = {
    checkoutShipping: {
      values: {
        smsSignUp: { sendOrderUpdate: true, phoneNumber: 2012345678 },
        shipmentMethods: { shippingMethodId: '123' },
        saveToAddressBook: true,
        onFileAddressKey: '3456',
        address: {
          addressId: '56789',
          phoneNumber: 2012345678,
        },
        defaultShipping: true,
      },
    },
    checkoutPickup: {
      values: {
        pickUpContact: { phoneNumber: 2012345678 },
      },
    },
  };
  it('#getShippingSmsSignUpFields', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getShippingSmsSignUpFields(state)).toEqual({
      sendOrderUpdate: true,
      phoneNumber: 2012345678,
    });
  });
  it('#getShipmentMethodsFields', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getShipmentMethodsFields(state)).toEqual({ shippingMethodId: '123' });
  });
  it('#getSelectedShipmentId', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getSelectedShipmentId(state)).toEqual('123');
  });
  it('#getShippingSendOrderUpdate', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getShippingSendOrderUpdate(state)).toEqual(true);
  });
  it('#getSaveToAddressBook', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getSaveToAddressBook(state)).toEqual(true);
  });
  it('#getOnFileAddressKey', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getOnFileAddressKey(state)).toEqual('3456');
  });
  it('#getAddressFields', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getAddressFields(state)).toEqual({
      addressId: '56789',
      phoneNumber: 2012345678,
    });
  });

  it('#isVenmoPaymentSaveSelected', () => {
    const { isVenmoPaymentSaveSelected } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      uiFlags: {
        venmoPaymentOptionSave: 'true',
      },
    });

    const state = {
      Checkout: fromJS({
        uiFlags: {
          venmoPaymentOptionSave: 'true',
        },
      }),
    };
    expect(isVenmoPaymentSaveSelected(state)).toEqual(
      Checkout.getIn(['uiFlags', 'venmoPaymentOptionSave'])
    );
  });
});
