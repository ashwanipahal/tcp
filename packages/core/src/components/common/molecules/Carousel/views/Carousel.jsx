// @flow
import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import config from '../Carousel.config';
import { Image } from '../../../atoms';
import { getIconPath } from '../../../../../utils';
import CarouselStyle from '../Carousel.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';

const defaults = { ...config.CAROUSEL_DEFAULTS };

/**
 * @function Carousel component that creates carousel using
 * third party 'react-slick'
 */
class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.slider = null;
    this.getSlider = this.getSlider.bind(this);
    this.getPlayButton = this.getPlayButton.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.state = {
      autoplay: true,
      loopCompleted: 0,
    };
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps = nextProps => {
    const { sliderImageIndex } = nextProps;
    const { sliderImageIndex: sliderImage } = this.props;
    if (sliderImageIndex !== sliderImage) {
      this.slider.slickGoTo(sliderImageIndex);
    }
  };

  /**
   * @function getSlider function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getSlider(element) {
    this.slider = element;
    return this.slider;
  }

  /**
   * @function getPlayComponent function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getPlayButton(wrapperConfig) {
    const { autoplay } = this.state;
    const {
      playIconButtonLabel,
      pauseIconButtonLabel,
      dataLocatorPause,
      dataLocatorPlay,
    } = wrapperConfig;

    const buttonClass = 'tcp_carousel__play_pause_button';
    return autoplay ? (
      <button
        className={buttonClass}
        data-locator={dataLocatorPause}
        onClick={this.pause}
        aria-label={pauseIconButtonLabel}
      >
        <Image
          className="tcp_carousel__play_pause_button_icon"
          aria-hidden="true"
          src={getIconPath('icon-pause')}
        />
      </button>
    ) : (
      <button
        className={buttonClass}
        data-locator={dataLocatorPlay}
        onClick={this.play}
        aria-label={playIconButtonLabel}
      >
        <Image
          className="tcp_carousel__play_pause_button_icon"
          aria-hidden="true"
          src={getIconPath('icon-play')}
        />
      </button>
    );
  }

  appendDots = dots => {
    const { carouselConfig, options } = this.props;
    return (
      <div>
        {/*
          carouselConfig.autoplay has been used to show/hide play icon only, the auto slide will
          still work. However, the options.autoplay has been used to stop the auto sliding of the carousel.
         */}
        {carouselConfig.autoplay && options.autoplay && this.getPlayButton(carouselConfig)}
        {options.dots && <ul>{dots}</ul>}
      </div>
    );
  };

  /**
   * @function play function enable autoplay for carousel
   * also update component state.
   */
  play() {
    this.slider.slickPlay();
    this.togglePlay();
  }

  /**
   * @function pause function stops/pause autoplay for carousel
   * also update component state.
   */
  pause() {
    this.slider.slickPause();
    this.togglePlay();
  }

  /**
   * @function updateState function updates component state
   * after each click on play pause button.
   */
  togglePlay() {
    const { autoplay } = this.state;
    this.setState({ autoplay: !autoplay });
  }

  /**
   * @function afterChange pause autoplay after max loop count completed
   */
  afterChange = i => {
    const {
      options: { maxLoopCount },
    } = this.props;
    const { autoplay } = this.state;
    let { loopCompleted } = this.state;
    if (maxLoopCount && autoplay) {
      if (loopCompleted >= maxLoopCount) {
        this.pause();
        this.setState({
          autoplay: false,
        });
        return;
      }
      if (i === this.slider.props.children.length - 1) {
        loopCompleted += 1;
        this.setState({
          loopCompleted,
        });
      }
    }
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param {object} options Customized caroused configs from parent wrapper
   * @param {node} children address object
   * @param {object} carouselConfig Carousel wrapper config to enable customization
   * of functionalities like play pause, change carousel theme etc.
   */
  render() {
    const { options, children, carouselConfig, className, labels } = this.props;
    const { maxLoopCount, ...otherOptions } = options;

    const settings = {
      appendDots: this.appendDots,
      ...defaults,
      ...otherOptions,
      prevArrow: <button aria-label={labels && labels.accessibility.ariaPrevious} />,
      nextArrow: <button aria-label={labels && labels.accessibility.ariaNext} />,
      /*
         The dots will be created on both cases. we need this as we are putting custom play/pause
         inside the slick-dots container. So, if some cases if dots not required and we will be able
         render play/pause button or vice-versa. Also check this.getPlayButton()
        */
      dots: options.dots || options.autoplay,
    };

    return (
      <div
        className={`${className} tcp_carousel_wrapper`}
        carouselConfig={carouselConfig}
        data-locator={carouselConfig.dataLocatorCarousel}
      >
        <Slider
          className="tcp_carousel"
          ref={this.getSlider}
          {...settings}
          afterChange={this.afterChange}
        >
          {!children ? null : children}
        </Slider>
      </div>
    );
  }
}

Carousel.propTypes = {
  options: PropTypes.shape({}).isRequired,
  nextProps: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
  carouselConfig: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  playIconButtonLabel: PropTypes.string.isRequired,
  pauseIconButtonLabel: PropTypes.string.isRequired,
  sliderImageIndex: PropTypes.number.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(errorBoundary(Carousel), CarouselStyle);
export { Carousel as CarouselVanilla };
