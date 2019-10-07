import React from 'react';
import { shallow } from 'enzyme';
import { OrderDetailsViewVanilla } from '../OrderDetails.view';

describe('Order Summary Details component', () => {
  it('should renders correctly', () => {
    const props = {
      OrderDetailsData: {
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
});
