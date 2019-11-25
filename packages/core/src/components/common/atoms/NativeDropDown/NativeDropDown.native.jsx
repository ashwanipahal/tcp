import React from 'react';
import { Picker, Modal, View, Button as NativeButton, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button';
import { isAndroid } from '../../../../utils/index.native';

import {
  SafeAreaViewStyle,
  ModalOutsideTouchable,
  ModalOverlay,
  PickerView,
  AndroidPickerView,
  iOSPickerButtonStyle,
  NativeButtonStyledView,
} from './styles/NativeDropDown.style.native';

/**
 * This class creates native dropdown for iOS & Android
 * Expects data in form of array with displayName and id as property of each object
 *
 * @class NativeDropDown
 * @extends {React.PureComponent}
 */
class NativeDropDown extends React.PureComponent {
  constructor(props) {
    super(props);
    const { selectedValue } = props;
    this.state = { showPicker: false, tempValue: selectedValue, isAndroidPlatform: isAndroid() };
    this.valueToDisplayMap = this.getValueToDisplayNameMap(props.data);
  }
  /* eslint-disable-next-line */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selectedValue } = nextProps;
    const { tempValue } = this.state;
    if (selectedValue && selectedValue !== tempValue) {
      this.setState({ tempValue: selectedValue });
    }
  }

  getValueToDisplayNameMap = options => {
    return options.reduce((optionsMap, current) => {
      return {
        ...optionsMap,
        ...{
          [current.id]: current.displayName,
        },
      };
    }, {});
  };

  /**
   * @function setPickerState
   * sets picker state to input value
   *
   * @memberof NativeDropDown
   */
  setPickerState = showPicker => {
    this.setState({ showPicker });
  };

  /**
   * @function onPressOut
   * Called when tapped outside Modal
   *
   * @memberof NativeDropDown
   */
  onPressOut = () => {
    this.setPickerState(false);
    const { selectedValue } = this.props;
    this.setState({ tempValue: selectedValue });
  };

  /**
   * @function changeValue
   * called to update value and close picker
   *
   * @memberof NativeDropDown
   */
  changeValue = value => {
    const { onValueChange } = this.props;
    if (onValueChange) onValueChange(value);
    this.setPickerState(false);
  };

  /**
   * @function selectItem
   * selects item from tempValue and closes picker
   *
   * @memberof NativeDropDown
   */
  selectItem = () => {
    const { tempValue } = this.state;
    this.changeValue(tempValue);
  };

  render() {
    const { tempValue, showPicker, isAndroidPlatform } = this.state;
    const {
      selectedValue,
      data,
      bottomBorderOnly,
      width,
      androidPickerStyle,
      buttonVariation,
      disabled,
      textAlignLeft,
      lightGrayColor,
    } = this.props;
    const selectedLabel = this.valueToDisplayMap[selectedValue] || selectedValue;
    const itemList = data.map(item => {
      const label = (item.displayName && item.displayName.toString()) || item.displayName;
      return <Picker.Item label={label} value={item.id} />;
    });

    const pickerStyle = { height: 41 };
    const pickerItemStyle = { height: 41, padding: 0 };
    if (isAndroidPlatform) {
      return (
        <AndroidPickerView width={width} androidPickerStyle={androidPickerStyle}>
          <Picker
            style={pickerStyle}
            itemStyle={pickerItemStyle}
            selectedValue={tempValue}
            onValueChange={this.changeValue}
          >
            {itemList}
          </Picker>
        </AndroidPickerView>
      );
    }

    return (
      <View>
        <Button
          buttonVariation={buttonVariation}
          type="button"
          data-locator="pdp_quantity"
          text={selectedLabel}
          onPress={() => {
            this.setPickerState(true);
          }}
          showIcon
          bottomBorderOnly={bottomBorderOnly}
          customTextStyle={iOSPickerButtonStyle}
          disabled={disabled}
          textAlignLeft={textAlignLeft}
          lightGrayColor={lightGrayColor}
        />
        <Modal visible={showPicker} transparent animationType="slide">
          <SafeAreaViewStyle>
            <ModalOutsideTouchable
              accessibilityRole="button"
              activeOpacity={1}
              onPressOut={this.onPressOut}
            >
              <ModalOverlay />
            </ModalOutsideTouchable>
            <PickerView>
              <NativeButtonStyledView>
                <NativeButton
                  title="Done"
                  onPress={this.selectItem}
                  accessibilityLabel="done"
                  accessibilityRole="button"
                />
              </NativeButtonStyledView>
              <Picker
                selectedValue={tempValue}
                onValueChange={value => {
                  this.setState({ tempValue: value });
                }}
              >
                {itemList}
              </Picker>
            </PickerView>
          </SafeAreaViewStyle>
        </Modal>
      </View>
    );
  }
}

NativeDropDown.propTypes = {
  selectedValue: PropTypes.string,
  onValueChange: PropTypes.func,
  data: PropTypes.arrayOf(Object),
  bottomBorderOnly: PropTypes.bool,
  width: PropTypes.string,
  androidPickerStyle: ViewPropTypes.style,
  buttonVariation: PropTypes.string,
  disabled: PropTypes.bool,
  textAlignLeft: PropTypes.bool,
  lightGrayColor: PropTypes.bool,
};

NativeDropDown.defaultProps = {
  selectedValue: null,
  onValueChange: null,
  data: [],
  bottomBorderOnly: true,
  width: null,
  androidPickerStyle: null,
  buttonVariation: 'mobileApp-filter',
  disabled: false,
  textAlignLeft: false,
  lightGrayColor: false,
};

export default NativeDropDown;
