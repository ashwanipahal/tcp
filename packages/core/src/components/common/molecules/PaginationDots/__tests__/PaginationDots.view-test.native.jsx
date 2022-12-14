import React from 'react';
import { shallow } from 'enzyme';
import { PaginationDotsVanilla } from '../views/PaginationDots.view.native';

describe('ProductAltImages component', () => {
  const props = {
    item: {
      colorsMap: [
        {
          colorProductId: '3000785_10',
          imageName: '3000785_10',
          miscInfo: {
            isClearance: '',
            isBopisEligible: true,
            isBossEligible: true,
            badge1: {},
            badge2: 'Extended Sizes',
            badge3: '50% OFF',
            videoUrl: '',
            hasOnModelAltImages: false,
            listPrice: 16.95,
            offerPrice: 8.48,
            keepAlive: false,
          },
          color: {
            name: 'WHITE',
            imagePath: '/wcsstore/GlobalSAS/images/tcp/products/swatches/3000785_10.jpg',
          },
        },
      ],
      imagesByColor: {
        WHITE: {
          basicImageUrl: '/wcsstore/GlobalSAS/images/tcp/products/500/3000785_10.jpg',
          extraImages: [
            {
              isOnModalImage: false,
              iconSizeImageUrl: '/wcsstore/GlobalSAS/images/tcp/products/125/3000785_10.jpg',
            },
          ],
        },
      },
      productInfo: {
        name: 'tcp',
        pdpUrl: '/p/Girls-Uniform-Short-Sleeve-Ruffle-Pique-Polo-2044391-10',
      },
    },
    imageIndex: 0,
  };
  it('should renders ListItem correctly', () => {
    const component = shallow(<PaginationDotsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
