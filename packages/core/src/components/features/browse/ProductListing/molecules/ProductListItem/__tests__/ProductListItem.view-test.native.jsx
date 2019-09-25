import React from 'react';
import { shallow } from 'enzyme';
import { ListItemVanilla } from '../views/ProductListItem.view.native';

describe('ProductListItem component', () => {
  const props = {
    item: {
      colorsMap: [
        {
          colorProductId: '3001084_IV',
          imageName: '3001084_IV',
          miscInfo: {},
          color: {
            name: 'TIDAL',
            imagePath: '',
          },
        },
      ],
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
    const component = shallow(<ListItemVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
