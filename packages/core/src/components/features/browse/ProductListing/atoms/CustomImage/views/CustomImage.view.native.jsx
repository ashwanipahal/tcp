import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, ImageContainer } from '../styles/CustomImage.style.native';

const CustomImage = props => {
  const { imageSource, width } = props;
  return (
    <ImageContainer
      width={width}
      source={{
        uri: imageSource,
      }}
    />
  );
};

CustomImage.propTypes = {
  imageSource: PropTypes.string,
  width: PropTypes.number,
};

CustomImage.defaultProps = {
  imageSource: '',
  width: '',
};

export default withStyles(CustomImage, styles);
export { CustomImage as CustomImageVanilla };
