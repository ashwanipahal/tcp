import React from 'react';
import { shallow } from 'enzyme';
import { CarouselVanilla } from '../Carousel';

describe('Carousel component', () => {
  it('renders correctly', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
      },
    };
    const component = shallow(<CarouselVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
