import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS, {
  isGuest,
  isExpressCheckout,
  getUserContactInfo,
  getCheckoutStage,
  getPickupAltValues,
} from '../container/Checkout.selector';

import { isMobileApp, getViewportInfo } from '../../../../../utils';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
  getViewportInfo: jest.fn(),
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
      PaymentReducer: fromJS({ cardList: [{ creditCardId: '' }] }),
    };
    expect(CHECKOUT_SELECTORS.getDetailedCreditCardById(State)).toEqual(fromJS(undefined));
  });

  it('#getAddressByKey', () => {
    const State = {
      PaymentReducer: fromJS({ cardList: [{ creditCardId: '123' }] }),
    };
    expect(CHECKOUT_SELECTORS.getDetailedCreditCardById(State)).toEqual(undefined);
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

  // it('#getShippingLabels', () => {
  //   const State = {
  //     Labels: {
  //       checkout: {
  //         shipping: {
  //           lbl_shipping_header: 'section',
  //           lbl_shipping_sectionHeader: 'section',
  //           lbl_shipping_shipmentHeader: 'section',
  //           lbl_shipping_returnTo: 'section',
  //           getBillingLabels: 'section',
  //           lbl_shipping_nextText: 'section',
  //           lbl_shipping_backLinkText: 'section',
  //           lbl_shipping_billingText: 'section',
  //         },
  //       },
  //     },
  //   };

  //   expect(CHECKOUT_SELECTORS.getShippingLabels(State)).toEqual({
  //     header: 'section',
  //     sectionHeader: 'section',
  //     shipmentHeader: 'section',
  //     returnTo: 'section',
  //     nextText: 'section',
  //     billingText: 'section',
  //     backLinkText: 'section',
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
});
