import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
export const DURATION = {
  LENGTH_SHORT: 500,
  FOREVER: 0,
};
const colorPalette = createThemeColorPalette();

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    elevation: 999,
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 10000,
  },
  content: {
    backgroundColor: colorPalette.black,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: colorPalette.black,
  },
});

const { height } = Dimensions.get('window');

export default class Toast extends Component {
  constructor(props) {
    super(props);
    const { opacity } = props;
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(opacity),
    };
  }

  componentWillUnmount() {
    this.cancelTimer();
  }

  close(duration) {
    const { defaultCloseDelay, fadeOutDuration } = this.props;
    const { opacityValue, isShow } = this.state;
    let delay = typeof duration === 'undefined' ? this.duration : duration;

    if (delay === DURATION.FOREVER) delay = defaultCloseDelay || 250;

    if (!this.isShow && !isShow) return;
    // eslint-disable-next-line no-unused-expressions
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.animation = Animated.timing(opacityValue, {
        toValue: 0.0,
        duration: fadeOutDuration,
      });
      this.animation.start(() => {
        this.setState({
          isShow: false,
        });
        this.isShow = false;
        if (typeof this.callback === 'function') {
          this.callback();
        }
      });
    }, delay);
  }

  closeImmediately() {
    this.cancelTimer();
  }

  cancelTimer() {
    // eslint-disable-next-line no-unused-expressions
    this.animation && this.animation.stop();
    // eslint-disable-next-line no-unused-expressions
    this.timer && clearTimeout(this.timer);
    this.setState({ isShow: false });
  }

  show(text, duration, callback) {
    this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
    this.callback = callback;
    const { opacityValue } = this.state;
    const { opacity, fadeInDuration } = this.props;
    this.setState({
      isShow: true,
      text,
    });

    this.animation = Animated.timing(opacityValue, {
      toValue: opacity,
      duration: fadeInDuration,
    });
    this.animation.start(() => {
      this.isShow = true;
      if (duration !== DURATION.FOREVER) this.close();
    });
  }

  render() {
    let pos;
    const { position, positionValue, style, textStyle } = this.props;
    const { isShow, opacityValue, text } = this.state;
    switch (position) {
      case 'top':
        pos = positionValue;
        break;
      case 'center':
        pos = height / 2;
        break;
      case 'bottom':
        pos = height - positionValue;
        break;
      default:
    }

    return isShow ? (
      <View style={[styles.container, { top: pos }]}>
        <Animated.View style={[styles.content, { opacity: opacityValue }, style]}>
          {React.isValidElement(text) ? text : <Text style={textStyle}>{text}</Text>}
        </Animated.View>
      </View>
    ) : (
      <View />
    );
  }
}

Toast.propTypes = {
  style: ViewPropTypes.style,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  textStyle: Text.propTypes.style,
  positionValue: PropTypes.number,
  fadeInDuration: PropTypes.number,
  defaultCloseDelay: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
};

Toast.defaultProps = {
  position: 'bottom',
  textStyle: styles.text,
  positionValue: 120,
  fadeInDuration: 500,
  fadeOutDuration: 500,
  defaultCloseDelay: 250,
  opacity: 1,
  style: PropTypes.shape({}),
};
