import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import ImageContainer from '../styles/CustomImage.style.native';

const CustomImage = props => {
  const { source, url, width, height, resizeMode } = props;
  return (
    <ImageContainer
      width={width}
      height={height}
      resizeMode={resizeMode}
      source={!source ? { url } : source}
    />
  );
};

CustomImage.propTypes = {
  source: PropTypes.shape({}),
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  resizeMode: PropTypes.string,
};

CustomImage.defaultProps = {
  source: null,
  url: null,
  width: 100, // sample default value
  height: 100, // sample default value
  resizeMode: 'contain',
};

export default withStyles(CustomImage);
export { CustomImage as CustomImageVanilla };
