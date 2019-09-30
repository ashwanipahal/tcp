import React from 'react';
import { shallow } from 'enzyme';
import PaymentMethodTypes from '../views/PaymentMethodTypes.view.native';

describe('SPayment Method Types', () => {
  it('should render correctly', () => {
    const props = {
      title: '',
      onPress: () => {},
      id: null,
      selectedPaymentId: null,
      index: null,
    };
    const tree = shallow(<PaymentMethodTypes {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with props', () => {
    const props = {
      title: '',
      onPress: () => {},
      id: 'payPal',
      selectedPaymentId: 'payPal',
      index: null,
    };
    const tree = shallow(<PaymentMethodTypes {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with props venmo', () => {
    const props = {
      title: '',
      onPress: () => {},
      id: 'venmo',
      selectedPaymentId: 'venmo',
      index: null,
    };
    const tree = shallow(<PaymentMethodTypes {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
