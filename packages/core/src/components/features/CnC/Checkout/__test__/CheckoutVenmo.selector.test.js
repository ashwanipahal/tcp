import { fromJS } from 'immutable';
import CHECKOUT_SELECTORS, { getPickupValues } from '../container/Checkout.selector';
import { isMobileApp } from '../../../../../utils';

jest.mock('../../../../../utils', () => ({
  isMobileApp: jest.fn(),
  getAPIConfig: jest.fn(),
}));

describe('Venmo Checkout Selectors', () => {
  it('#isVenmoPaymentInProgress', () => {
    const { isVenmoPaymentInProgress } = CHECKOUT_SELECTORS;
    const state = {
      Checkout: fromJS({
        uiFlags: {
          venmoPaymentInProgress: true,
        },
      }),
    };
    expect(isVenmoPaymentInProgress(state)).toEqual(true);
  });

  it('#getIsVenmoEnabled', () => {
    const { getIsVenmoEnabled } = CHECKOUT_SELECTORS;
    const session = {
      siteDetails: {
        VENMO_ENABLED: 'TRUE',
      },
    };

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

  it('#isVenmoPaymentSaveSelected', () => {
    const { isVenmoPaymentSaveSelected } = CHECKOUT_SELECTORS;
    const state = {
      Checkout: fromJS({
        uiFlags: {
          venmoPaymentOptionSave: true,
        },
      }),
    };
    expect(isVenmoPaymentSaveSelected(state)).toEqual(true);
  });

  it('#isVenmoPickupBannerDisplayed', () => {
    const { isVenmoPickupBannerDisplayed } = CHECKOUT_SELECTORS;
    const state = {
      Checkout: fromJS({
        uiFlags: {
          venmoPickupMessageDisplayed: true,
        },
      }),
    };
    isMobileApp.mockImplementation(() => true);
    expect(isVenmoPickupBannerDisplayed(state)).toEqual(true);
  });

  it('#isVenmoShippingBannerDisplayed', () => {
    const { isVenmoShippingBannerDisplayed } = CHECKOUT_SELECTORS;
    const state = {
      Checkout: fromJS({
        uiFlags: {
          venmoShippingMessageDisplayed: false,
        },
      }),
    };
    isMobileApp.mockImplementation(() => true);
    expect(isVenmoShippingBannerDisplayed(state)).toEqual(false);
  });

  it('#getVenmoError', () => {
    const { getVenmoError } = CHECKOUT_SELECTORS;
    const Checkout = fromJS({
      values: {
        venmoData: {
          error: {
            message: 'Venmo Authentication failed',
          },
        },
      },
    });

    const state = {
      Checkout: fromJS({
        values: {
          venmoData: {
            error: {
              message: 'Venmo Authentication failed',
            },
          },
        },
      }),
    };
    const error = Checkout.getIn(['values', 'venmoData', 'error']);
    expect(getVenmoError(state)).toEqual(error.message);
  });

  it('#getVenmoUserEmail', () => {
    const { getVenmoUserEmail, getShippingPhoneAndEmail } = CHECKOUT_SELECTORS;
    const email = 'shipping-email@test.com';
    const state = {
      Checkout: fromJS({
        values: {
          shipping: { emailAddress: email, phoneNumber: 987654322 },
          pickUpContact: fromJS({ emailAddress: 'pickup@test.com' }),
        },
      }),
      User: fromJS({ personalData: {} }),
    };

    const Checkout = fromJS({
      values: {
        shipping: { emailAddress: email, phoneNumber: 987654322 },
        pickUpContact: fromJS({ emailAddress: 'pickup@test.com' }),
      },
    });

    expect(getShippingPhoneAndEmail(state)).toEqual({
      emailAddress: email,
      phoneNumber: 987654322,
    });
    expect(getPickupValues(state)).toEqual(Checkout.getIn(['values', 'pickUpContact']));
    expect(getVenmoUserEmail(state)).toEqual(email);
  });
});
