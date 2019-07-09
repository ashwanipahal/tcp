import React, { Component } from 'react';
import {
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import tcpLogo from '../../../brand_config/gymboree/config/logo.png';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  logoHidden: {
    height: 0,
    width: 0,
  },
  crossIconFinalState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFE5',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  firstIconInitialState: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  firstIconFinalState: {
    position: 'absolute',
    left: -Dimensions.get('window').width / 6,
    bottom: 70,
  },
  secondIconInitialState: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  secondIconFinalState: {
    position: 'absolute',
    right: -Dimensions.get('window').width / 6,
    bottom: 70,
  },
});

export default class AnimatedBrandChangeIcon extends Component {
  constructor(props) {
    super(props);
    this.state = { openSwitch: false };
  }

  changePosition = () => {
    LayoutAnimation.spring();
    this.setState({
      openSwitch: !this.state.openSwitch,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.changePosition()}
          style={this.state.openSwitch ? styles.firstIconFinalState : styles.firstIconInitialState}
        >
          <Image source={tcpLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.changePosition()}
          style={
            this.state.openSwitch ? styles.secondIconFinalState : styles.secondIconInitialState
          }
        >
          <Image source={tcpLogo} style={this.state.openSwitch ? styles.logo : styles.logoHidden} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.changePosition()}
          style={this.state.openSwitch ? styles.crossIconFinalState : styles.logoHidden}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
