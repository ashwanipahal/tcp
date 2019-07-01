/**
 * @module Carousel
 * @description - component that creates
 * carousel using third party 'react-slick'
 */

import React from 'react';
import Slider from 'react-slick';
import { PropTypes } from 'prop-types';
import config from './config';
import { Image } from '../../atoms';
import { getIconPath } from '../../../../utils';
import CarouselStyle from './Carousel.style';
import withStyles from '../../hoc/withStyles';
import errorBoundary from '../../hoc/errorBoundary';

const defaults = { ...config.CAROUSEL_DEFAULTS };

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.slider = null;
    this.getSlider = this.getSlider.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.state = {
      autoplay: true,
    };
  }

  getSlider(element) {
    this.slider = element;
  }

  play() {
    this.slider.slickPlay();
    this.updateState();
  }

  pause() {
    this.slider.slickPause();
    this.updateState();
  }

  updateState() {
    const { autoplay } = this.state;
    this.setState({ autoplay: !autoplay });
  }

  render() {
    const { options, children, carouselConfig } = this.props;
    const settings = { ...defaults, ...options };
    const { autoplay } = this.state;
    return (
      <CarouselStyle className="TCP_Carousel_Wrapper" carouselConfig={carouselConfig}>
        <Slider className="TCP_Carousel" ref={this.getSlider} {...settings}>
          {!children ? null : children}
        </Slider>
        {carouselConfig.autoplay ? (
          <Image
            className="TCP_Carousel__play"
            data-locator={carouselConfig.dataLocator}
            src={getIconPath(autoplay ? 'icon-pause' : 'icon-play')}
            onClick={autoplay ? this.pause : this.play}
          />
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
  carouselConfig: PropTypes.objectOf(PropTypes.object),
};

Carousel.defaultProps = {
  children: PropTypes.arrayOf(PropTypes.shape({})),
  options: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
  carouselConfig: { type: 'light', arrow: 'none' },
};

export default errorBoundary(withStyles(Carousel, CarouselStyle));
export { Carousel as CarouselVanilla };
