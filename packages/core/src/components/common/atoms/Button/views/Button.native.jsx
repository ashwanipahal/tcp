// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { UrlHandler, navigateToPage, validateExternalUrl } from '../../../../../utils/utils.app';
import withStyles from '../../../hoc/withStyles.native';
import style, { CustomStyleText } from '../Button.style.native';
import { getLocator } from '../../../../../utils';

/**
 * @param {object} props : Props for button
 * @desc This is a button component. The two variations of buttons are:
 * 1. fixed-width: Takes the width of the column which it occupies.
 * It has the fixed padding as per the zeplin.

 * 2. variable-width: Takes the width of the text that is inside the button.
 * It has fixed padding as per the zeplin. This variation needs to be mentioned in buttonVariation property.
 * TODO - Not able to add these property here due to linting,
 * need to find a way of doing it. Might be resolved with flow types.

 * Additional button Prop:
 * fullWidth: Additional property to mention 100% width of the button.
 * disabled: to have disabled state of the button
 */

type Props = {
  buttonVariation?: string,
  fullWidth?: string,
  customStyle?: Object,
  text?: string,
  url?: string,
  disableButton?: boolean,
  locator?: string,
  color?: string,
  onPress?: Function,
};

const CustomButton = (props: Props) => {
  const {
    locator,
    text,
    buttonVariation,
    fullWidth,
    customStyle,
    disableButton,
    color,
    onPress,
    ...otherProps
  }: Props = props;
  const textValue = text || '';
  const { url, navigation } = otherProps;

  const openUrl = () => {
    if (validateExternalUrl(url)) {
      UrlHandler(url);
    } else {
      navigateToPage(url, navigation);
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={customStyle}
      disabled={disableButton}
      onPress={onPress || openUrl}
      testID={getLocator(locator)}
      {...otherProps}
    >
      <CustomStyleText fullWidth={fullWidth} buttonVariation={buttonVariation} color={color}>
        {textValue}
      </CustomStyleText>
    </TouchableOpacity>
  );
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
};

export default withStyles(CustomButton, style);
export { CustomButton as CustomButtonVanilla };
