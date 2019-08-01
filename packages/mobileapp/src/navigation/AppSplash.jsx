import React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { getScreenWidth } from '@tcp/core/src/utils/utils.native';
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
      width: getScreenWidth() - 100,
      opacity: 1,
    };
  }

  componentWillMount() {
    // wait for 100 ms to start animation so as to trigger bootstrap call in homepage
    setTimeout(this.showSplashAnimation, AppAnimationConfig.AnimationDelay);
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
    this.changePosition('flex-end', 100, 80);
    setTimeout(() => {
      this.changeOpacity(0, -1);
    }, animationDelay);
  };

  /**
   * @function changePosition
   * This method is called to update app logo position
   *
   * @memberof AppSplash
   */
  changePosition = (position, width) => {
    LayoutAnimation.spring();

    this.setState({
      position,
      width,
    });
  };

  /**
   * @function changeOpacity
   * This method is called to update app splash opacity
   *
   * @memberof AppSplash
   */
  changeOpacity = (opacity, zIndex) => {
    this.setState({
      opacity,
      zIndex,
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
    const { zIndex, position, width, opacity } = this.state;
    return (
      <View {...this.props} justifyContent={position} zIndex={zIndex} opacity={opacity}>
        <Image source={getAppSplashLogo()} width={width} name="image" />
      </View>
    );
  }
}

export default withStyles(AppSplash, SplashStyles);
export { AppSplash as AppSplashVanilla };
