// @flow
import React from 'react';
import Slider from 'react-slick';
import config from '../config';
import { Image } from '../../../atoms';
import { getIconPath } from '../../../../../utils';
import CarouselStyle from '../Carousel.style';
import withStyles from '../../../hoc/withStyles';
import errorBoundary from '../../../hoc/errorBoundary';

const defaults = { ...config.CAROUSEL_DEFAULTS };

type Props = {
  options: Object,
  children: any,
  carouselConfig: Object,
};

type State = {
  autoplay: boolean,
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
    };
  }

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
    return autoplay ? (
      <Image
        className="tcp_carousel__play"
        data-locator={wrapperConfig.dataLocator}
        src={getIconPath('icon-pause')}
        onClick={this.pause}
      />
    ) : (
      <Image
        className="tcp_carousel__play"
        data-locator={wrapperConfig.dataLocator}
        src={getIconPath('icon-play')}
        onClick={this.play}
      />
    );
  }

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
    const { options, children, carouselConfig } = this.props;
    const settings = { ...defaults, ...options };

    return (
      <CarouselStyle className="tcp_carousel_wrapper" carouselConfig={carouselConfig}>
        <Slider className="tcp_carousel" ref={this.getSlider} {...settings}>
          {!children ? null : children}
        </Slider>
        {carouselConfig.autoplay && this.getPlayButton(carouselConfig)}
      </CarouselStyle>
    );
  }
}

export default errorBoundary(withStyles(Carousel, CarouselStyle));
export { Carousel as CarouselVanilla };
