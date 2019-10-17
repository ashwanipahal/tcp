import React from 'react';
import { shallow } from 'enzyme';
import { OrdersListItemVanilla, handleOrderClick } from '../views/OrdersListItem.view.native';

describe('OrdersListItem component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {},
    };
    const component = shallow(<OrdersListItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly', () => {
    const props = {
      labels: {},
      orderItem: {
        currencySymbol: '$',
        isBOSSOrder: false,
        isCanadaOrder: false,
        isEcomOrder: true,
        orderDate: 'Oct 4, 2019',
        orderNumber: '7000037172',
        orderStatus: 'lbl_orders_statusNa',
        orderTotal: '$24.95',
        orderTracking: 'N/A',
      },
    };
    const component = shallow(<OrdersListItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call handleComponentChange', () => {
    let component;
    let route;
    const handleComponentChange = (handleKey, routingObj) => {
      component = handleKey;
      route = routingObj;
    };
    handleOrderClick(handleComponentChange, '7000050028');
    expect(component).toEqual('orderDetailsPageMobile');
    expect(route).toEqual({ router: { query: { orderId: '7000050028' } } });
  });
});
