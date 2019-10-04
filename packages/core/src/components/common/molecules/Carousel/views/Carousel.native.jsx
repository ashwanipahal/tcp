import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { withTheme } from 'styled-components';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getLocator } from '../../../../../utils';

import { Image } from '../../../atoms';
import config from '../Carousel.config.native';

import {
  ControlsWrapper,
  PlayPauseButtonView,
  Touchable,
  TouchableView,
  Icon,
  Container,
  PaginationWrapper,
  ControlsWrapperLeft,
  ControlsWrapperRight,
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
const prevIconDark = require('../../../../../assets/carrot-small-rights.png');
const nextIconDark = require('../../../../../assets/carrot-small-left.png');

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
      autoplay: props.autoplay,
      activeSlide: 0,
    };
    this.getPlayButton = this.getPlayButton.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.carouselRef = this.updateRef.bind(this, 'carousel');
  }

  getPagination() {
    const { activeSlide } = this.state;
    const {
      data,
      theme: { colorPalette },
      paginationProps,
    } = this.props;

    const {
      containerStyle: containerStyleOverride,
      dotContainerStyle: dotContainerStyleOverride,
      dotStyle: dotStyleOverride,
      inactiveDotStyle: inactiveDotStyleOverride,
    } = paginationProps;

    /* eslint-disable react-native/no-inline-styles */
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          paddingVertical: 22,
          paddingHorizontal: 10,
          ...containerStyleOverride,
        }}
        dotContainerStyle={{ marginHorizontal: 4, ...dotContainerStyleOverride }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          borderColor: colorPalette.gray[700],
          borderWidth: 1,
          backgroundColor: colorPalette.white,
          ...dotStyleOverride,
        }}
        inactiveDotStyle={{
          backgroundColor: colorPalette.gray[700],
          width: 6,
          height: 6,
          ...inactiveDotStyleOverride,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
    /* eslint-enable react-native/no-inline-styles */
  }

  /**
   * @function getPlayComponent function gets DOM reference of slider component.
   * @param {[Object]} element [Event object of click].
   * @return {node} function returns slider element.
   */
  getPlayButton(carouselConfig) {
    const { autoplay } = this.state;

    return autoplay ? (
      <Touchable accessibilityRole="button" onPress={this.pause}>
        <Image
          source={pauseIcon}
          height={playIconHeight}
          width={playIconWidth}
          testID={getLocator(carouselConfig.dataLocatorPause)}
        />
      </Touchable>
    ) : (
      <Touchable accessibilityRole="button" onPress={this.play}>
        <Image
          source={playIcon}
          height={playIconHeight}
          width={playIconWidth}
          testID={getLocator(carouselConfig.dataLocatorPlay)}
        />
      </Touchable>
    );
  }

  /**
   * @function getOverlapComponent This function return the Play Or Pause Button with pagination.
   * @Component is configurable : leftBottom , rightBottom  and centerBottom .
   */

  getOverlapComponent(carouselConfig, buttonPosition) {
    let overlapComponent;
    if (buttonPosition === 'right') {
      overlapComponent = (
        <View>
          <ControlsWrapperRight>
            {carouselConfig.autoplay && (
              <PlayPauseButtonView>{this.getPlayButton(carouselConfig)}</PlayPauseButtonView>
            )}
            {this.getPagination()}
          </ControlsWrapperRight>
        </View>
      );
    } else if (buttonPosition === 'left') {
      overlapComponent = (
        <View>
          <ControlsWrapperLeft>
            {carouselConfig.autoplay && (
              <PlayPauseButtonView>{this.getPlayButton(carouselConfig)}</PlayPauseButtonView>
            )}
            {this.getPagination()}
          </ControlsWrapperLeft>
        </View>
      );
    } else {
      overlapComponent = (
        <View>
          <ControlsWrapper>
            {carouselConfig.autoplay && (
              <PlayPauseButtonView>{this.getPlayButton(carouselConfig)}</PlayPauseButtonView>
            )}
            {this.getPagination()}
          </ControlsWrapper>
        </View>
      );
    }

    return overlapComponent;
  }

  /**
   * @function getBottomView This function return the Play Or Pause Button.
   */
  getBottomView(carouselConfig, showDots) {
    return (
      <PaginationWrapper>
        {carouselConfig.autoplay && (
          <PlayPauseButtonView>{this.getPlayButton(carouselConfig)}</PlayPauseButtonView>
        )}
        {showDots ? this.getPagination() : null}
      </PaginationWrapper>
    );
  }

  /* Return the Prev and Next Icon */
  getNavIcons = (darkArrow, activeSlide, settings, data) => {
    let iconTypePre = darkArrow ? prevIconDark : prevIcon;
    let iconTypeNext = darkArrow ? nextIconDark : nextIcon;

    if (settings.loop === false && darkArrow && activeSlide < 1) {
      iconTypeNext = nextIcon;
    }
    if (settings.loop === false && darkArrow && data.length - 1 <= activeSlide) {
      iconTypePre = prevIcon;
    }

    return { iconTypeNext, iconTypePre };
  };

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

  updateRef(ref, name) {
    this[ref] = name;
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
      carouselConfig,
      data,
      height,
      width,
      renderItem,
      slideStyle,
      variation,
      vertical,
      autoplayInterval,
      showDots,
      overlap,
      buttonPosition,
      darkArrow,
      options,
    } = this.props;

    if (!data) {
      return null;
    }

    const { autoplay, activeSlide } = this.state;
    const settings = { ...defaults, ...options };

    const { iconTypeNext, iconTypePre } = this.getNavIcons(darkArrow, activeSlide, settings, data);

    if (variation === 'show-arrow') {
      // reduce left and right arrow with from the total with to fix center aline issue
      const carouselWidth = width - 64;
      return (
        <View>
          <Container>
            <TouchableView
              accessibilityRole="button"
              accessibilityLabel="Previous"
              testID={getLocator('global_promobanner_right_arrow')}
              onPress={() => this.manageSlide('next')}
            >
              <Icon source={iconTypeNext} />
            </TouchableView>
            <Carousel
              data={data}
              onSnapToItem={this.onSnapToItemHandler}
              renderItem={renderItem}
              sliderWidth={carouselWidth}
              itemWidth={carouselWidth}
              sliderHeight={height}
              itemHeight={height}
              slideStyle={slideStyle}
              autoplay={autoplay}
              autoplayInterval={autoplayInterval}
              ref={this.carouselRef}
              {...settings}
            />
            <TouchableView
              accessibilityRole="button"
              accessibilityLabel="next"
              testID={getLocator('global_promobanner_left_arrowRight')}
              onPress={() => this.manageSlide('prev')}
            >
              <Icon source={iconTypePre} />
            </TouchableView>
          </Container>
          {data.length > 1 && showDots ? this.getPagination() : null}
        </View>
      );
    }

    return (
      <View>
        <Carousel
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
          autoplay={autoplay}
          vertical={vertical}
          autoplayInterval={autoplayInterval}
          {...settings}
        />

        {data.length > 1 && (
          <View>
            {showDots && overlap
              ? this.getOverlapComponent(carouselConfig, buttonPosition)
              : this.getBottomView(carouselConfig, showDots)}
          </View>
        )}
      </View>
    );
  }
}

SnapCarousel.defaultProps = {
  onSnapToItem: () => {},
  showDots: false,
  autoplay: true,
  hidePlayStopButton: false,
  overlap: false,
  darkArrow: false,
  paginationProps: {},
  carouselConfig: {},
};

SnapCarousel.defaultProps = {
  data: PropTypes.array,
  renderItem: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  slideStyle: PropTypes.shape({}),
  theme: PropTypes.shape({}),
  variation: PropTypes.string,
  vertical: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  buttonPosition: PropTypes.string,
  carouselConfig: PropTypes.shape({}),
  onSnapToItem: PropTypes.func,
  showDots: PropTypes.bool,
  darkArrow: PropTypes.bool,
  overlap: PropTypes.bool,
  hidePlayStopButton: PropTypes.bool,
  autoplay: PropTypes.bool,
  paginationProps: PropTypes.shape({}),
};

export default withTheme(SnapCarousel);
export { SnapCarousel as SnapCarouselVanilla };
