import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutOrderInfoVanilla } from '../views/CheckoutOrderInfoMobile.view';
import { constants as VenmoConstants } from '../../../../../../common/atoms/VenmoPaymentButton/container/VenmoPaymentButton.util';

describe('CheckoutFooterVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      className: '',
      isGuest: false,
      showAccordian: false,
      isConfirmationPage: true,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        userName: 'test-user',
        ccBrand: VenmoConstants.VENMO,
        ccType: VenmoConstants.VENMO,
      },
      labels: {
        paidWithVenmo: 'Paid With',
      },
    };
    const component = shallow(<CheckoutOrderInfoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly for non confirmation page', () => {
    const props = {
      className: '',
      isGuest: false,
      showAccordian: false,
      isConfirmationPage: false,
      isVenmoPaymentInProgress: true,
      venmoPayment: {
        userName: 'test-user',
        ccBrand: VenmoConstants.VENMO,
        ccType: VenmoConstants.VENMO,
      },
      labels: {
        paidWithVenmo: 'Paid With',
      },
    };
    const component = shallow(<CheckoutOrderInfoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly for non venmo payment', () => {
    const props = {
      className: '',
      isGuest: false,
      showAccordian: false,
      isConfirmationPage: false,
      isVenmoPaymentInProgress: false,
      venmoPayment: {
        userName: '',
        ccBrand: VenmoConstants.VENMO,
        ccType: VenmoConstants.VENMO,
      },
      labels: {
        paidWithVenmo: 'Paid With',
      },
    };
    const component = shallow(<CheckoutOrderInfoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly for non venmo payment and with accordian', () => {
    const props = {
      className: '',
      isGuest: false,
      showAccordian: true,
      isConfirmationPage: false,
      isVenmoPaymentInProgress: false,
      venmoPayment: {
        userName: '',
        ccBrand: VenmoConstants.VENMO,
        ccType: VenmoConstants.VENMO,
      },
      labels: {
        paidWithVenmo: 'Paid With',
      },
    };
    const component = shallow(<CheckoutOrderInfoVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
