import React from 'react';
import { Platform, Animated, Easing } from 'react-native';

import {
  getSecondAppLogo,
  getSecondBrandThemeColor,
  shouldAnimateLogo,
  updateLastSplashAnimationDate,
  AppAnimationConfig,
} from '../utils/utils';
import styles from './styles/SecondAppPeekABooView.styles';

/**
 * This class creates a Peek a boo effect animation after showing app logo animation
 *
 * @class SecondAppPeekABooView
 * @extends {React.PureComponent<Props>}
 */
class SecondAppPeekABooView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.transformAnimatedValue = new Animated.ValueXY();
    this.imageTransformAnimatedValue = new Animated.Value(0);
    this.peekABooAnimation();
  }

  /**
   * @function peekABooAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation is a peek-a-boo effect of second app switch in bottom navigation bar
   * It checks if last animation date is 30 days
   * If yes - shows the animation
   *
   * @memberof SecondAppPeekABooView
   */
  peekABooAnimation = async () => {
    const animateLogo = await shouldAnimateLogo();
    if (animateLogo) {
      this.showAnimation();
      if (updateLastSplashAnimationDate) updateLastSplashAnimationDate();
    }
  };

  /**
   * @function showAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation is a peek-a-boo effect of second app switch in bottom navigation bar
   *
   * @memberof SecondAppPeekABooView
   */
  showAnimation = () => {
    Animated.sequence([
      Animated.delay(AppAnimationConfig.AnimationDelay * 2),
      Animated.timing(this.transformAnimatedValue, {
        toValue: { x: 0, y: -60 },
        duration: AppAnimationConfig.AnimationDelay,
      }),
      Animated.timing(this.imageTransformAnimatedValue, {
        toValue: 1,
        duration: AppAnimationConfig.AnimationDelay,
        easing: Easing.elastic(4),
      }),
      Animated.timing(this.transformAnimatedValue, {
        toValue: { x: 0, y: 60 },
        duration: AppAnimationConfig.AnimationDelay,
      }),
    ]).start();
  };

  /**
   * @function render
   * This method renders SecondAppPeekABooView view on screen
   *
   * @returns view to be rendered
   * @memberof SecondAppPeekABooView
   */
  render() {
    // Shadow not supported in android, so set border for android
    const borderWidth = Platform.OS === 'android' ? 1 : 0;
    const shadowColor = getSecondBrandThemeColor();
    const { image, imageContainer } = styles;

    return (
      <Animated.View
        style={[
          imageContainer,
          {
            transform: this.transformAnimatedValue.getTranslateTransform(),
            shadowColor,
            borderColor: shadowColor,
            borderWidth,
            left: AppAnimationConfig.AppSplashMaxWidth - image.width / 2 - 10,
          },
        ]}
      >
        <Animated.Image
          source={getSecondAppLogo()}
          style={[
            image,
            {
              transform: [
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
              ],
            },
          ]}
        />
      </Animated.View>
    );
  }
}

export default SecondAppPeekABooView;
