import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'styled-components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getLocator } from '../../../../../utils';

import { Image } from '../../../atoms';
import config from '../Config.native';

import {
  ControlsWrapper,
  PlayPauseButtonView,
  Touchable,
  TouchableView,
  Icon,
  Container,
} from '../Carousel.native.style';

/**
 * Import play pause image icons.
 * Note: React native imports images using require.
 */
const playIcon = require('../../../../../assets/play.png');
const pauseIcon = require('../../../../../assets/pause.png');

// /**
//  * Next & Prev icons listing.
//  */
const prevIcon = require('../../../../../assets/carrot-large-right.png');
const nextIcon = require('../../../../../assets/carrot-large-left.png');

// @flow
type Props = {
  carouselConfig: Object,
  data: Array<Object>,
  renderItem: Function,
  onSnapToItem?: Function,
  width: Number,
  height: Number,
  slideStyle: Object,
  theme: Object,
  variation: String,
  vertical: Boolean,
  showDots?: Boolean,
  hidePlayStopButton?: Boolean,
  autoplayInterval: Number,
};

type State = {
  autoplay: Boolean,
};

/**
 * Default settings for Carousel.
 */
const defaults = { ...config.CAROUSEL_APP_DEFAULTS };

/**
 * Style for play pause icons.
 */
const { playIconHeight, playIconWidth } = { ...config.CAROUSEL_APP_CONFIG };

/**
 * @function Carousel component that creates carousel using
 * third party library 'react-native-snap-carousel'
 */
class SnapCarousel extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true,
      activeSlide: 0,
    };
    this.getPlayButton = this.getPlayButton.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  getPagination() {
    const { activeSlide } = this.state;
    const {
      data,
      theme: { colorPalette },
    } = this.props;

    /* eslint-disable  */
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 24, paddingHorizontal: 20 }}
        dotContainerStyle={{ marginHorizontal: 4 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          borderColor: colorPalette.gray[700],
          borderWidth: 1,
          backgroundColor: colorPalette.white,
        }}
        inactiveDotStyle={{
          backgroundColor: colorPalette.gray[700],
          width: 6,
          height: 6,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
    // eslint-enable
  }

  /**
   * @function getPlayComponent function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getPlayButton() {
    const { autoplay } = this.state;

    return autoplay ? (
      <Touchable accessibilityRole="button" onPress={this.pause}>
        <Image source={pauseIcon} height={playIconHeight} width={playIconWidth} />
      </Touchable>
    ) : (
      <Touchable accessibilityRole="button" onPress={this.play}>
        <Image source={playIcon} height={playIconHeight} width={playIconWidth} />
      </Touchable>
    );
  }

  /**
   * To manage the direction of the carousel
   */

  manageSlide = direction => {
    if (direction === 'next') {
      return this.carousel.snapToPrev();
    }
    return this.carousel.snapToNext();
  };

  /**
   * Called on slide item
   */

  onSnapToItemHandler = index => {
    const { onSnapToItem } = this.props;
    this.setState({ activeSlide: index });
    onSnapToItem(index);
  };

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
      renderItem,
      slideStyle,
      variation,
      vertical,
      autoplayInterval,
      showDots,
    } = this.props;

    if (variation === 'show-arrow') {
      return (
        <Container>
          <TouchableView
            accessibilityRole="button"
            data-locator={getLocator('global_promobanner_right_arrow')}
            onPress={() => this.manageSlide('next')}
          >
            <Icon source={nextIcon} />
          </TouchableView>
          <Carousel
            {...defaults}
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            sliderHeight={height}
            itemHeight={height}
            autoplayInterval={autoplayInterval}
            ref={c => {
              this.carousel = c;
            }}
          />
          <TouchableView
            accessibilityRole="button"
            data-locator={getLocator('global_promobanner_left_arrowRight')}
            onPress={() => this.manageSlide('prev')}
          >
            <Icon source={prevIcon} />
          </TouchableView>
        </Container>
      );
    }

    return (
      <View>
        <Carousel
          {...defaults}
          ref={c => {
            this.carousel = c;
          }}
          onSnapToItem={this.onSnapToItemHandler}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          sliderHeight={height}
          itemHeight={height}
          slideStyle={slideStyle}
          vertical={vertical}
          autoplayInterval={autoplayInterval}
        />

        <ControlsWrapper>
          {defaultAutoplay && <PlayPauseButtonView>{this.getPlayButton()}</PlayPauseButtonView>}
          {showDots ? this.getPagination() : null}
        </ControlsWrapper>
      </View>
    );
  }
}

SnapCarousel.defaultProps = {
  onSnapToItem: () => {},
  showDots: false,
  hidePlayStopButton: false,
};

export default withTheme(SnapCarousel);
