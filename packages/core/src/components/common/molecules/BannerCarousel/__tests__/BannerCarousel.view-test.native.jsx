import React from 'react';
import { shallow } from 'enzyme';
import { BannerCarouselVanilla } from '../views/BannerCarousel.view.native';

describe('BannerCarouselVanilla component', () => {
  let component;
  const props = {
    data: [],
    margins: null,
    onImageClick: () => {},
    imageWidth: 125,
    imageHeight: 250,
    getImageUrl: null,
    itemMargin: null,
    itemPadding: null,
    itemBackgroundColor: null,
    customRenderer: null,
    listLeftMargin: 8,
    listRightMargin: 30,
  };

  beforeEach(() => {
    component = shallow(<BannerCarouselVanilla {...props} />);
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
