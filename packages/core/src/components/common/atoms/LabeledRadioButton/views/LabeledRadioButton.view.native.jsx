import React from 'react';
import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

// @flow

type Props = {
  obj: Object,
  onPress: func,
  checked: boolean,
  index: number,
};

const LabeledRadioButton = ({ index, obj, onPress, checked }: Props) => {
  return (
    <RadioButton labelHorizontal key={index}>
      {/*  You can set RadioButtonLabel before RadioButtonInput */}
      <RadioButtonInput
        obj={obj}
        index={index}
        isSelected={checked}
        onPress={onPress}
        borderWidth={1}
        buttonInnerColor="#e74c3c"
        buttonOuterColor="#2196f3"
        buttonSize={40}
        buttonOuterSize={80}
        buttonStyle={{}}
      />
      <RadioButtonLabel
        obj={obj}
        index={index}
        labelHorizontal
        onPress={onPress}
        labelWrapStyle={{}}
      />
    </RadioButton>
  );
};

export default LabeledRadioButton;
export { LabeledRadioButton as LabeledRadioButtonVanilla };
