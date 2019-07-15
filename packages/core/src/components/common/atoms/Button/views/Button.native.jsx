// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
  id?: string,
  buttonVariation?: string,
  fullWidth?: string,
  customStyle?: string,
  text?: string,
  url?: string,
};

const CustomButton = (props: Props) => {
  const { text, url, id, buttonVariation, fullWidth, customStyle, ...otherProps } = props;
  const myText = text || '';
  return (
    <TouchableOpacity accessibilityRole="button">
      <Text fullWidth={fullWidth} buttonVariation={buttonVariation} id={id} {...otherProps}>
        {myText}
      </Text>
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  id: 'btn',
  fullWidth: '',
  buttonVariation: 'fixed-width',
  customStyle: '',
  text: '',
  url: '',
};

export default withStyles(CustomButton, style);
