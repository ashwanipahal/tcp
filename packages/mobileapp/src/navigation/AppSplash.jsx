import React from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { getScreenHeight } from '@tcp/core/src/utils/utils.native';

import { APP_TYPE } from '../components/common/hoc/ThemeWrapper.constants';
import { shouldToggleBrandIcon } from '../utils/utils';
import SplashStyles from './styles/AppSplash.styles';

const tcpSplashImage = require('../assets/images/tcp/tcpLaunchImage.png');
const gymboreeSplashImage = require('../assets/images/gymboree/gymboreeLaunchImage.png');

/**
 * This class creates a Peek a boo effect animation after showing app splash screen
 * props: appType
 * appType is the required parameter that comes from native app after app launches
 *
 * @class AppSplash
 * @extends {React.PureComponent<Props>}
 */
export default class AppSplash extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.transformAnimatedValue = new Animated.Value(0);
    this.zIndexAnimatedValue = new Animated.Value(1);
    this.opacityAnimationValue = new Animated.Value(1);
    this.secondLogoAnimatedValue = new Animated.Value(0);

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
      Animated.timing(this.transformAnimatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.elastic(),
      }),
      Animated.parallel([
        Animated.timing(this.secondLogoAnimatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(2),
        }),
        Animated.timing(this.opacityAnimationValue, {
          toValue: 0,
          duration: 500,
        }),
      ]),

      Animated.timing(this.zIndexAnimatedValue, {
        toValue: -1,
        duration: 1000,
        easing: Easing.ease,
      }),
    ]).start();
  };

  /**
   * method: getCurrentAppSplashImage
   * This method returns current app splash image
   *  @returns: TCP splash image for tcp app and Gymboree splash image for gymboree
   *
   * @memberof AppSplash
   */
  getCurrentAppSplashImage = () => {
    const { appType } = this.props;
    switch (appType) {
      case APP_TYPE.TCP:
        return tcpSplashImage;
      case APP_TYPE.GYMBOREE:
        return gymboreeSplashImage;
      default:
        return null;
    }
  };

  /**
   * method: getSecondAppLogo
   * This method returns other app logo image
   *  @returns: Gymboree logo image for tcp app and TCP logo image for gymboree
   *
   * @memberof AppSplash
   */
  getSecondAppLogo = () => {
    const { appType } = this.props;
    switch (appType) {
      case APP_TYPE.TCP:
        return gymboreeSplashImage;
      case APP_TYPE.GYMBOREE:
        return tcpSplashImage;
      default:
        return null;
    }
  };

  /**
   * method: getSplashImageTransform
   * This method returns transform for current app splash image
   * @returns transform: translatesY -> scale X & scale Y
   *
   * @memberof AppSplash
   */
  getSplashImageTransform = () => [
    {
      translateY: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, getScreenHeight() / 2 - 50],
      }),
    },
    {
      scaleX: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
      }),
    },
    {
      scaleY: this.transformAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
      }),
    },
  ];

  /**
   * method: getSecondImageTransform
   * This method returns transform for second app logo
   * @returns transform: translate y
   *
   * @memberof AppSplash
   */
  getSecondImageTransform = () => [
    {
      translateY: this.secondLogoAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
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
    if (!shouldToggleBrandIcon) return null;
    const { container, secondImageStyle, splashImageContainer } = SplashStyles;

    return (
      <Animated.View style={[container, { zIndex: this.zIndexAnimatedValue }]}>
        <Animated.Image
          source={this.getSecondAppLogo()}
          style={[secondImageStyle, { transform: this.getSecondImageTransform() }]}
        />
        <Animated.View style={[splashImageContainer, { opacity: this.opacityAnimationValue }]}>
          <Animated.Image
            source={this.getCurrentAppSplashImage()}
            style={{ transform: this.getSplashImageTransform() }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

/* PropTypes Declaration */
AppSplash.propTypes = {
  appType: PropTypes.string.isRequired,
};
