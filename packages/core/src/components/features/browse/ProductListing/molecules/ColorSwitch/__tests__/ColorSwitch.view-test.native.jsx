import React from 'react';
import { shallow } from 'enzyme';
import ColorSwitch from '../views/ColorSwitch.view.native';

describe('ProductAltImages component', () => {
  const props = {
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
    productInfo: {
      name: 'tcp',
    },
    setImageIndex: () => {},
  };
  it('should renders ListItem correctly', () => {
    const component = shallow(<ColorSwitch {...props} />);
    expect(component).toMatchSnapshot();
  });
});
