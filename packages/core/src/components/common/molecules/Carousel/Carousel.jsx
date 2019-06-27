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

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.slider = null;
    this.getSlider = this.getSlider.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
    this.state = {
      play: true,
    };
  }

  getSlider(element) {
    this.slider = element;
  }

  play() {
    this.slider.slickPlay();
  }

  pause() {
    this.slider.slickPause();
  }

  toggleAutoplay() {
    const { play } = this.state;
    if (play) {
      this.play();
    } else {
      this.pause();
    }
  }

  render() {
    const { autoplay, options, children, carouselConfig } = this.props;
    const settings = { ...defaults, ...options };
    const { play } = this.state;
    return (
      <CarouselStyle className="TCP_Carousel_Wrapper" carouselConfig={carouselConfig}>
        <Slider className="TCP_Carousel" ref={this.getSlider} {...settings}>
          {!children ? null : children}
        </Slider>
        {autoplay ? (
          <button className="button" onClick={this.toggleAutoplay}>
            {play ? 'Pause' : 'Play'}
          </button>
        ) : null}
      </CarouselStyle>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
  autoplay: PropTypes.bool,
  carouselConfig: PropTypes.objectOf(PropTypes.string),
};

Carousel.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
  autoplay: PropTypes.bool,
  carouselConfig: PropTypes.objectOf(PropTypes.string),
};

export default withStyles(Carousel, CarouselStyle);
export { Carousel as CarouselVanilla };
