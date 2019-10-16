import React from 'react';
import { shallow } from 'enzyme';
import OrderShippingDetails from '../OrderShippingDetails.view';

describe('Order Shipping Details component', () => {
  it('should renders correctly with ECOM order', () => {
    const props = {
      orderDetailsData: {
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
        ordersLabels: {},
        status: 'test status',
      },
    };
    const component = shallow(<OrderShippingDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly with BOSS/BOPIS order', () => {
    const props = {
      orderDetailsData: {
        checkout: {
          pickUpStore: {
            basicInfo: {
              storeName: '28152 paseo drive',
            },
            address: {
              addressLine1: '234 E 149th St',
              city: 'Bronx',
              state: 'NY',
              zipCode: '10451',
            },
          },
          pickUpPrimary: {
            firstName: 'User1',
            lastName: 'User2',
          },
        },
        ordersLabels: {},
      },
    };
    const component = shallow(<OrderShippingDetails {...props} />);
    expect(component).toMatchSnapshot();
  });
});
