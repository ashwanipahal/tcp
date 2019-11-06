import React from 'react';
import { shallow } from 'enzyme';
import OrderPreviewItem from '../OrderPreviewItem.view';

describe('Order Items component', () => {
  it('should renders correctly', () => {
    const props = {
      item: {
        productInfo: {
          name: 'test product',
          imagePath: 'test',
        },
        itemInfo: {
          itemBrand: 'TCP',
          quantity: 1,
          quantityCanceled: false,
        },
      },
      ordersLabels: {},
      isCanceledList: {},
    };
    const component = shallow(<OrderPreviewItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
