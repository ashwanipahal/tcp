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
    expect(CHECKOUT_SELECTORS.getIsOrderHasShipping()).toEqual(true);
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
});
