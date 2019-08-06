import React from 'react';
import { Animated, Easing, View } from 'react-native';
import { getScreenHeight } from '@tcp/core/src/utils';

import { getAppSplashLogo, AppAnimationConfig } from '../utils/utils';
import styles from './styles/AppSplash.styles';

/**
 * This class creates a Peek a boo effect animation after showing app splash screen
 *
 * @class AppSplash
 * @extends {React.PureComponent<Props>}
 */
class AppSplash extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.transformAnimatedValue = new Animated.Value(0);
    this.imageTransformAnimatedValue = new Animated.Value(0);
    this.viewBackgroundAnimatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.showSplashAnimation();
  }

  /**
   * method: showSplashAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation starts with a elstic effect of default app theme logo
   * followed by peek-a-boo effect of second app switch in bottom navigation bar
   * ends with changing opacity of this splash view to 0 and moving it back in view layer
   *
   * @memberof AppSplash
   */
  showSplashAnimation = () => {
    Animated.sequence([
      Animated.delay(AppAnimationConfig.AnimationDelay),
      Animated.timing(this.transformAnimatedValue, {
        toValue: 1,
        duration: AppAnimationConfig.AnimationDelay,
        easing: Easing.ease,
      }),
      Animated.stagger(100, [
        Animated.timing(this.viewBackgroundAnimatedValue, {
          toValue: 1,
          duration: 10,
          easing: Easing.ease,
        }),
        Animated.timing(this.imageTransformAnimatedValue, {
          toValue: 1,
          duration: AppAnimationConfig.AnimationDelay,
          easing: Easing.elastic(4),
        }),
      ]),
    ]).start(() => {
      const { removeSplash } = this.props;
      if (removeSplash) removeSplash();
    });
  };

  /**
   * @function getSplashViewTransform
   * returns splash view transform
   * starts with changing y position of view and ends with scaling size of view
   *
   * @memberof AppSplash
   */
  getSplashViewTransform = () => [
    {
      translateY: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getScreenHeight() / 2 - 35],
      }),
    },
    {
      scaleX: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.4],
      }),
    },
    {
      scaleY: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.4],
      }),
    },
  ];

  /**
   * @function getSplashImageTransform
   * returns splash image transform
   * scales size of image
   *
   * @memberof AppSplash
   */
  getSplashImageTransform = () => [
    {
      scaleX: this.imageTransformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
      }),
    },
    {
      scaleY: this.imageTransformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
      }),
    },
  ];

  /**
   * method: render
   * This method renders AppSplash view on screen
   *
   * @returns view to be rendered
   * @memberof AppSplash
   */
  render() {
    const { splash, imageContainer } = styles;
    return (
      <Animated.View
        style={[
          splash,
          {
            backgroundColor: this.viewBackgroundAnimatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['white', 'transparent'],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            splash,
            {
              transform: this.getSplashViewTransform(),
            },
          ]}
        >
          <View style={imageContainer}>
            <Animated.Image
              source={getAppSplashLogo()}
              style={{
                transform: this.getSplashImageTransform(),
              }}
            />
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

export default AppSplash;
