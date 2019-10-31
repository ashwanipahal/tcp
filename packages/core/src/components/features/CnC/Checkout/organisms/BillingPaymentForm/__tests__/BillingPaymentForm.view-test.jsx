import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { BillingPaymentForm } from '../views/BillingPaymentForm.view';

const card = [
  {
    accountNo: '************3743',
    addressDetails: {
      addressLine1: 'Dorney Park Road',
      addressLine2: '',
      city: 'Allentown',
      country: 'US',
    },
    ccBrand: 'PLACE CARD',
    ccType: 'PLACE CARD1',
    creditCardId: 82596,
    defaultInd: false,
  },
];

const labels = {
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
};

let orderHasShipping = false;
const isPaymentDisabled = false;

describe('ButtonList component', () => {
  const props = {
    className: '',
    onFileCardKey: 82596,
    isMobile: false,
    cvvCodeRichText: null,
    orderHasShipping,
    isGuest: false,
    handleSubmit: jest.fn(),
    cardList: new List(card),
    labels,
    paymentMethodId: 'creditCard',
    backLinkPickup: '',
    backLinkShipping: '',
    nextSubmitText: '',
    isPaymentDisabled,
    dispatch: jest.fn(),
  };

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props with payPal', () => {
    props.paymentMethodId = 'payPal';
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props with venmo', () => {
    props.paymentMethodId = 'venmo';
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly without props with isPaymentDisabled true', () => {
    orderHasShipping = true;
    const props1 = {
      className: '',
      onFileCardKey: 82596,
      isMobile: false,
      cvvCodeRichText: null,
      orderHasShipping,
      isGuest: false,
      handleSubmit: jest.fn(),
      cardList: new List(card),
      labels,
      paymentMethodId: 'creditCard',
      backLinkPickup: '',
      backLinkShipping: '',
      nextSubmitText: '',
      isPaymentDisabled,
    };
    const component = shallow(<BillingPaymentForm {...props1} isPaymentDisabled />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly if payment method is diff', () => {
    const props2 = {
      className: '',
      onFileCardKey: 82596,
      isMobile: false,
      cvvCodeRichText: null,
      orderHasShipping,
      isGuest: false,
      handleSubmit: jest.fn(),
      cardList: null,
      labels,
      paymentMethodId: 'ggg',
      backLinkPickup: '',
      backLinkShipping: '',
      nextSubmitText: '',
    };
    const component = shallow(<BillingPaymentForm {...props2} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly if  cards present and addNewCCState is true', () => {
    const props2 = {
      className: '',
      onFileCardKey: '',
      isMobile: false,
      cvvCodeRichText: null,
      orderHasShipping,
      isGuest: false,
      handleSubmit: jest.fn(),
      cardList: new List(card),
      labels,
      paymentMethodId: 'creditCard',
      backLinkPickup: '',
      backLinkShipping: '',
      nextSubmitText: '',
      syncErrorsObj: {
        syncError: {
          cvvCode: 'Enter correct code',
        },
      },
      dispatch: jest.fn(),
      change: jest.fn(),
    };
    const component = shallow(<BillingPaymentForm {...props2} />);
    component.setState({ addNewCCState: true });
    expect(component).toMatchSnapshot();
  });
  it('renders correctly if  no cards present ', () => {
    const props2 = {
      className: '',
      onFileCardKey: 82596,
      isMobile: false,
      cvvCodeRichText: null,
      orderHasShipping,
      isGuest: false,
      handleSubmit: jest.fn(),
      cardList: new List([]),
      labels,
      paymentMethodId: 'creditCard',
      backLinkPickup: '',
      backLinkShipping: '',
      nextSubmitText: '',
      syncErrorsObj: {
        syncError: {
          cvvCode: 'Correct code',
        },
      },
      dispatch: jest.fn(),
      change: jest.fn(),
      isPayPalEnabled: false,
    };
    const component = shallow(<BillingPaymentForm {...props2} />);
    component.setState({ addNewCCState: true });
    expect(component).toMatchSnapshot();
  });

  it('renders with payPal enable', () => {
    const props3 = {
      className: '',
      onFileCardKey: 82596,
      isMobile: false,
      cvvCodeRichText: null,
      orderHasShipping,
      isGuest: false,
      handleSubmit: jest.fn(),
      cardList: new List([]),
      labels,
      paymentMethodId: 'payPal',
      backLinkPickup: '',
      backLinkShipping: '',
      nextSubmitText: '',
      syncErrorsObj: {
        syncError: {
          cvvCode: 'Enter correct code',
        },
      },
      dispatch: jest.fn(),
      change: jest.fn(),
      isPayPalEnabled: true,
    };
    const component = shallow(<BillingPaymentForm {...props3} />);
    component.setState({ addNewCCState: true });
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with method onAddNewCreditCardClick', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyOnAddNewCreditCardClick = jest.spyOn(instance, 'onAddNewCreditCardClick');
    instance.onAddNewCreditCardClick();
    expect(spyOnAddNewCreditCardClick).toHaveBeenCalled();
  });
  it('renders correctly with method getCreditCardDropDown', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyOnAddNewCreditCardClick = jest.spyOn(instance, 'getCreditCardDropDown');
    instance.getCreditCardDropDown();
    expect(spyOnAddNewCreditCardClick).toHaveBeenCalled();
  });
  it('renders correctly with method onCCDropDownChange', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    component.setState({ addNewCCState: true });
    const instance = component.instance();
    const spyOnAddNewCreditCardClick = jest.spyOn(instance, 'onCCDropDownChange');
    instance.onCCDropDownChange();
    expect(spyOnAddNewCreditCardClick).toHaveBeenCalled();
  });
});
