import React, { PureComponent } from 'react';
import { LayoutAnimation, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { Image } from '@tcp/core/src/components/common/atoms';
import { styles, Container } from './AnimatedBrandChangeIcon.style';
import tcpLogo from '../../../../brand_config/main/config/tcp.png';
import gymboreeLogo from '../../../../brand_config/gymboree/config/gymboree.png';
import { APP_TYPE } from '../../hoc/ThemeWrapper.constants';

/**
 * kindly use this component only for the bottom tab at the center of the tab
 *
 */
class AnimatedBrandChangeIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { openSwitch: false };
  }

  /**
   * To change the state of position of logos before and
   * after the animation it behaves like a toggle.
   */
  changePosition = () => {
    LayoutAnimation.easeInEaseOut();
    const { openSwitch } = this.state;

    this.setState(
      {
        openSwitch: !openSwitch,
      },
      () => {
        // remove brands from view
        const { toggleBrandAction } = this.props;
        if (toggleBrandAction) toggleBrandAction();
      }
    );
  };

  /**
   * @function switchToTCP
   * This function switches current app type to tcp
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToTCP = () => {
    this.switchToBrand(APP_TYPE.TCP);
  };

  /**
   * @function switchToGymboree
   * This function switches current app type to tcp
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToGymboree = () => {
    this.switchToBrand(APP_TYPE.GYMBOREE);
  };

  /**
   * @function switchToGymboree
   * This function switches the app to input brand
   * @param brand
   *
   * @memberof AnimatedBrandChangeIcon
   */
  switchToBrand = brand => {
    const { updateAppTypeHandler } = this.props;
    if (updateAppTypeHandler) updateAppTypeHandler(brand);
    this.changePosition();
  };

  /**
   * It renders two logo based on state of openSwitch.
   */
  render() {
    const { logo, firstIconFinalState, secondIconFinalState } = styles;
    return (
      <Container
        onPress={this.changePosition}
        accessibilityTraits="none"
        accessibilityComponentType="none"
      >
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToTCP}
          style={firstIconFinalState}
        >
          {/* first icon for brand 1 */}
          <Image source={tcpLogo} style={logo} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToGymboree}
          style={secondIconFinalState}
        >
          {/* second icon for brand 2 which remains hidden in initial state */}
          <Image source={gymboreeLogo} style={logo} />
        </TouchableOpacity>
      </Container>
    );
  }
}

AnimatedBrandChangeIcon.propTypes = {
  updateAppTypeHandler: PropTypes.func,
  toggleBrandAction: PropTypes.func,
};

AnimatedBrandChangeIcon.defaultProps = {
  updateAppTypeHandler: () => {},
  toggleBrandAction: null,
};

export default AnimatedBrandChangeIcon;
