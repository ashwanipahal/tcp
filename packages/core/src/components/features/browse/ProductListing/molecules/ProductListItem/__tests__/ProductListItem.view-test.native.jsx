import React from 'react';
import { shallow } from 'enzyme';
import ProductListItem from '../views/ProductListItem.view.native';

describe('ProductListItem component', () => {
  const props = {
    item: {
      colorsMap: [],
      productInfo: {
        name: 'tcp',
      },
    },
    badge1: '',
    badge2: '',
    badge3: '',
    listPriceForColor: 10,
    offerPriceForColor: 12,
    loyaltyPromotionMessage: '',
    onAddToBag: () => {},
    onFavorite: () => {},
  };
  it('should renders ProductListItem correctly', () => {
    const component = shallow(<ProductListItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
