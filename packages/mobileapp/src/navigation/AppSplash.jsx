import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import { Image } from '@tcp/core/src/components/common/atoms/index.native';

import { getAppSplashLogo, AppAnimationConfig } from '../utils/utils';
import SplashStyles from './styles/AppSplash.styles';

/**
 * After showing app splash screen as initial frame of the app,
 * this class displays app logo animatedly that settles down at bottom center of navigation bar
 *
 * @class AppSplash
 * @extends {React.PureComponent<Props>}
 */
class AppSplash extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 0,
      animationDelay: AppAnimationConfig.AnimationDelay,
      position: 'center',
      width: AppAnimationConfig.AppSplashMaxWidth,
      opacity: 1,
      height: AppAnimationConfig.AppSplashMaxHeight,
      background: 'white',
    };
  }

  componentWillMount() {
    // wait for 1s to start animation so as to trigger bootstrap call in homepage
    this.spashAnimation = setTimeout(this.showSplashAnimation, AppAnimationConfig.AnimationDelay);
  }

  componentWillUnmount() {
    clearTimeout(this.opacityAnimation);
    clearTimeout(this.spashAnimation);
  }

  /**
   * @function showSplashAnimation
   * This method uses Animated api of react-native to display the after splash animation
   * Animation is a peek-a-boo effect of second app switch in bottom navigation bar
   *
   * @memberof AppSplash
   */
  showSplashAnimation = () => {
    const { animationDelay } = this.state;
    this.changePosition(
      'flex-end',
      AppAnimationConfig.AppSplashMinWidth,
      AppAnimationConfig.AppSplashMinHeight
    );

    this.opacityAnimation = setTimeout(() => {
      // Vary image size for animation
      this.changeImageSize(
        AppAnimationConfig.AppSplashMinWidth - 5,
        AppAnimationConfig.AppSplashMinHeight - 5
      );

      this.changeOpacity();
    }, animationDelay);
  };

  /**
   * @function changePosition
   * This method is called to update app logo position
   *
   * @memberof AppSplash
   */
  changePosition = (position, width, height) => {
    LayoutAnimation.linear();

    this.setState({
      position,
      width,
      height,
    });
  };

  /**
   * @function changeOpacity
   * This method is called to update app splash opacity
   *
   * @memberof AppSplash
   */
  changeOpacity = () => {
    setTimeout(() => {
      // change opacity of view
      LayoutAnimation.linear();

      this.setState({
        opacity: 0,
        zIndex: -1,
      });
    }, 100);
  };

  /**
   * @function changeImageSize
   * changes image size animatedly
   *
   * @memberof AppSplash
   */
  changeImageSize = (width, height) => {
    LayoutAnimation.spring();

    this.setState({
      background: 'transparent',
      width,
      height,
    });
  };

  /**
   * @function render
   * This method renders AppSplash view on screen
   *
   * @returns view to be rendered
   * @memberof AppSplash
   */
  render() {
    const { zIndex, position, width, opacity, height, background } = this.state;
    return (
      <View
        {...this.props}
        justifyContent={position}
        zIndex={zIndex}
        opacity={opacity}
        backgroundColor={background}
      >
        <Image
          source={getAppSplashLogo()}
          width={width}
          height={height}
          name="image"
          backgroundColor="white"
          borderRadius={40}
          marginLeft={-5}
        />
      </View>
    );
  }
}

export default withStyles(AppSplash, SplashStyles);
export { AppSplash as AppSplashVanilla };
