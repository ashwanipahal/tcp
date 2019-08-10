// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { UrlHandler, navigateToPage } from '../../../../../utils/utils.app';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Button.style.native';

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
};

const CustomButton = (props: Props) => {
  const {
    text,
    buttonVariation,
    fullWidth,
    customStyle,
    disableButton,
    ...otherProps
  }: Props = props;
  const textValue = text || '';
  const { url, external, navigation, onPress } = otherProps;
  const openUrlInExternalBrowser = onPress || (() => UrlHandler(url));
  const openUrl = external ? openUrlInExternalBrowser : () => navigateToPage(url, navigation);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={customStyle}
      disabled={disableButton}
      onPress={openUrl}
    >
      <Text fullWidth={fullWidth} buttonVariation={buttonVariation} {...otherProps}>
        {textValue}
      </Text>
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
};

export default withStyles(CustomButton, style);
export { CustomButton as CustomButtonVanilla };
