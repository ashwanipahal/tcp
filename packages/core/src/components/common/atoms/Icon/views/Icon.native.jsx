// @flow
import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { PropTypes } from 'prop-types';
import { get, noop } from 'lodash';
import withStyles from '../../../hoc/withStyles.native';
import IconStyle from '../Icon.style.native';
import { ICON_FONT_CLASS } from '../Icon.constants';

/**
 * @param {string} iconFontName : require parameter for the method
 * @return {Object} IconFontAwesome : Return font class
 * @desc This method return icon font class based on the font name.
 */
const getFontClass = (iconFontName = ICON_FONT_CLASS.FontAwesome) => {
  if (iconFontName === ICON_FONT_CLASS.FontAwesome) {
    return IconFontAwesome;
  }
  return IconFontAwesome;
};

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const CustomIcon = (props: PropTypes.Object) => {
  const {
    iconFontName,
    name,
    size,
    color,
    isDisabled,
    isButton,
    onPress,
    backgroundColor,
    borderRadius,
    iconStyle,
    children,
    ...otherProps
  } = props;
  const IconClass = getFontClass(iconFontName);
  const fontSize = get(props, 'style[0].fontSize', null);

  if (isButton) {
    return (
      <IconClass.Button
        {...otherProps}
        name={name}
        size={fontSize}
        color={color}
        onPress={!isDisabled ? onPress : noop}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        iconStyle={iconStyle}
      >
        {children}
      </IconClass.Button>
    );
  }
  return <IconClass {...otherProps} name={name} size={fontSize} />;
};

/**
 * props of CustomIcon component
 * @param {string}[name] The name of the Icon which is mandatory field
 * @param {string}[iconFontName] Name of the font class. Default FontAwesome
 * @param {number}[size] The size is optional. Default size 0
 * @param {string}[color] The color will pick from the primary theme as default. But can pass own icon color
 * @param {boolean}[isDisabled] in case of android icon disable color need to be set because opacity doen't work. Default false
 * @param {boolean}[isButton] This need to be set true to make a clickable button. Default false
 * @param {object}[iconStyle] Styles applied to the icon only, good for setting margins or a different color. Note: use iconStyle for margins or expect unstable behaviour. Default {marginRight: 10}
 * @param {string}[backgroundColor] Options using for the icon button background color. Default white
 * @param {number}[borderRadius] Border radius of the button, set to 0 to disable. Default 0
 * @param {function}[onPress] A function called when the button is pressed. Default none
 * @param {object}[children] Button icon lable as children. Default blank
 */

CustomIcon.propTypes = {
  children: PropTypes.shape({}),
  iconFontName: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
  iconStyle: PropTypes.shape({}),
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  onPress: PropTypes.func,
  isButton: PropTypes.bool,
};

CustomIcon.defaultProps = {
  children: {},
  iconFontName: ICON_FONT_CLASS.FontAwesome,
  isDisabled: false,
  iconStyle: {},
  backgroundColor: '#ffffff',
  borderRadius: 0,
  onPress: noop,
  isButton: false,
  color: '',
  size: 0,
};

export default withStyles(CustomIcon, IconStyle);
export { CustomIcon as CustomIconVanilla };
