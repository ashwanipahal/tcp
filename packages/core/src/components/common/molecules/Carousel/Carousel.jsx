/**
 * @module Carousel
 * @description - component that creates
 * carousel using third party 'react-slick'
 */

import React from 'react';
import Slider from 'react-slick';
import { PropTypes } from 'prop-types';
import config from './config';
import CarouselStyle from './CarouselStyle';

const defaults = { ...config.CAROUSEL_DEFAULTS };

const Carousel = ({ options, children }) => {
  const settings = { ...defaults, ...options };

  return (
    <CarouselStyle className="TCP_Carousel_Wrapper">
      <Slider {...settings} className="TCP_Carousel">
        {!children ? null : children}
      </Slider>
    </CarouselStyle>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
};

Carousel.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
};

export default Carousel;
