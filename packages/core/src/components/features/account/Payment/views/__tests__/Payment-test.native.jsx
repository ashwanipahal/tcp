import React from 'react';
import { shallow } from 'enzyme';
import PaymentView from '../PaymentView/views/Payment.view.native';

describe('Payment View', () => {
  it('should render correctly', () => {
    const tree = shallow(<PaymentView labels={{ giftCard: 'Payment' }} />);
    expect(tree).toMatchSnapshot();
  });
});
