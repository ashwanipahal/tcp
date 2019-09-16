import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { ImageComp, ImageTouchableOpacity } from '../styles/LinkImageIcon.style.native';

const LinkImageIcon = props => {
  const { onPress, uri, selected, width, height, resizeMode, borderWidth, borderRadius } = props;
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
        accessibilityLabel="image"
        source={{
          uri,
        }}
        selected={selected}
        width={width}
        height={height}
        resizeMode={resizeMode}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
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
};

LinkImageIcon.defaultProps = {
  selected: false,
  width: 23,
  height: 23,
  resizeMode: 'contain',
  borderWidth: 1,
  borderRadius: 12,
  onPress: null,
};

export default withStyles(LinkImageIcon);
export { LinkImageIcon as LinkImageIconVanilla };
