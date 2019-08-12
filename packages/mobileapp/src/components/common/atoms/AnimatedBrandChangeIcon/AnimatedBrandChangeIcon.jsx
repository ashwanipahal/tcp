import React, { PureComponent } from 'react';
import { LayoutAnimation, View, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { Image } from '@tcp/core/src/components/common/atoms';
import { styles, Container } from './AnimatedBrandChangeIcon.style';
import tcpLogo from '../../../../brand_config/main/config/tcp.png';
import gymboreeLogo from '../../../../brand_config/gymboree/config/gymboree.png';
import NavBarIcon from '../NavBarIcon';
import { APP_TYPE } from '../../hoc/ThemeWrapper.constants';

const { logo, logoHidden, firstIconFinalState, secondIconFinalState, iconInitialState } = styles;

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

    this.setState({
      openSwitch: !openSwitch,
    });
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
  renderBrandIcons = openSwitch => {
    let firstIconStyle;
    let SecondIconStyle;
    let imageStyle;
    if (openSwitch) {
      firstIconStyle = firstIconFinalState;
      SecondIconStyle = secondIconFinalState;
      imageStyle = logo;
    } else {
      firstIconStyle = iconInitialState;
      SecondIconStyle = iconInitialState;
      imageStyle = logoHidden;
    }
    return (
      <View>
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToTCP}
          style={firstIconStyle}
        >
          {/* first icon for brand 1 */}
          <Image source={tcpLogo} style={imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.switchToGymboree}
          style={SecondIconStyle}
        >
          {/* second icon for brand 2 which remains hidden in initial state */}
          <Image source={gymboreeLogo} style={imageStyle} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * A Higher Order Component function that returns the child
   * or the cancel button along with two brand logos.
   * openSwitch is a flag and children is the child component.
   */
  animatedComponent = (openSwitch, children) => {
    return (
      <Container>
        {/* children component that is made clickable */}
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={logo}
          activeOpacity={1}
        >
          {openSwitch ? (
            <NavBarIcon
              iconActive="brand-logo"
              iconInactive="brand-logo"
              style={{
                icon: {
                  width: 100,
                  height: 71,
                },
              }}
            />
          ) : (
            children
          )}
        </TouchableOpacity>
        {this.renderBrandIcons(openSwitch)}
      </Container>
    );
  };

  render() {
    // it has 2 icons i.e. product icons
    const { openSwitch } = this.state;
    const { children } = this.props;
    return this.animatedComponent(openSwitch, children);
  }
}

AnimatedBrandChangeIcon.propTypes = {
  children: PropTypes.element.isRequired,
  updateAppTypeHandler: PropTypes.func,
};

AnimatedBrandChangeIcon.defaultProps = {
  updateAppTypeHandler: () => {},
};

export default AnimatedBrandChangeIcon;
