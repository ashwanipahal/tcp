import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { PropTypes } from 'prop-types';
import { get, noop } from 'lodash';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { setTestId, getLocator } from '@tcp/core/src/utils';
import withStyles from '../../../hoc/withStyles.native';
import { Container, IconStyle, IconTouchableOpacity } from '../Icon.style.native';
import { ICON_FONT_CLASS } from '../Icon.constants';
import IcomoonConfig from '../../../../../../../mobileapp/src/assets/json/icons.json';

const Icomoon = createIconSetFromIcoMoon(IcomoonConfig);
/**
 * @param {string} iconFontName : require parameter for the method
 * @return {Object} IconFontAwesome : Return font class
 * @desc This method return icon font class based on the font name.
 */
const getFontClass = (iconFontName = ICON_FONT_CLASS.FontAwesome) => {
  if (iconFontName === ICON_FONT_CLASS.FontAwesome) {
    return IconFontAwesome;
  }
  if (iconFontName === ICON_FONT_CLASS.Icomoon) {
    return Icomoon;
  }
  return IconFontAwesome;
};

/**
 * @param {string} props : props for CustomIcon
 * @return {JSX} IconClass : Return jsx icon component
 * @desc This method based on the props generate icon component.
 */
const CustomIcon = props => {
  const {
    iconFontName,
    name,
    size,
    color,
    isDisabled,
    isButton,
    onPress,
    margin,
    dataLocator,
    accessibilityLabel,
    ...otherProps
  } = props;
  const IconClass = getFontClass(iconFontName);
  const fontSize = get(props, 'style[0].fontSize', null);

  if (isButton) {
    return (
      <IconTouchableOpacity
        margin={margin}
        {...otherProps}
        onPress={!isDisabled ? onPress : noop}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        {...setTestId(getLocator(dataLocator))}
      >
        <IconClass
          {...otherProps}
          name={name}
          size={fontSize}
          {...setTestId(getLocator(dataLocator))}
        />
      </IconTouchableOpacity>
    );
  }
  return (
    <Container margin={margin} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <IconClass
        {...otherProps}
        name={name}
        size={fontSize}
        {...setTestId(getLocator(dataLocator))}
      />
    </Container>
  );
};

/**
 * props of CustomIcon component
 * @param {string}[name] The name of the Icon which is mandatory field
 * @param {string}[iconFontName] Name of the font class. Default FontAwesome
 * @param {number}[size] The size is optional. Default size 0
 * @param {string}[color] The color will pick from the primary theme as default. But can pass own icon color
 * @param {boolean}[isDisabled] in case of android icon disable color need to be set because opacity doen't work. Default false
 * @param {boolean}[isButton] This need to be set true to make a clickable button. Default false
 * @param {function}[onPress] A function called when the button is pressed. Default none
 * @param {object}[children] Button icon lable as children. Default blank
 */

CustomIcon.propTypes = {
  iconFontName: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
  isButton: PropTypes.bool,
  dataLocator: PropTypes.string,
  margin: PropTypes.string,
  accessibilityLabel: PropTypes.string,
};

CustomIcon.defaultProps = {
  iconFontName: ICON_FONT_CLASS.FontAwesome,
  isDisabled: false,
  onPress: noop,
  isButton: false,
  dataLocator: '',
  margin: null,
  accessibilityLabel: '',
};

export default withStyles(CustomIcon, IconStyle);
export { CustomIcon as CustomIconVanilla };
