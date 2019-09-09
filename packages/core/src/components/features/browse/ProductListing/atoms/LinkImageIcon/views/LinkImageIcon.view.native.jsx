import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import ImageComp from '../styles/LinkImageIcon.style.native';

const getImageComp = values => {
  const { uri, selected, width, height, resizeMode, borderWidth, borderRadius } = values;
  return (
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
  );
};
const LinkImageIcon = props => {
  const { onPress } = props;
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} accessibilityRole="button">
        {getImageComp(props)}
      </TouchableOpacity>
    );
  }
  return getImageComp(props);
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
  borderRadius: 12.5,
  onPress: null,
};

export default withStyles(LinkImageIcon);
export { LinkImageIcon as LinkImageIconVanilla };
