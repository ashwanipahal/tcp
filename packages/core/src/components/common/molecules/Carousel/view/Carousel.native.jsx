import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Image } from '../../../atoms';
import config from '../config';
import theme from '../../../../../../styles/themes/TCP';

const playIcon = require('../../../../../../assets/play.png');
const pauseIcon = require('../../../../../../assets/pause.png');

// @flow
type Props = {
  carouselConfig: Object,
  data: Array<Object>,
  renderItem: Function,
  onSnapToItem: Function,
  width: Number,
  height: Number,
  slideStyle: Object,
};

type State = {
  autoplay: Boolean,
};

/**
 * Default settings for Carousel.
 */
const defaults = { ...config.CAROUSEL_MOBILE_DEFAULTS };

/**
 * Style for play pause icons.
 */
const { colors, zindex } = theme;
const { playIconHeight, playIconWidth } = config.CAROUSEL_MOBILE_CONFIG;
const touchableStyle = {
  backgroundColor: colors.WHITE,
  borderRadius: 15,
  position: 'absolute',
  bottom: 12,
  left: '50%',
  height: playIconHeight,
  width: playIconWidth,
  transform: [
    {
      translateX: -15,
    },
  ],
  zIndex: zindex.zOverlay,
};

/**
 * @function Carousel component that creates carousel using
 * third party library 'react-native-snap-carousel'
 */
class SnapCarousel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true,
    };
    this.getPlayButton = this.getPlayButton.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  /**
   * @function getPlayComponent function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getPlayButton() {
    const { autoplay } = this.state;
    return autoplay ? (
      <TouchableOpacity accessibilityRole="button" onPress={this.pause} style={touchableStyle}>
        <Image source={pauseIcon} height={playIconHeight} width={playIconWidth} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity accessibilityRole="button" onPress={this.play} style={touchableStyle}>
        <Image source={playIcon} height={playIconHeight} width={playIconWidth} />
      </TouchableOpacity>
    );
  }

  /**
   * @function play function enable autoplay for carousel
   * also update component state.
   */
  play() {
    this.carousel.startAutoplay();
    this.togglePlay();
  }

  /**
   * @function pause function stops/pause autoplay for carousel
   * also update component state.
   */
  pause() {
    this.carousel.stopAutoplay();
    this.togglePlay();
  }

  /**
   * @function togglePlay function updates component state
   * after each tap of play pause button.
   */
  togglePlay() {
    const { autoplay } = this.state;
    this.setState({ autoplay: !autoplay });
  }

  render() {
    const {
      carouselConfig: { autoplay: defaultAutoplay },
      data,
      height,
      width,
      onSnapToItem,
      renderItem,
      slideStyle,
    } = this.props;

    return (
      <View>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          onSnapToItem={onSnapToItem}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          sliderHeight={height}
          itemHeight={height}
          slideStyle={slideStyle}
          {...defaults}
        />
        {defaultAutoplay && this.getPlayButton()}
      </View>
    );
  }
}

export default SnapCarousel;
