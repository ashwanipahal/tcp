import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  UIManager,
  LayoutAnimation,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import jake from './jake.png';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends Component {
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
          style={{
            flex: 1,
            justifyContent: this.state.openSwitch ? 'center' : 'flex-end',
            alignItems: this.state.openSwitch ? 'flex-start' : 'flex-end',
          }}
        >
          <Image source={jake} style={{ height: 70, width: 70 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.changePosition()}
          style={[
            styles.secondIcon,
            {
              flex: 1,
              backgroundColor: this.state.openSwitch ? '#00000070' : '#ff00ff',
              justifyContent: this.state.openSwitch ? 'center' : 'flex-end',
              alignItems: this.state.openSwitch ? 'center' : 'flex-start',
            },
          ]}
        >
          <Image
            source={jake}
            style={{
              height: this.state.openSwitch ? 70 : 0,
              width: this.state.openSwitch ? 70 : 0,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 200,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#F00',
    width: '100%',
  },
  secondIcon: {
    flex: 1,
    // alignItems: "flex-end",
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  button: {
    width: 100,
  },
});
