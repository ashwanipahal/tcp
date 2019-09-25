import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import { ICON_NAME } from '@tcp/core/src/components/common/atoms/Icon/Icon.constants';
import { UrlHandler, navigateToPage, validateExternalUrl } from '../../../../../utils/utils.app';
import withStyles from '../../../hoc/withStyles.native';
import {
  style,
  CustomStyleText,
  TouchableOpacityComponent,
  IconContainer,
} from '../Button.style.native';
import { getLocator } from '../../../../../utils';

const IconComp = values => {
  const { showIcon, iconName, selectedIcon, iconColor, iconSize, theme, selected } = values;
  if (showIcon) {
    const iconColorValue = get(theme, `colorPalette.${iconColor}`, iconColor);
    const iconSizeValue = get(theme, `typography.fontSizes.${iconSize}`, iconSize);
    return (
      <IconContainer>
        <CustomIcon
          name={selected ? selectedIcon : iconName}
          size={iconSizeValue}
          color={iconColorValue}
        />
      </IconContainer>
    );
  }

  return null;
};

const CustomButton = props => {
  const {
    locator,
    text,
    buttonVariation,
    fullWidth,
    customStyle,
    disableButton,
    color,
    fill,
    onPress,
    active,
    selected,
    ...otherProps
  } = props;
  const textValue = text || '';
  const { url, navigation } = otherProps;
  console.log('bottomBorderOnly===', otherProps.bottomBorderOnly);
  const openUrl = () => {
    if (validateExternalUrl(url)) {
      UrlHandler(url);
    } else {
      navigateToPage(url, navigation);
    }
  };

  return (
    <TouchableOpacityComponent
      accessibilityRole="button"
      style={customStyle}
      disabled={disableButton}
      onPress={onPress || openUrl}
      testID={getLocator(locator)}
      {...otherProps}
    >
      <CustomStyleText
        fullWidth={fullWidth}
        buttonVariation={buttonVariation}
        color={color}
        fill={fill}
        disableButton={disableButton}
        active={active}
        selected={selected}
      >
        {textValue}
      </CustomStyleText>
      {IconComp(props)}
    </TouchableOpacityComponent>
  );
};

CustomButton.propTypes = {
  buttonVariation: PropTypes.string,
  fullWidth: PropTypes.string,
  customStyle: PropTypes.shape({}),
  text: PropTypes.string,
  url: PropTypes.string,
  disableButton: PropTypes.bool,
  locator: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  fill: PropTypes.string,
  active: PropTypes.bool,
  navigation: PropTypes.shape({}),
  selected: PropTypes.bool,
  theme: PropTypes.shape({}),
  showIcon: PropTypes.bool,
  selectedIcon: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.string,
};

CustomButton.defaultProps = {
  fullWidth: '',
  buttonVariation: 'fixed-width',
  customStyle: {},
  text: '',
  url: '',
  disableButton: false,
  locator: '',
  color: '',
  onPress: null,
  fill: '',
  active: false,
  navigation: {},
  selected: false,
  theme: {},
  iconName: ICON_NAME.chevronDown,
  iconColor: 'gray[800]',
  iconSize: 'fs12',
  showIcon: false,
  selectedIcon: ICON_NAME.chevronUp,
};

export default withStyles(withTheme(CustomButton), style);
export { CustomButton as CustomButtonVanilla };
