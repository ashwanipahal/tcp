import React from 'react';
import { shallow } from 'enzyme';
import OrderItems from '../OrderItem.view.native';

describe('Order Items component', () => {
  it('should renders correctly', () => {
    const props = {
      item: {
        productInfo: {
          name: 'test product',
          imagePath: 'test',
          color: 'red',
          fit: 'test',
          size: 'test',
          upc: 'test',
          pdpUrl: 'test',
        },
        itemInfo: {
          linePrice: 2.15,
          itemBrand: 'TCP',
          quantity: 1,
          quantityCanceled: false,
          listPrice: 2.25,
          offerPrice: 2.25,
        },
      },
      currencySymbol: '$',
      isShowWriteReview: 'true',
      ordersLabels: {},
    };
    const component = shallow(<OrderItems {...props} />);
    expect(component).toMatchSnapshot();
  });
});
