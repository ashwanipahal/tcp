import React, { Component } from 'react';
import { LayoutAnimation, Image, View, TouchableOpacity, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from './AnimatedBrandChangeIcon.style';
import tcpLogo from '../../../brand_config/gymboree/config/logo.png';

const {
  container,
  containerAnimated,
  logo,
  logoHidden,
  crossIconFinalState,
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

  changePosition = () => {
    LayoutAnimation.easeInEaseOut();
    const { openSwitch } = this.state;
    this.setState({
      openSwitch: !openSwitch,
    });
  };

  animatedComponent = (openSwitch, children) => {
    return (
      <View style={openSwitch ? containerAnimated : container}>
        {/* children component that is made clickable */}
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={openSwitch ? logoHidden : logo}
        >
          {openSwitch ? null : children}
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
          <Image source={tcpLogo} style={openSwitch ? logo : logoHidden} />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityTraits="none"
          accessibilityComponentType="none"
          onPress={this.changePosition}
          style={openSwitch ? crossIconFinalState : logoHidden}
        >
          {/* third icon for cancel button */}
          <Text>X</Text>
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
