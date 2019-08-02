import React from 'react';
import { View, LayoutAnimation, Platform } from 'react-native';
import { Image } from '@tcp/core/src/components/common/atoms/index.native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';

import {
  getSecondAppLogo,
  getSecondBrandThemeColor,
  shouldAnimateLogo,
  updateLastSplashAnimationDate,
  AppAnimationConfig,
} from '../utils/utils';
import { PeekABooContainer, ImageContainer } from './styles/SecondAppPeekABooView.styles';

/**
 * This class creates a Peek a boo effect animation after showing app logo animation
 *
 * @class SecondAppPeekABooView
 * @extends {React.PureComponent<Props>}
 */
class SecondAppPeekABooView extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      height: AppAnimationConfig.PeekABooViewMinHeight,
      animationDelay: AppAnimationConfig.AnimationDelay,
      imageHeight: AppAnimationConfig.PeekABooLogoMaxHeight - 5,
      imageWidth: AppAnimationConfig.PeekABooLogoMaxWidth - 10,
    };

    this.peekABooAnimation();
  }

  componentWillUnmount() {
    // clear timeout used for animation
    if (this.animationTimeout) clearTimeout(this.animationTimeout);
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
      const { animationDelay } = this.state;
      this.animationTimeout = setTimeout(this.showAnimation, animationDelay * 2);
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
    const { animationDelay } = this.state;

    // increase view height for animation
    this.changePosition(AppAnimationConfig.PeekABooViewMaxHeight);

    setTimeout(() => {
      // Animate image
      this.changeImagePosition();

      setTimeout(() => {
        // decrease view height to 0
        this.changePosition(AppAnimationConfig.PeekABooViewMinHeight);
      }, animationDelay);
    }, animationDelay);
  };

  /**
   * @function changePosition
   * This method is called to update view position animatedly
   *
   * @memberof SecondAppPeekABooView
   */
  changePosition = height => {
    LayoutAnimation.linear();

    this.setState({
      height,
    });
  };

  /**
   * @function changeImagePosition
   * This method is called to update image position animatedly
   *
   * @memberof SecondAppPeekABooView
   */
  changeImagePosition = () => {
    LayoutAnimation.spring();

    this.setState({
      imageWidth: AppAnimationConfig.PeekABooLogoMaxWidth,
      imageHeight: AppAnimationConfig.PeekABooLogoMaxHeight,
    });
  };

  /**
   * @function render
   * This method renders SecondAppPeekABooView view on screen
   *
   * @returns view to be rendered
   * @memberof SecondAppPeekABooView
   */
  render() {
    const { height, imageWidth, imageHeight } = this.state;

    // Shadow not supported in android, so set border for android
    const borderWidth = Platform.OS === 'android' ? 1 : 0;
    return (
      <View {...this.props} height={height}>
        <ImageContainer
          shadowColor={getSecondBrandThemeColor()}
          name="imageContainer"
          borderWidth={borderWidth}
        >
          <Image source={getSecondAppLogo()} width={imageWidth} height={imageHeight} name="image" />
        </ImageContainer>
      </View>
    );
  }
}

export default withStyles(SecondAppPeekABooView, PeekABooContainer);
export { SecondAppPeekABooView as SecondAppPeekABooViewVanilla };
