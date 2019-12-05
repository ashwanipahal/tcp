// @flow
import React from 'react';
import Slider from 'react-slick';
import config from '../Carousel.config';
import { Image } from '../../../atoms';
import { getIconPath } from '../../../../../utils';
import CarouselStyle from '../Carousel.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/withErrorBoundary';

const defaults = { ...config.CAROUSEL_DEFAULTS };

type Props = {
  options: Object,
  nextProps: Object,
  children: any,
  carouselConfig: Object,
  className: String,
  playIconButtonLabel: String,
  pauseIconButtonLabel: String,
  sliderImageIndex: number,
};

type State = {
  autoplay: boolean,
  uniqueId: number,
};

/**
 * @function Carousel component that creates carousel using
 * third party 'react-slick'
 */
class Carousel extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    (this: any).slider = null;
    (this: any).getSlider = this.getSlider.bind(this);
    (this: any).getPlayButton = this.getPlayButton.bind(this);
    (this: any).play = this.play.bind(this);
    (this: any).pause = this.pause.bind(this);
    this.state = {
      autoplay: true,
      uniqueId: Math.random(),
      loopCompleted: 0,
    };
  }

  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps = (nextProps: Object) => {
    const { sliderImageIndex } = nextProps;
    const { sliderImageIndex: sliderImage } = this.props;
    if (sliderImageIndex !== sliderImage) {
      (this: any).slider.slickGoTo(sliderImageIndex);
    }
  };

  /**
   * @function getSlider function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getSlider(element: SyntheticKeyboardEvent<*>) {
    (this: any).slider = element;
    return (this: any).slider;
  }

  /**
   * @function getPlayComponent function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getPlayButton(wrapperConfig: Object) {
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
    (this: any).slider.slickPlay();
    this.togglePlay();
  }

  /**
   * @function pause function stops/pause autoplay for carousel
   * also update component state.
   */
  pause() {
    (this: any).slider.slickPause();
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
   * @function render  Used to render the JSX of the component
   * @param {object} options Customized caroused configs from parent wrapper
   * @param {node} children address object
   * @param {object} carouselConfig Carousel wrapper config to enable customization
   * of functionalities like play pause, change carousel theme etc.
   */
  render() {
    const { options, children, carouselConfig, className } = this.props;
    const { maxLoopCount, ...otherOptions } = options;
    let { loopCompleted } = this.state;
    const { autoplay } = this.state;

    if (maxLoopCount && autoplay) {
      otherOptions.afterChange = i => {
        if (loopCompleted === maxLoopCount) {
          this.pause();
          this.setState({
            autoplay: false,
          });
        }
        if (i === this.slider.props.children.length - 1) {
          loopCompleted += 1;
          this.setState({
            loopCompleted,
          });
        }
      };
    }
    const settings = {
      appendDots: this.appendDots,
      ...defaults,
      ...otherOptions,
      /*
         The dots will be created on both cases. we need this as we are putting custom play/pause
         inside the slick-dots container. So, if some cases if dots not required and we will be able
         render play/pause button or vice-versa. Also check this.getPlayButton()
        */
      dots: options.dots || options.autoplay,
    };

    const { uniqueId } = this.state;

    return (
      <div
        className={`${className} tcp_carousel_wrapper`}
        carouselConfig={carouselConfig}
        data-locator={carouselConfig.dataLocatorCarousel}
      >
        <Slider className="tcp_carousel" ref={this.getSlider} key={uniqueId} {...settings}>
          {!children ? null : children}
        </Slider>
      </div>
    );
  }
}

export default withStyles(errorBoundary(Carousel), CarouselStyle);
export { Carousel as CarouselVanilla };
