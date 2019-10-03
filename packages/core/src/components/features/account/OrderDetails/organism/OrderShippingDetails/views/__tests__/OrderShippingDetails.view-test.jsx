import React from 'react';
import { shallow } from 'enzyme';
import OrderShippingDetails from '../OrderShippingDetails.view';

describe('Order Shipping Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrderDetailsData: {
        checkout: {
          shippingAddress: {
            addressLine1: '234 E 149th St',
            addressLine2: 'Test',
            city: 'Bronx',
            country: 'United States',
            firstName: 'Ravi',
            lastName: 'Prasad',
            state: 'NY',
            zipCode: '10451',
          },
        },
        OrdersLabels: {},
        status: 'test status',
      },
    };
    const component = shallow(<OrderShippingDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
