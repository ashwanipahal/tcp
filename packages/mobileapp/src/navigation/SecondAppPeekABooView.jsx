import React from 'react';
import { View, LayoutAnimation } from 'react-native';
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
      height: AppAnimationConfig.PeekABooLogoMinHeight,
      animationDelay: AppAnimationConfig.AnimationDelay,
    };
  }

  componentWillMount = () => {
    // wait for 100 ms to start animation so as to trigger bootstrap call in homepage
    setTimeout(this.showSplashAnimation, 100);
  };

  /**
   * @function showSplashAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation is a peek-a-boo effect of second app switch in bottom navigation bar
   *
   * @memberof SecondAppPeekABooView
   */
  showSplashAnimation = async () => {
    const animateLogo = await shouldAnimateLogo();
    if (animateLogo) {
      const { animationDelay } = this.state;
      setTimeout(this.peekABooAnimation, animationDelay);
      if (updateLastSplashAnimationDate) updateLastSplashAnimationDate();
    }
  };

  /**
   * @function peekABooAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation is a peek-a-boo effect of second app switch in bottom navigation bar
   *
   * @memberof SecondAppPeekABooView
   */
  peekABooAnimation = () => {
    const { animationDelay } = this.state;

    setTimeout(() => {
      this.changePosition(AppAnimationConfig.PeekABooLogoMaxHeight);
      setTimeout(() => {
        this.changePosition(AppAnimationConfig.PeekABooLogoMinHeight);
      }, animationDelay);
    }, animationDelay);
  };

  /**
   * @function changePosition
   * This method is called to update app logo position
   *
   * @memberof SecondAppPeekABooView
   */
  changePosition = height => {
    LayoutAnimation.spring();

    this.setState({
      height,
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
    const { height } = this.state;
    return (
      <View {...this.props} height={height}>
        <ImageContainer shadowColor={getSecondBrandThemeColor()} name="imageContainer">
          <Image source={getSecondAppLogo()} width="100px" height="80px" name="image" />
        </ImageContainer>
      </View>
    );
  }
}

export default withStyles(SecondAppPeekABooView, PeekABooContainer);
export { SecondAppPeekABooView as SecondAppPeekABooViewVanilla };
