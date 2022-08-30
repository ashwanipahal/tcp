import React from 'react';
import { shallow } from 'enzyme';
import { ImageCarouselVanilla } from '../views/ImageCarousel.view.native';

describe('ImageCarouselVanilla component', () => {
  const props = {
    selectedColorProductId: 1281561,
    item: {
      colorFitsSizesMap: [
        {
          color: {
            name: 'TIDAL',
            imagePath:
              'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/swatches/3000789_IV.jpg',
            family: 'BLUE',
          },
          pdpUrl: '/p/3000789_IV',
          colorProductId: '1281561',
          colorDisplayId: '3000789_IV',
          categoryEntity: 'Girl:School Uniforms:Tops',
          fits: [
            {
              fitNameVal: '',
              isDefault: true,
              maxAvailable: 1.7976931348623157e308,
              sizes: [
                {
                  sizeName: 'XS (4)',
                  skuId: '1281977',
                  listPrice: 26.95,
                  offerPrice: 26.95,
                  maxAvailable: 262,
                  variantId: '00193511089371',
                  variantNo: '3000789019',
                  position: 0,
                },
              ],
            },
          ],
          listPrice: 26.95,
          offerPrice: 26.95,
        },
      ],
      imagesByColor: {
        BLACK: {
          basicImageUrl:
            'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3000789_01.jpg',
          extraImages: [
            {
              isOnModalImage: false,
              iconSizeImageUrl:
                'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/3000789_01.jpg',
              listingSizeImageUrl:
                'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/3000789_01.jpg',
              regularSizeImageUrl:
                'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/3000789_01.jpg',
              bigSizeImageUrl:
                'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/3000789_01.jpg',
              superSizeImageUrl:
                'https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/3000789_01.jpg',
            },
          ],
        },
      },
    },
  };
  it('should renders ImageCarouselVanilla correctly', () => {
    const component = shallow(<ImageCarouselVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
