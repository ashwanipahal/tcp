import React from 'react';
import { shallow } from 'enzyme';

import { ProductImagesVanilla } from '../views/ProductImages.view';

describe('ProductImages component', () => {
  it('should renders correctly', () => {
    const props = {
      isZoomEnabled: true,
      pdpLabels: {},
      images: [
        {
          isOnModalImage: false,
          iconSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2082931_IV.jpg',
          listingSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2082931_IV.jpg',
          regularSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2082931_IV.jpg',
          bigSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV.jpg',
          superSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV.jpg',
        },
        {
          isOnModalImage: false,
          iconSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/125/2082931_IV-1.jpg',
          listingSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/380/2082931_IV-1.jpg',
          regularSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2082931_IV-1.jpg',
          bigSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV-1.jpg',
          superSizeImageUrl:
            'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/900/2082931_IV-1.jpg',
        },
      ],
      isThumbnailListVisible: true,
      productName: 'Girls Uniform Active Shorts',
    };
    const component = shallow(<ProductImagesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
