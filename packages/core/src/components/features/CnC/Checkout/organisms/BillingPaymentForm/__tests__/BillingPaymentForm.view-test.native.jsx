import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { BillingPaymentForm } from '../views/BillingPaymentForm.view.native';

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
  paymentMethod: 'Payment Method',
  lbl_billing_creditCard: 'Credit Card',
  lbl_billing_selectFromCard: 'Select from card on file',
  lbl_billing_addCreditHeading: '+ Add a new Credit Card',
  lbl_billing_default: 'Default',
  lbl_billing_cardDetailsTitle: 'Card Details',
  edit: 'Edit',
  creditCardEnd: 'ending in ',
  cvvCode: 'CVV Code',
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
    scrollView: { scrollTo: jest.fn() },
  };

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly without props', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with method onAddNewCreditCardClick', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyOnAddNewCreditCardClick = jest.spyOn(instance, 'onAddNewCreditCardClick');
    instance.onAddNewCreditCardClick();
    expect(spyOnAddNewCreditCardClick).toHaveBeenCalled();
  });

  it('renders correctly with method getCreditListView', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyGetCreditListView = jest.spyOn(instance, 'getCreditListView');
    instance.getCreditListView({ labels });
    expect(spyGetCreditListView).toHaveBeenCalled();
  });

  it('renders correctly with method getPaymentMethod', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyGetPaymentMethod = jest.spyOn(instance, 'getPaymentMethod');
    instance.getPaymentMethod({ labels: {} });
    expect(spyGetPaymentMethod).toHaveBeenCalled();
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
      syncErrorsObj: {
        syncError: {
          cvvCode: 'Enter correct code',
        },
      },
      dispatch: jest.fn(),
      change: jest.fn(),
    };
    const component = shallow(<BillingPaymentForm {...props2} />);
    component.setState({ addNewCCState: true, editMode: true });
    expect(component).toMatchSnapshot();
  });
  it('renders correctly if  no cards present ', () => {
    const props2 = {
      className: '',
      onFileCardKey: '',
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
          cvvCode: 'Enter correct code',
        },
      },
      dispatch: jest.fn(),
      change: jest.fn(),
    };
    const component = shallow(<BillingPaymentForm {...props2} />);
    component.setState({ addNewCCState: true });
    expect(component).toMatchSnapshot();
    const instance = component.instance();
    const spyRenderCVVField = jest.spyOn(instance, 'renderCVVField');
    const label = {};
    instance.renderCVVField({ labels: label, selectedCard: card[0] });
    expect(spyRenderCVVField).toHaveBeenCalled();
  });
  it('renders correctly without props with editmode', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    component.setState({ editMode: true });
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with method getAddNewCCForm with editmode', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyGetCreditListView = jest.spyOn(instance, 'getAddNewCCForm');
    const onCardFocus = jest.fn();
    instance.getAddNewCCForm({ onCardFocus, editMode: true });
    expect(spyGetCreditListView).toHaveBeenCalled();
  });
  it('renders correctly with method getCheckoutBillingAddress with editmode', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyGetCreditListView = jest.spyOn(instance, 'getCheckoutBillingAddress');
    instance.getCheckoutBillingAddress({ editMode: true });
    expect(spyGetCreditListView).toHaveBeenCalled();
  });

  it('renders correctly with method unsetFormEditState', () => {
    const component = shallow(<BillingPaymentForm {...props} />);
    const instance = component.instance();
    const spyGetCreditListView = jest.spyOn(instance, 'unsetFormEditState');
    instance.unsetFormEditState();
    expect(spyGetCreditListView).toHaveBeenCalled();
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
