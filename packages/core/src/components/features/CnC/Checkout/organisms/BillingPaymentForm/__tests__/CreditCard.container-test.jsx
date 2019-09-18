import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import { GiftCardsContainer } from '../container/CreditCard.container';
import BillingPaymentForm from '../views';

describe('GiftCardsContainer Container', () => {
  const card = [
    {
      accountNo: '************3743',
      ccBrand: 'PLACE CARD',
      ccType: 'PLACE CARD1',
      creditCardId: 82596,
      defaultInd: false,
      onFileCardKey: 82596,
      addressDetails: { phone1: '1234567891' },
    },
  ];
  const props = {
    cardList: new List(card),
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
    onFileCardKey: 82596,
    isMobile: false,
    initialValues: {},
    paymentMethodId: '',
    getCVVCodeInfo: jest.fn(),
    cvvCodeInfoContentId: '1',
    cvvCodeRichText: {},
    onSubmit: jest.fn(),
    orderHasShipping: true,
    isGuest: true,
    backLinkPickup: true,
    backLinkShipping: true,
    nextSubmitText: '',
    getCardListAction: jest.fn(),
    handleSubmit: jest.fn(),
  };

  const wrapper = shallow(<GiftCardsContainer {...props} />);
  const instance = wrapper.instance();

  it('should render CheckoutPage view section', () => {
    const tree = shallow(<GiftCardsContainer {...props} />);
    expect(tree.is(BillingPaymentForm)).toBeTruthy();
  });

  it('should render CheckoutPage view section', () => {
    const component = shallow(<GiftCardsContainer {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should render getSelectedCard view section', () => {
      instance.getSelectedCard(card, 1);
    });
    it('should render with getInitialValues', () => {
      instance.getInitialValues(null);
    });
    it('should render with submitBillingData', () => {
      instance.submitBillingData(card[0]);
    });
  });
});
