import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes as RNViewPropTypes } from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const styles = {
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
};

const Triangle = ({ style, isDown }) => (
  <View style={StyleSheet.flatten([styles.triangle, style, isDown ? styles.down : {}])} />
);

Triangle.propTypes = {
  style: ViewPropTypes.style.isRequired,
  isDown: PropTypes.bool.isRequired,
};

export default Triangle;
