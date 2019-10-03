import React from 'react';
import { shallow } from 'enzyme';
import OrderBillingDetails from '../OrderBillingDetails.view';

describe('Order Billing Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrdersLabels: {},
      className: '',
    };
    const component = shallow(<OrderBillingDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
