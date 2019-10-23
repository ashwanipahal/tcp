import React from 'react';
import { shallow } from 'enzyme';
import { OrderDetailsViewVanilla } from '../OrderDetails.view';
import constants from '../../OrderDetails.constants';

describe('Order Summary Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrderDetailsData: {
        orderStatus: constants.STATUS_CONSTANTS.ORDER_RECEIVED,
        shippedDate: '2019-10-09',
        trackingNumber: '123455',
        trackingUrl: '/test',
        purchasedItems: [
          {
            items: [
              {
                itemInfo: {
                  itemBrand: 'TCP',
                  linePrice: 24.94,
                  listPrice: 24.94,
                  offerPrice: 24.94,
                  quantity: 1,
                  quantityCanceled: 0,
                  quantityOOS: 0,
                  quantityReturned: 0,
                  quantityShipped: 0,
                },
              },
            ],
          },
        ],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: false,
        ordersLabels: {},
        orderType: 'ECOM',
      },
    };

    const component = shallow(<OrderDetailsViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders BOSSOrder and Bopis orders', () => {
    const props = {
      OrderDetailsData: {
        orderStatus: constants.STATUS_CONSTANTS.ORDER_RECEIVED,
        pickedUpDate: '2019-10-09',
        purchasedItems: [
          {
            items: [
              {
                itemInfo: {
                  itemBrand: 'TCP',
                  linePrice: 24.94,
                  listPrice: 24.94,
                  offerPrice: 24.94,
                  quantity: 1,
                  quantityCanceled: 0,
                  quantityOOS: 0,
                  quantityReturned: 0,
                  quantityShipped: 0,
                },
              },
            ],
          },
        ],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: true,
        ordersLabels: {},
      },
    };

    const component = shallow(<OrderDetailsViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders Out of Stock items', () => {
    const props = {
      OrderDetailsData: {
        outOfStockItems: [
          {
            itemInfo: {
              itemBrand: 'TCP',
              linePrice: 24.94,
              listPrice: 24.94,
              offerPrice: 24.94,
              quantity: 1,
              quantityCanceled: 0,
              quantityOOS: 0,
              quantityReturned: 0,
              quantityShipped: 0,
            },
          },
        ],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: false,
        ordersLabels: {},
      },
    };

    const component = shallow(<OrderDetailsViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders CanceledItems items', () => {
    const props = {
      OrderDetailsData: {
        canceledItems: [
          {
            itemInfo: {
              itemBrand: 'TCP',
              linePrice: 24.94,
              listPrice: 24.94,
              offerPrice: 24.94,
              quantity: 1,
              quantityCanceled: 0,
              quantityOOS: 0,
              quantityReturned: 0,
              quantityShipped: 0,
            },
          },
        ],
        summary: {
          currencySymbol: '$',
        },
        isBopisOrder: false,
        ordersLabels: {},
      },
    };

    const component = shallow(<OrderDetailsViewVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
