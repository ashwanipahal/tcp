import React from 'react';
import { shallow } from 'enzyme';
import Slider from 'react-slick';

import { CarouselVanilla } from '../views/Carousel';

const playButton = '.tcp_carousel__play_pause_button';
describe('Carousel component', () => {
  const CarouselTest = new CarouselVanilla();
  beforeEach(() => {
    CarouselTest.setState = jest.fn();
  });

  it.skip('renders correctly', () => {
    expect(CarouselTest).toMatchSnapshot();
  });

  it('show play button if autoplay: true prop is passed', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
        autoplay: true,
      },
      carouselConfig: {
        autoplay: true,
      },
    };
    const wrapper = shallow(<CarouselVanilla {...props} />);
    const Dots = wrapper.find(Slider).props().appendDots;
    const dotsWrapper = shallow(<Dots />);

    expect(dotsWrapper.find(playButton)).toHaveLength(1);
  });

  it('hide play button if autoplay: tasdrue prop is passed', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
        autoplay: true,
        maxLoopCount: 1,
      },
      carouselConfig: {
        autoplay: true,
      },
    };
    const wrapper = shallow(
      <CarouselVanilla {...props}>
        <div />
        <div />
      </CarouselVanilla>
    );
    const slider = wrapper.find(Slider);
    wrapper.instance().slider = slider;
    wrapper.instance().slider.props = slider.props();
    slider.props.afterChange(1);
    expect(wrapper.state('loopCompleted')).toBe(1);
  });

  it('hide play button if autoplay: true prop is passed', () => {
    const props = {
      options: {
        accessibility: true,
        autoplaySpeed: 3000,
        dots: false,
        autoplay: true,
      },
      carouselConfig: {
        autoplay: false,
      },
    };
    const wrapper = shallow(<CarouselVanilla {...props} />);
    const Dots = wrapper.find(Slider).props().appendDots;
    const dotsWrapper = shallow(<Dots />);

    expect(dotsWrapper.find(playButton)).toHaveLength(0);
  });

  it('togglePlay function working properly', () => {
    CarouselTest.togglePlay();
    expect(CarouselTest.setState.mock.calls.length).toBe(1);
  });
});
