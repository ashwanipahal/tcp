/**
 * @module Carousel
 * @description - component that creates
 * carousel using third party 'react-slick'
 */

import React from 'react';
import Slider from 'react-slick';
import { PropTypes } from 'prop-types';
import config from './config';

const defaults = { ...config.CAROUSEL_DEFAULTS };

const Carousel = ({ options, children }) => {
  const settings = { ...defaults, ...options };
  return (
    <Slider {...settings} className="TCP_Carousel">
      {!children ? null : children}
    </Slider>
  );
};

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number.isRequired,
  }).isRequired,
};

export default Carousel;
