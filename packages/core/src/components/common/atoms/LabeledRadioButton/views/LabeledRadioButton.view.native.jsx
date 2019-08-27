import React from 'react';
import { PropTypes } from 'prop-types';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const colorPallete = createThemeColorPalette();

const LabeledRadioButton = ({
  index,
  obj,
  onPress,
  checked,
  buttonInnerColor,
  buttonOuterColor,
}) => {
  return (
    <RadioButton labelHorizontal key={index}>
      {/*  You can set RadioButtonLabel before RadioButtonInput */}
      <RadioButtonInput
        obj={obj}
        index={index}
        isSelected={checked}
        onPress={onPress}
        borderWidth={1}
        buttonInnerColor={buttonInnerColor}
        buttonOuterColor={buttonOuterColor}
        buttonSize={10}
        buttonOuterSize={20}
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

LabeledRadioButton.propTypes = {
  obj: PropTypes.shape({}),
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  index: PropTypes.number,
  buttonInnerColor: PropTypes.string,
  buttonOuterColor: PropTypes.string,
};

LabeledRadioButton.defaultProps = {
  obj: {},
  onPress: () => {},
  checked: false,
  index: -1,
  buttonInnerColor: colorPallete.black,
  buttonOuterColor: colorPallete.black,
};

export default LabeledRadioButton;
export { LabeledRadioButton as LabeledRadioButtonVanilla };
