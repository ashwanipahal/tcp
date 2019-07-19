import React, { Component } from 'react';
import { LayoutAnimation, Image, View, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './AnimatedBrandChangeIcon.style';
import tcpLogo from '../../../brand_config/main/config/tcp.png';
import gymboreeLogo from '../../../brand_config/gymboree/config/gymboree.png';
import NavBarIcon from '../../common/atoms/NavBarIcon';

const {
  container,
  logo,
  logoHidden,
  iconInitialState,
  firstIconFinalState,
  secondIconFinalState,
} = styles;

// kindly use this component only for the bottom tab at the center of the tab
class AnimatedBrandChangeIcon extends Component {
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
   * A Higher Order Component function that returns the child
   * or the cancel button along with two brand logos.
   * openSwitch is a flag and children is the child component.
   */
  animatedComponent = (openSwitch, children) => {
    return (
      <View style={container}>
        {/* children component that is made clickable */}
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={logo}
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
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={openSwitch ? firstIconFinalState : iconInitialState}
        >
          {/* first icon for brand 1 */}
          <Image source={tcpLogo} style={openSwitch ? logo : logoHidden} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={openSwitch ? secondIconFinalState : iconInitialState}
        >
          {/* second icon for brand 2 which remains hidden in initial state */}
          <Image source={gymboreeLogo} style={openSwitch ? logo : logoHidden} />
        </TouchableOpacity>
      </View>
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
};

export default AnimatedBrandChangeIcon;
