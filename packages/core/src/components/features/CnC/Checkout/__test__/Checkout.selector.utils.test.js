import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS, { getSendOrderUpdate } from '../container/Checkout.selector';
import { isMobileApp } from '../../../../../utils';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
}));

describe('Checkout Selectors', () => {
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
      syncErrors: {
        address: {},
      },
    },
    checkoutPickup: {
      values: {
        pickUpContact: { phoneNumber: 2012345678 },
        smsSignUp: { sendOrderUpdate: true, phoneNumber: 2012345678 },
      },
    },
  };
  it('#getSyncError', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getSyncError(state)).toEqual({
      syncError: {
        address: {},
      },
    });
  });
  it('#getAddressPhoneNo', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getAddressPhoneNo(state)).toEqual(2012345678);
  });
  it('#getDefaultShipping', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getDefaultShipping(state)).toEqual(true);
  });
  it('#getSendOrderUpdate', () => {
    const state = {
      form: FormState,
    };
    expect(getSendOrderUpdate(state)).toEqual(true);
  });
  it('#getSmsNumberForOrderUpdates', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getSmsNumberForOrderUpdates(state)).toEqual(2012345678);
  });
  it('#getCurrentPickupFormNumber', () => {
    const state = {
      form: FormState,
    };
    expect(CHECKOUT_SELECTORS.getCurrentPickupFormNumber(state)).toEqual(2012345678);
  });
  it('#getPickUpContactFormLabels', () => {
    const State = {
      Labels: {
        global: {},
        checkout: {
          pickup: { lbl_pickup_title: '', lbl_pickup_nextToBilling: 'NEXT: SHIPPING' },
          shipping: {},
        },
      },
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
      nextToBilling: 'NEXT: SHIPPING',
    });
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
      hasAlternatePickup: false,
      pickUpAlternate: {},
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
    expect(CHECKOUT_SELECTORS.getShippingAddress(State)).toEqual({ addressLine: ['abc', 'def'] });
  });

  it('#getIsVenmoEnabled', () => {
    const { getIsVenmoEnabled } = CHECKOUT_SELECTORS;
    const session = fromJS({
      siteDetails: {
        VENMO_ENABLED: 'TRUE',
      },
    });

    const state = {
      session,
    };
    isMobileApp.mockImplementation(() => true);
    expect(CHECKOUT_SELECTORS.getIsMobile()).toEqual(true);
    expect(getIsVenmoEnabled(state)).toEqual(true);
  });

  it('#getVenmoClientTokenData', () => {
    const { getVenmoClientTokenData } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      values: {
        venmoClientTokenData: {
          userState: 'G',
          venmoCustomerIdAvailable: false,
          venmoIsDefaultPaymentType: false,
          venmoPaymentTokenAvailable: false,
          venmoSecurityToken: '',
        },
      },
    });

    const state = {
      Checkout: fromJS({
        values: {
          venmoClientTokenData: {
            userState: 'G',
            venmoCustomerIdAvailable: false,
            venmoIsDefaultPaymentType: false,
            venmoPaymentTokenAvailable: false,
            venmoSecurityToken: '',
          },
        },
      }),
    };
    expect(getVenmoClientTokenData(state)).toEqual(
      Checkout.getIn(['values', 'venmoClientTokenData'])
    );
  });
  it('#getCurrentCheckoutStage', () => {
    const { getCurrentCheckoutStage } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      uiFlags: {
        stage: 'true',
      },
    });

    const state = {
      Checkout: fromJS({
        uiFlags: {
          stage: 'true',
        },
      }),
    };
    expect(getCurrentCheckoutStage(state)).toEqual(Checkout.getIn(['uiFlags', 'stage']));
  });
});
