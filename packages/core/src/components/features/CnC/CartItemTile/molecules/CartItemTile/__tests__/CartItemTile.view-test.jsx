import React from 'react';
import { shallow } from 'enzyme';
import CartItemTile from '../views/CartItemTile.view';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const props = {
      productDetail: {
        name: 'Boys Basic Skinny Jeans',
        qty: '1',
        size: '1',
        price: 123,
        myPlacePoints: 123,
        isGiftItem: true,
        fit: 'regular',
      },
      labels: {
        color: 'Color',
        sizeL: 'Size',
        qty: 'Qty',
        design: 'Design',
        price: 'Price',
      },
    };
    const component = shallow(<CartItemTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
