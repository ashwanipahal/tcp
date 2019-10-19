import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import Image from '@tcp/core/src/components/common/atoms/Image';
import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

// const errorIcon = require('../../../../../assets/alert-triangle.png');
const errorIcon = require('@tcp/core/src/assets/alert-triangle.png');

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
  disabledWithAlert,
}) => {
  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <RadioButton labelHorizontal key={index}>
        {/*  You can set RadioButtonLabel before RadioButtonInput */}
        {!disabledWithAlert && (
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
        )}
        {disabledWithAlert && <Image source={errorIcon} alt="error" width={15} height={15} />}
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
  disabledWithAlert: PropTypes.bool,
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
  disabledWithAlert: false,
};

export default LabeledRadioButton;
export { LabeledRadioButton as LabeledRadioButtonVanilla };
