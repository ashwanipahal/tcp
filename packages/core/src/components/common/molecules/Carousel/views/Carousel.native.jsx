/* eslint-disable max-lines */
import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { withTheme } from 'styled-components/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getLocator } from '../../../../../utils';

import { Image } from '../../../atoms';
import config from '../Carousel.config.native';
import CustomIcon from '../../../atoms/Icon';
import { ICON_NAME } from '../../../atoms/Icon/Icon.constants';

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
  darkArrow?: Boolean,
  overlap?: Boolean,
  hidePlayStopButton?: Boolean,
  autoplayInterval: Number,
  buttonPosition: String,
  autoplay?: Boolean,
  hasParallaxImages?: Boolean,
  iconBottomMargin?: String,
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
    const { autoplay } = props;
    this.state = {
      autoplay,
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
          alt=""
          height={playIconHeight}
          width={playIconWidth}
          testID={getLocator(carouselConfig.dataLocatorPause)}
        />
      </Touchable>
    ) : (
      <Touchable accessibilityRole="button" onPress={this.play}>
        <Image
          source={playIcon}
          alt=""
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
  getBottomView(carouselConfig, showDots, iconBottomMargin) {
    return (
      <PaginationWrapper iconBottomMargin={iconBottomMargin}>
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

  getSliderWidth = width => {
    const { sliderWidth } = this.props;

    return sliderWidth || width;
  };

  getItemWidth = width => {
    const { itemWidth } = this.props;

    return itemWidth || width;
  };

  /**
   * @function This function render custom icons
   * also update component state.
   */

  renderIcon = iconName => {
    return <CustomIcon name={iconName} size="fs19" color="gray.900" />;
  };

  /**
   * @function This function check which icon need to be draw
   */
  getIcon = (useLeftArrowIcon, useRightArrowIcon, imageSource) => {
    if (useLeftArrowIcon) {
      return this.renderIcon(ICON_NAME.chevronLeft);
    }
    if (useRightArrowIcon) {
      return this.renderIcon(ICON_NAME.chevronRight);
    }

    if (imageSource) {
      return <Icon source={imageSource} />;
    }

    return null;
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

  updateRef(ref, name) {
    this[ref] = name;
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
      hasParallaxImages,
      loop,
      activeSlideAlignment,
      iconBottomMargin,
      inactiveSlideOpacity,
      isUseLeftArrowIcon,
      isUseRightArrowIcon,
      labels,
    } = this.props;

    if (!data) {
      return null;
    }

    const { autoplay, activeSlide } = this.state;
    const settings = { ...defaults, ...options };

    const { iconTypeNext, iconTypePre } = this.getNavIcons(darkArrow, activeSlide, settings, data);
    let carouselWidth = width - 64;
    if (hasParallaxImages) {
      carouselWidth = width - 80;
    }

    if (variation === 'show-arrow') {
      // reduce left and right arrow with from the total with to fix center aline issue
      return (
        <View>
          <Container>
            <TouchableView
              accessibilityRole="button"
              accessibilityLabel={labels.accessibility.ariaPrevious}
              testID={getLocator('global_promobanner_right_arrow')}
              onPress={() => this.manageSlide('next')}
            >
              {this.getIcon(isUseLeftArrowIcon, false, iconTypeNext)}
            </TouchableView>
            <Carousel
              data={data}
              onSnapToItem={this.onSnapToItemHandler}
              renderItem={renderItem}
              sliderWidth={this.getSliderWidth(carouselWidth)}
              itemWidth={this.getItemWidth(carouselWidth)}
              sliderHeight={height}
              itemHeight={height}
              slideStyle={slideStyle}
              autoplay={autoplay}
              autoplayInterval={autoplayInterval}
              ref={this.carouselRef}
              hasParallaxImages={hasParallaxImages}
              loop={loop}
              inactiveSlideOpacity={inactiveSlideOpacity}
              {...settings}
              activeSlideAlignment={activeSlideAlignment}
            />
            <TouchableView
              accessibilityRole="button"
              accessibilityLabel={labels.accessibility.ariaNext}
              testID={getLocator('global_promobanner_left_arrowRight')}
              onPress={() => this.manageSlide('prev')}
            >
              {this.getIcon(false, isUseRightArrowIcon, iconTypePre)}
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
          sliderWidth={this.getSliderWidth(width)}
          itemWidth={
            hasParallaxImages ? this.getItemWidth(carouselWidth) : this.getItemWidth(width)
          }
          sliderHeight={height}
          itemHeight={height}
          slideStyle={slideStyle}
          autoplay={autoplay}
          vertical={vertical}
          autoplayInterval={autoplayInterval}
          hasParallaxImages={hasParallaxImages}
          activeSlideAlignment={activeSlideAlignment}
          inactiveSlideOpacity={inactiveSlideOpacity}
          {...settings}
        />

        {data.length > 1 && (
          <View>
            {showDots && overlap
              ? this.getOverlapComponent(carouselConfig, buttonPosition, iconBottomMargin)
              : this.getBottomView(carouselConfig, showDots, iconBottomMargin)}
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
  hasParallaxImages: false,
  paginationProps: {},
  carouselConfig: {},
  data: [],
  renderItem: () => {},
  slideStyle: {},
  theme: {},
  variation: '',
  vertical: false,
  autoplayInterval: null,
  buttonPosition: '',
  width: null,
  height: null,
  options: {},
  loop: false,
  sliderWidth: 0,
  itemWidth: 0,
  activeSlideAlignment: 'center',
  iconBottomMargin: null,
  inactiveSlideOpacity: 0.7,
  isUseLeftArrowIcon: false,
  isUseRightArrowIcon: false,
  labels: {
    accessibility: {
      ariaPrevious: 'Previous',
      ariaNext: 'Next',
    },
  },
};

SnapCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  slideStyle: PropTypes.shape({}),
  theme: PropTypes.shape({}),
  variation: PropTypes.oneOf(['', 'show-arrow']),
  vertical: PropTypes.bool,
  autoplayInterval: PropTypes.number,
  buttonPosition: PropTypes.oneOf(['', 'left', 'right']),
  carouselConfig: PropTypes.shape({}),
  onSnapToItem: PropTypes.func,
  showDots: PropTypes.bool,
  darkArrow: PropTypes.bool,
  overlap: PropTypes.bool,
  hidePlayStopButton: PropTypes.bool,
  autoplay: PropTypes.bool,
  paginationProps: PropTypes.shape({}),
  hasParallaxImages: PropTypes.bool,
  iconBottomMargin: PropTypes.string,
  options: PropTypes.shape({}),
  loop: PropTypes.bool,
  sliderWidth: PropTypes.number,
  itemWidth: PropTypes.number,
  activeSlideAlignment: PropTypes.string,
  inactiveSlideOpacity: PropTypes.number,
  isUseLeftArrowIcon: PropTypes.bool,
  isUseRightArrowIcon: PropTypes.bool,
  labels: PropTypes.shape({}),
};

export default withTheme(SnapCarousel);
export { SnapCarousel as SnapCarouselVanilla };
