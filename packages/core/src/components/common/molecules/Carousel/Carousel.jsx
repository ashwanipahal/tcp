/**
 * @module Carousel
 * @description - component that creates
 * carousel using third party 'react-slick'
 */

import React from 'react';
import Slider from 'react-slick';
import { PropTypes } from 'prop-types';
import config from './config';
import CarouselStyle from './Carousel.style';
import withStyles from '../../hoc/withStyles';

const defaults = { ...config.CAROUSEL_DEFAULTS };

const Carousel = ({ options, children, carouselConfig }) => {
  const settings = { ...defaults, ...options };

  return (
    <CarouselStyle className="TCP_Carousel_Wrapper" carouselConfig={carouselConfig}>
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
  carouselConfig: PropTypes.objectOf(PropTypes.string),
};

Carousel.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
  carouselConfig: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(Carousel, CarouselStyle);
export { Carousel as CarouselVanilla };
