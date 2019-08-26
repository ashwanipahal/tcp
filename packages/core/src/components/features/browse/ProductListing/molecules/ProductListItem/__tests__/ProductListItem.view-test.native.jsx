import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../views/ProductListItem.view.native';

describe('ProductAltImages component', () => {
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
  it('should renders ListItem correctly', () => {
    const component = shallow(<ListItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
