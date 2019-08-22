import React from 'react';
import { shallow } from 'enzyme';
import { ProductAltImagesVanilla } from '../views/ProductAltImages';

describe('ProductAltImages component', () => {
  const props = {
    pdpUrl: 'url',
    videoUrl: 'url',
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
    keepAlive: false,
    videoError: false,
  };
  it('should renders renderVideoContent correctly', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders renderImageContent correctly', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} videoUrl={false} />);
    expect(component).toBeTruthy();
  });
  it('ProductAltImages should call handledNextImage', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    component.instance().handledNextImage();
  });
  it('ProductAltImages should call handledPrevImage', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    component.instance().handledPrevImage();
  });
  it('ProductAltImages should call handleNextImage', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    component.instance().handleNextImage();
  });
  it('ProductAltImages should call renderVideoContent', () => {
    const component = shallow(<ProductAltImagesVanilla {...props} />);
    component.instance().renderVideoContent();
  });
});
