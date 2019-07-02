import React from 'react';
import { shallow } from 'enzyme';
import { CarouselVanilla } from '../Carousel';

const playButton = '.TCP_Carousel__play';
describe('Carousel component', () => {
  it('renders correctly', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
      },
      carouselConfig: {
        autoplay: true,
      },
    };
    const component = shallow(<CarouselVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('show play button if autoplay: true prop is passed', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
      },
      carouselConfig: {
        autoplay: true,
      },
    };
    const component = shallow(<CarouselVanilla {...props} />);
    expect(component.find(playButton)).toHaveLength(1);
  });

  it('do not show play button if autoplay: false prop is passed', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
      },
      carouselConfig: {
        autoplay: false,
      },
    };
    const component = shallow(<CarouselVanilla {...props} />);
    expect(component.find(playButton)).toHaveLength(0);
  });
});
