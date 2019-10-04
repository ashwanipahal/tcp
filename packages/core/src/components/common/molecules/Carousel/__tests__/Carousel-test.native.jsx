import React from 'react';
import { shallow } from 'enzyme';
import { SnapCarouselVanilla } from '@tcp/core/src/components/common/molecules/Carousel/views/Carousel.native';

describe('Carousel component Native', () => {
  it('state should be set as false if autoplay props is false', () => {
    const props = {
      autoplay: false,
      data: [],
    };
    const wrapper = shallow(<SnapCarouselVanilla {...props} />);
    expect(wrapper.state('autoplay')).toBe(false);
  });

  it('state should be set as true if no autoplay props', () => {
    const props = {};
    const wrapper = shallow(<SnapCarouselVanilla {...props} />);
    expect(wrapper.state('autoplay')).toBe(true);
  });
});
