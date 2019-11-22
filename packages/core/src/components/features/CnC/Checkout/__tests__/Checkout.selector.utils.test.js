/* eslint-disable max-lines */
import { fromJS, List } from 'immutable';
import CHECKOUT_SELECTORS, {
  getSendOrderUpdate,
  getAlternateFormFieldsExpress,
  getPageData,
} from '../container/Checkout.selector';
import { getAPIConfig } from '../../../../../utils';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
  getAPIConfig: jest.fn(),
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
      Checkout: fromJS({}),
    };
    expect(CHECKOUT_SELECTORS.getSmsNumberForOrderUpdates(state)).toEqual(undefined);
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
      CartPageReducer: fromJS({
        orderDetails: { emailSignUpTCP: true },
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
      emailSignUp: {
        emailSignUp: true,
        emailSignUpGYM: undefined,
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
    expect(CHECKOUT_SELECTORS.getShippingAddress(State)).toEqual({ addressLine: ['abc', 'def'] });
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

  it('#getCheckoutServerError', () => {
    const { getCheckoutServerError } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      uiFlags: {
        checkoutServerError: null,
      },
    });

    const state = {
      Checkout: fromJS({
        uiFlags: {
          checkoutServerError: null,
        },
      }),
    };
    expect(getCheckoutServerError(state)).toEqual(
      Checkout.getIn(['uiFlags', 'checkoutServerError'])
    );
  });

  it('#getExpressReviewShippingSectionId', () => {
    const state = {
      form: {
        expressReviewPage: {
          values: {
            expressReviewShippingSection: {
              shippingMethodId: '911',
            },
          },
        },
      },
    };
    expect(CHECKOUT_SELECTORS.getExpressReviewShippingSectionId(state)).toEqual({
      shippingMethodId: '911',
    });
  });

  it('#getAlternateFormFieldsExpress', () => {
    const state = {
      form: {
        expressReviewPage: {
          values: {
            pickUpAlternateExpress: {
              hasAlternatePickup: true,
            },
          },
        },
      },
    };
    expect(getAlternateFormFieldsExpress(state)).toEqual({
      hasAlternatePickup: true,
    });
  });

  it('#getShippingAddressList', () => {
    getAPIConfig.mockImplementation(() => {
      return { siteId: 'us' };
    });
    const AddressBookReducer = fromJS({
      list: List([
        {
          addressId: '158247',
          nickName: 'sb_2019-06-21 01:23:49.834',
          primary: 'false',
          country: 'US',
          xcont_isShippingAddress: 'true',
        },
      ]),
    });

    const state = {
      AddressBookReducer,
    };
    expect(CHECKOUT_SELECTORS.getShippingAddressList(state)).toEqual(
      AddressBookReducer.get('list')
    );
  });
  it('#getIsBillingVisited', () => {
    const { getIsBillingVisited } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      uiFlags: {
        isBillingVisited: true,
      },
    });

    const state = {
      Checkout: fromJS({
        uiFlags: {
          isBillingVisited: true,
        },
      }),
    };
    expect(getIsBillingVisited(state)).toEqual(Checkout.getIn(['uiFlags', 'isBillingVisited']));
  });
});

it('#getIsRtpsFlow', () => {
  const { getIsRtpsFlow } = CHECKOUT_SELECTORS;
  const Checkout = fromJS({
    uiFlags: {
      isRTPSFlow: true,
    },
  });

  const state = {
    Checkout: fromJS({
      uiFlags: {
        isRTPSFlow: true,
      },
    }),
  };
  expect(getIsRtpsFlow(state)).toEqual(Checkout.getIn(['uiFlags', 'isRTPSFlow']));
});
it('#getIsRTPSEnabled', () => {
  const { getIsRTPSEnabled } = CHECKOUT_SELECTORS;
  const session = {
    siteDetails: {
      ADS_OLPS_ENABLED: 'TRUE',
    },
  };

  const state = {
    session,
  };
  expect(getIsRTPSEnabled(state)).toEqual(true);
});
it('#getPageData', () => {
  const state = {
    pageData: {
      pageName: 'checkout',
    },
  };
  expect(getPageData(state)).toEqual({
    pageName: 'checkout',
  });
});
