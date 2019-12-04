import React from 'react';
import { shallow } from 'enzyme';
import ProductTile from '../ProductTile';

describe('ProductTile', () => {
  it('should render component', () => {
    const item = {
      imagename: 'image.png',
      product_name: 'Test Product',
      min_offer_price: '10',
      min_list_price: '20',
    };
    const component = shallow(<ProductTile item={item} />);
    expect(component).toMatchSnapshot();
  });
});
