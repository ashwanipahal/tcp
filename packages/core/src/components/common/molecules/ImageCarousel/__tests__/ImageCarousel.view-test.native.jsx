import React from 'react';
import { shallow } from 'enzyme';
import { ImageCarouselVanilla } from '../views/ImageCarousel.view.native';

describe('ImageCarouselVanilla component', () => {
  let component;
  const props = {
    imageUrls: [
      'imageUrls22222-',
      [
        {
          listingSizeImageUrl: '2062403/2062403_908.jpg',
        },
      ],
    ],
    margins: null,
    onImageClick: () => {},
    imageWidth: 103,
    imageHeight: 127,
    getActiveIndex: null,
    setActiveIndex: 0,
    imageUrlKey: 'listingSizeImageUrl',
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

  it('should return styled view component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });

  it('should return flat list view component value one', () => {
    expect(component.find('FlatList')).toHaveLength(1);
  });
});
