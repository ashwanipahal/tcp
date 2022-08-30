import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { BillingSection } from '../BillingSection.view';

const cardMock = {
  cardNumber: '1234',
  ccType: 'PLACE CASH',
  ccBrand: 'PLACE CASH',
};
const addressMock = {
  firstName: 'Test',
  lastName: 'Test',
  addressLine1: '1234 XYZ',
  city: 'New York',
  state: 'NY',
  country: 'US',
};

const appliedGiftCardsMock = [
  {
    id: '1',
    endingNumbers: '4321',
    remainingBalance: 0,
  },
  {
    id: '2',
    endingNumbers: '1234',
    remainingBalance: 15,
  },
];

const labelsMock = {
  lbl_review_billingSectionTitle: 'Billing',
  lbl_review_paymentMethod: 'Payment Method',
  lbl_review_billingAddress: 'Billing Address',
  lbl_review_appliedGiftCards: 'Applied Gift Cards',
  lbl_review_paymentMethodEndingIn: 'ending in',
};

describe('BillingSection', () => {
  it('should render correctly for empty state', () => {
    const props = {
      card: null,
      address: null,
      appliedGiftCards: null,
      className: '',
      labels: {},
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without card details', () => {
    const props = {
      card: null,
      address: {
        ...addressMock,
      },
      appliedGiftCards: fromJS([...appliedGiftCardsMock]),
      className: '',
      labels: {
        ...labelsMock,
      },
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without address details', () => {
    const props = {
      card: {
        ...cardMock,
      },
      address: null,
      appliedGiftCards: fromJS([...appliedGiftCardsMock]),
      className: '',
      labels: {
        ...labelsMock,
      },
      isExpressCheckout: true,
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without card & address details or with gift card only', () => {
    const props = {
      card: null,
      address: null,
      appliedGiftCards: fromJS([...appliedGiftCardsMock]),
      className: '',
      labels: {
        ...labelsMock,
      },
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly without card & address details or with gift card empty', () => {
    const props = {
      card: null,
      address: null,
      appliedGiftCards: fromJS([]),
      className: '',
      labels: {
        ...labelsMock,
      },
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly without address details', () => {
    const props = {
      card: {
        ...cardMock,
      },
      address: null,
      appliedGiftCards: fromJS([...appliedGiftCardsMock]),
      className: '',
      labels: {
        ...labelsMock,
      },
      isExpressCheckout: true,
      isPaymentDisabled: true,
    };
    const tree = shallow(<BillingSection {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
