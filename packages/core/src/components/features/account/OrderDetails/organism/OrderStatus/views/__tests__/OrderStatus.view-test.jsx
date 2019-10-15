import React from 'react';
import { shallow } from 'enzyme';
import OrderStatus from '../OrderStatus.view';
import constants from '../../../../OrderDetails.constants';

describe('Order Items component', () => {
  it('should renders correctly', () => {
    const props = {
      status: constants.STATUS_CONSTANTS.ORDER_RECEIVED,
      shippedDate: 'May, 2019',
      pickUpExpirationDate: 'April, 2019',
      pickedUpDate: 'Jun, 2019',
      isBopisOrder: false,
      trackingUrl: '/test',
      trackingNumber: '1234567',
    };
    const component = shallow(<OrderStatus {...props} />);
    expect(component).toMatchSnapshot();
  });
});
