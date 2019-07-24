// @flow
import React from 'react';
import { Platform } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { PropTypes } from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Icon.style.native';

/**
 * @param {object} props : Props for button
 * @desc This is a button component. The two variations of buttons are:
 * 1. fixed-width: Takes the width of the column which it occupies.
 */
const ICON_FONT_FONT_AWESOME = 'FontAwesome';

type Props = {
  iconFontName?: string,
  name: string,
  size: number,
  color: string,
  isDisabled?: Boolean,
};

const getFontClass = (iconFontName = ICON_FONT_FONT_AWESOME) => {
  if (iconFontName === ICON_FONT_FONT_AWESOME) {
    return IconFontAwesome;
  }
  return IconFontAwesome;
};

const CustomIcon = (props: Props) => {
  const { iconFontName, name, size, color, isDisabled, ...otherProps } = props;
  const IconClass = getFontClass(iconFontName);
  return (
    <IconClass
      {...otherProps}
      name={name}
      size={size}
      /* in case of android icon disable color need to be set because opacity doen't work */
      color={isDisabled && Platform.OS === 'android' ? '#b7b8b9' : color}
    />
  );
};

CustomIcon.propTypes = {
  iconFontName: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
};

CustomIcon.defaultProps = {
  iconFontName: ICON_FONT_FONT_AWESOME,
  isDisabled: false,
};

export default withStyles(CustomIcon, style);
export { CustomIcon as CustomIconVanilla };
