import React from 'react';
import { shallow } from 'enzyme';
import OrderSummaryDetails from '../OrderSummaryDetails.view';

describe('Order Summary Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrdersLabels: {},
    };
    const component = shallow(<OrderSummaryDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
