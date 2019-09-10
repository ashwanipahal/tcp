import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ViewPropTypes as RNViewPropTypes } from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  // eslint-disable-next-line react-native/no-color-literals
  triangle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderLeftWidth: 8,
    borderRightColor: 'transparent',
    borderRightWidth: 8,
    borderStyle: 'solid',
    height: 0,
    width: 0,
  },
});

const Triangle = ({ style, isDown }) => (
  <View style={StyleSheet.flatten([styles.triangle, style, isDown ? styles.down : {}])} />
);

Triangle.propTypes = {
  style: ViewPropTypes.style.isRequired,
  isDown: PropTypes.bool.isRequired,
};

export default Triangle;
