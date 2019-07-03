// @flow
import React from 'react';
// eslint-disable-next-line import/named
import { ButtonStyles, ViewWrapper } from '../Button.style';

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
  color?: string,
  border?: string,
  margin?: string,
  id?: string,
};

const Button = (props: Props) => (
  <ViewWrapper>
    <ButtonStyles {...props} />
  </ViewWrapper>
);

Button.defaultProps = {
  buttonVariation: 'fixed-width',
  fullWidth: '100%',
  color: 'black',
  border: '0px',
  margin: '40px',
  id: 'btn',
};

export default Button;
