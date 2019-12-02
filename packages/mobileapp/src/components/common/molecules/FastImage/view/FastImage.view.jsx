import React from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const FastImageNative = ({ url, style }) => {
  return <FastImage source={{ uri: url }} style={style} />;
};

FastImageNative.propTypes = {
  url: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

FastImageNative.defaultProps = {
  style: {},
};

export default FastImageNative;
