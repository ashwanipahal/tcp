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
  labelWrapStyle,
  buttonStyle,
  buttonSize,
  buttonOuterSize,
  disabled,
  labelStyle,
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
          buttonSize={buttonSize}
          buttonOuterSize={buttonOuterSize}
          buttonStyle={buttonStyle}
        />
        <RadioButtonLabel
          obj={obj}
          index={index}
          labelHorizontal
          onPress={onPress}
          labelStyle={labelStyle}
          labelWrapStyle={labelWrapStyle}
        />
      </RadioButton>
    </View>
  );
};

LabeledRadioButton.propTypes = {
  obj: PropTypes.shape({}),
  labelStyle: PropTypes.shape({}),
  labelWrapStyle: PropTypes.shape({}),
  buttonStyle: PropTypes.shape({}),
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  index: PropTypes.number,
  buttonSize: PropTypes.number,
  buttonOuterSize: PropTypes.number,
  buttonInnerColor: PropTypes.string,
  buttonOuterColor: PropTypes.string,
  disabled: PropTypes.bool,
};

LabeledRadioButton.defaultProps = {
  obj: {},
  labelStyle: {},
  labelWrapStyle: {},
  buttonStyle: {},
  onPress: () => {},
  checked: false,
  index: -1,
  buttonSize: 10,
  buttonOuterSize: 20,
  buttonInnerColor: colorPallete.black,
  buttonOuterColor: colorPallete.black,
  disabled: false,
};

export default LabeledRadioButton;
export { LabeledRadioButton as LabeledRadioButtonVanilla };
