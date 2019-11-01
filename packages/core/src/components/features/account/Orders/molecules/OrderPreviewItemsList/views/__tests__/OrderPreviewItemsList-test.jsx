import React from 'react';
import { shallow } from 'enzyme';
import OrderPreviewItemsList from '../OrderPreviewItemsList.view';

describe('Order Items component', () => {
  it('should renders correctly', () => {
    const props = {
      items: [
        {
          orderGroup: {
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
          productInfo: {
            color: {
              name: 'DAYBREAK',
              imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/2044394_627.jpg',
            },
            fit: null,
            imagePath:
              '//uatlive4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2044394_627.jpg',
            name: 'Girls Uniform Long Sleeve Polo Dress',
            pdpUrl:
              'http://uatlive4.childrensplace.com/us/p/Girls-Uniform-Long-Sleeve-Polo-Dress-2044394-627',
            size: 'XL (14)',
            upc: '00889705122527',
          },
        },
      ],
    };
    const component = shallow(<OrderPreviewItemsList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
