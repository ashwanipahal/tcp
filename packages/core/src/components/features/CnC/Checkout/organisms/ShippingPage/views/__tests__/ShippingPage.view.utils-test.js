import {
  setPickupInitialValues,
  setShippingAddress,
  isShowVenmoBanner,
} from '../ShippingPage.view.utils';
import { getSiteId } from '../../../../../../../../utils/utils.web';
import CONSTANTS from '../../../../Checkout.constants';

jest.mock('../../../../../../../../utils/utils.web', () => ({
  getSiteId: jest.fn(),
}));

describe('Shipping Page Util', () => {
  it('calling setPickupInitialValues method', () => {
    const pickUpContactPerson = {
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '4044954112',
      emailAddress: 'testuser@gmail.com',
    };
    expect(setPickupInitialValues(pickUpContactPerson)).not.toBeUndefined();
  });

  it('calling setShippingAddress method', () => {
    const shippingPhoneAndEmail = {
      phoneNumber: '4044954112',
      emailAddress: 'testuser@gmail.com',
    };
    const shippingAddress = {
      addressLine1: '500 Plaza Drive',
      addressLine2: 'Floor 5',
      firstName: 'Test',
      lastName: 'User',
      city: 'Secaucus',
      state: 'NJ',
      zipCode: '07307',
    };
    expect(setShippingAddress(shippingAddress, shippingPhoneAndEmail)).not.toBeUndefined();
  });

  it('calling isShowVenmoBanner method', () => {
    const props = {
      isVenmoPaymentInProgress: true,
      isVenmoPickupDisplayed: false,
      isVenmoShippingDisplayed: false,
    };
    const currentSection = 'shipping';
    expect(isShowVenmoBanner(currentSection, props)).toBeTruthy();
  });
});
