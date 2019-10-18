import React from 'react';
import { shallow } from 'enzyme';
import OrderDetailsView from '../OrderDetails.view';
import constants from '../../OrderDetails.constants';

describe('Order Summary Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrderDetailsData: {
        orderStatus: constants.STATUS_CONSTANTS.ORDER_RECEIVED,
        shippedDate: '2019-10-09',
        purchasedItems: [],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: false,
        ordersLabels: {},
        orderType: 'ECOM',
      },
    };

    const component = shallow(<OrderDetailsView {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders BOSSOrder and Bopis orders', () => {
    const props = {
      OrderDetailsData: {
        orderStatus: constants.STATUS_CONSTANTS.ORDER_RECEIVED,
        pickedUpDate: '2019-10-09',
        purchasedItems: [],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: true,
        ordersLabels: {},
      },
    };

    const component = shallow(<OrderDetailsView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
