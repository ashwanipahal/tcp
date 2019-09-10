import React from 'react';
import { shallow } from 'enzyme';
import { BillingPaymentForm } from '../views/BillingPaymentForm.view';

const card = {
  accountNo: '************3743',
  addressDetails: {
    addressLine1: 'Dorney Park Road',
    addressLine2: '',
    city: 'Allentown',
    country: 'US',
  },
  ccBrand: 'PLACE CARD',
  ccType: 'PLACE CARD',
  creditCardId: 82596,
  defaultInd: false,
};

describe('ButtonList component', () => {
  const props = {
    className: '',
    onFileCardKey: '',
    isMobile: false,
    cvvCodeRichText: null,
    orderHasShipping: false,
    isGuest: false,
    handleSubmit: jest.fn(),
    cardList: [{ card }],
    labels: {
      lbl_billing_paymentMethodTitle: 'Payment Method',
      lbl_billing_creditCard: 'Credit Card',
      lbl_billing_selectFromCard: 'Select from card on file',
      lbl_billing_addCreditHeading: '+ Add a new Credit Card',
      lbl_billing_default: 'Default',
      lbl_billing_cardDetailsTitle: 'Card Details',
      lbl_billing_editBtn: 'Edit',
      lbl_billing_creditCardEnd: 'ending in ',
      lbl_billing_cvvCode: 'CVV Code',
      lbl_billing_billingAddress: 'Billing Address',
      lbl_billing_defaultPayment: 'Set as default payment method',
      lbl_billing_addCreditBtn: 'ADD A NEW CREDIT CARD',
      lbl_billing_paypal: 'Pay Pal',
      lbl_billing_venmo: 'Venmo',
      lbl_billing_default_card: 'DEFAULT',
      lbl_billing_selectCardTitle: 'SELECT CARD',
      lbl_billing_select: 'SELECT',
    },
    paymentMethodId: 'creditCard',
    backLinkPickup: '',
    backLinkShipping: '',
    nextSubmitText: '',
  };

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });
});
