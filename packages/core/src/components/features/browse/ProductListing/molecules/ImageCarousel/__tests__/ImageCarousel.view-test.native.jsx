import React from 'react';
import { shallow } from 'enzyme';
import { ImageCarouselVanilla } from '../views/ImageCarousel.view.native';

describe('ProductAltImages component', () => {
  let component;
  const props = {
    item: {
      isFavorite: false,
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

  beforeEach(() => {
    component = shallow(<ImageCarouselVanilla {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return FlatList component value one', () => {
    expect(component.find('FlatList')).toHaveLength(1);
  });
});
