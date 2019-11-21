import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ImageComp, ImageTouchableOpacity } from '../styles/LinkImageIcon.style.native';

const LinkImageIcon = props => {
  const {
    onPress,
    uri,
    selected,
    width,
    height,
    resizeMode,
    borderWidth,
    borderRadius,
    imageWidth,
    imageHeight,
    name,
  } = props;

  const imageCompAccessibilityRole = `image ${name}`;
  const imgConfig = 'w_50,h_50,c_thumb,g_auto:0';
  return (
    <ImageTouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      selected={selected}
      width={width}
      height={height}
      resizeMode={resizeMode}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
    >
      <ImageComp
        accessibilityRole="image"
        accessibilityLabel={imageCompAccessibilityRole}
        url={uri}
        swatchConfig={imgConfig}
        selected={selected}
        width={imageWidth || width}
        height={imageHeight || height}
        resizeMode={resizeMode}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        isProductImage
      />
    </ImageTouchableOpacity>
  );
};

LinkImageIcon.propTypes = {
  uri: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  resizeMode: PropTypes.string,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  onPress: PropTypes.func,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  name: PropTypes.string,
};

LinkImageIcon.defaultProps = {
  selected: false,
  width: 23,
  height: 23,
  resizeMode: 'contain',
  borderWidth: 1,
  borderRadius: 12,
  onPress: null,
  imageWidth: null,
  imageHeight: null,
  name: '',
};

export default withStyles(LinkImageIcon);
export { LinkImageIcon as LinkImageIconVanilla };
