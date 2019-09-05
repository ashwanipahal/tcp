import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS, {
  isGuest,
  isExpressCheckout,
  getUserContactInfo,
  getCheckoutStage,
  getPickupAltValues,
  getCheckoutState,
  isRemembered,
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
      CartPageReducer: fromJS({}),
    };
    expect(CHECKOUT_SELECTORS.getIsOrderHasShipping(State)).toEqual(0);
  });

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

  it('#getInitialPickupSectionValues should return boolean', () => {
    const State = {
      Checkout: fromJS({
        values: {
          pickUpContact: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: 212,
          },
          pickUpAlternative: {
            firstName: '',
          },
          smsInfo: {
            numberForUpdates: null,
            smsUpdateNumber: null,
          },
        },
      }),
      User: fromJS({
        personalData: {
          userId: '320503',
          contactInfo: {
            profileAddress: {
              type: 'Mailing',
              isComplete: false,
              address: {},
            },
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: 212,
          },
          isGuest: true,
          isRemembered: false,
          associateId: '',
          isExpressEligible: false,
        },
      }),
    };
    expect(CHECKOUT_SELECTORS.getPickupInitialPickupSectionValues(State)).toEqual({
      pickUpContact: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: 212,
      },
      smsSignUp: {
        phoneNumber: 212,
        sendOrderUpdate: false,
      },
      hasAlternatePickup: undefined,
      pickUpAlternate: {},
    });
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
  it('#getShippingAddress', () => {
    const CheckoutState = fromJS({
      values: {
        shipping: {
          emailAddress: 'abc@test.com',
          address: {
            addressLine: ['abc', 'def'],
          },
          onFileAddressId: '34567',
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
    expect(CHECKOUT_SELECTORS.getShippingAddress(State)).toEqual('34567');
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
    expect(CHECKOUT_SELECTORS.isUsSite()).toEqual(true);
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
});
