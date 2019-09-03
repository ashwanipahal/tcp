import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
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
  disabled,
}) => {
  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
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
    </View>
  );
};

LabeledRadioButton.propTypes = {
  obj: PropTypes.shape({}),
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  index: PropTypes.number,
  buttonInnerColor: PropTypes.string,
  buttonOuterColor: PropTypes.string,
  disabled: PropTypes.bool,
};

LabeledRadioButton.defaultProps = {
  obj: {},
  onPress: () => {},
  checked: false,
  index: -1,
  buttonInnerColor: colorPallete.black,
  buttonOuterColor: colorPallete.black,
  disabled: false,
};

export default LabeledRadioButton;
export { LabeledRadioButton as LabeledRadioButtonVanilla };
