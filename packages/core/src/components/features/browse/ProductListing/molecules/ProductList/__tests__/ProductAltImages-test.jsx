import React from 'react';
import { shallow } from 'enzyme';
import { ProductAltImagesVanilla } from '../views/ProductAltImages';

describe('ProductAltImages component', () => {
  it('should renders correctly', () => {
    const props = {
      pdpUrl: '',
      videoUrl: '',
      loadedProductCount: 2,
      imageUrls: [1, 2],
      isMobile: true,
      isShowVideoOnPlp: false,
      productName: '',
      onImageChange: jest.fn(),
      colorsMap: [{}],
      analyticsData: {
        pId: 1,
        prank: 1,
        requestId: 1,
      },
      isPLPredesign: false,
      keepAlive: true,
    };
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
