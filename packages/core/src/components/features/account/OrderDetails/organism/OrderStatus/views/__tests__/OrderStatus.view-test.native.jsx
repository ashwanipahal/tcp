import React from 'react';
import { shallow } from 'enzyme';
import OrderStatus from '../OrderStatus.view.native';
import constants from '../../../../OrderDetails.constants';

describe('Order Items component', () => {
  it('should renders tracking header', () => {
    const props = {
      status: constants.STATUS_CONSTANTS.ORDER_SHIPPED,
      shippedDate: 'May, 2019',
      pickUpExpirationDate: 'April, 2019',
      pickedUpDate: 'Jun, 2019',
      isBopisOrder: false,
      trackingNumber: '1234567',
    };
    const component = shallow(<OrderStatus {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders Tracking Button', () => {
    const props = {
      shippedDate: 'May, 2019',
      pickUpExpirationDate: 'April, 2020',
      pickedUpDate: 'Jun, 2019',
      isBopisOrder: false,
      trackingUrl: '/test',
    };
    const component = shallow(<OrderStatus {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should  not render Tracking Button And Tracking header', () => {
    const props = {
      shippedDate: 'May, 2019',
      pickUpExpirationDate: 'April, 2019',
      pickedUpDate: 'Jun, 2019',
      isBopisOrder: true,
      trackingUrl: '/test',
    };
    const component = shallow(<OrderStatus {...props} />);
    expect(component).toMatchSnapshot();
  });
});
