import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, ImageContainer } from '../styles/CustomImage.style.native';

const CustomImage = props => {
  const { imageSource } = props;
  return (
    <ImageContainer
      accessibilityRole="image"
      accessibilityLabel="image"
      source={{
        uri: imageSource,
      }}
    />
  );
};

CustomImage.propTypes = {
  imageSource: PropTypes.string,
};

CustomImage.defaultProps = {
  imageSource: '',
};

export default withStyles(CustomImage, styles);
export { CustomImage as CustomImageVanilla };
