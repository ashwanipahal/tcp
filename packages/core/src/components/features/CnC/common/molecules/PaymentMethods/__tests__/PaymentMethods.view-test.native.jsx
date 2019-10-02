import React from 'react';
import { shallow } from 'enzyme';
import PaymentMethods from '../views/PaymentMethods.view.native';

const paymentMethods = [
  { id: 'creditCard', displayName: 'Credit Card' },
  { id: 'payPal', displayName: 'Pay Pal' },
  { id: 'venmo', displayName: 'Venmo' },
];

describe('ButtonList component', () => {
  const props = {
    className: '',
    paymentHeader: '',
    labels: {},
    paymentMethods,
  };

  it('renders correctly without props', () => {
    const component = shallow(<PaymentMethods {...props} />);
    expect(component).toMatchSnapshot();
  });
});
