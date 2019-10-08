import React from 'react';
import PropTypes from 'prop-types';
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
import { getLocator, configureInternalNavigationFromCMSUrl } from '../../../../../utils';

const IconComp = values => {
  const { showIcon, iconName, selectedIcon, iconColor, iconSize, selected } = values;
  if (showIcon) {
    return (
      <IconContainer>
        <CustomIcon name={selected ? selectedIcon : iconName} size={iconSize} color={iconColor} />
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
    customTextStyle,
    ...otherProps
  } = props;
  const textValue = text || '';
  const { url, navigation } = otherProps;
  const openUrl = () => {
    if (validateExternalUrl(url)) {
      UrlHandler(url);
    } else {
      const cmsValidatedUrl = configureInternalNavigationFromCMSUrl(url);
      navigateToPage(cmsValidatedUrl, navigation);
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
        style={customTextStyle}
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
  customTextStyle: PropTypes.shape({}),
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
  iconColor: 'gray.800',
  iconSize: 'fs12',
  showIcon: false,
  selectedIcon: ICON_NAME.chevronUp,
  customTextStyle: null,
};

export default withStyles(CustomButton, style);
export { CustomButton as CustomButtonVanilla };
