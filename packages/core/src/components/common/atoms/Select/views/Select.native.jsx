import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import NativeDropdown from '../../NativeDropDown';

const SelectBox = ({ id, name, input, options, onValueChange }) => {
  return (
    <View>
      <NativeDropdown
        onValueChange={value => {
          input.onChange(value);
          onValueChange(value);
        }}
        data={options}
        selectedValue={input.value}
        id={id}
        name={name}
      />
    </View>
  );
};

SelectBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  input: PropTypes.shape({}),
  options: PropTypes.shape([]),
  onValueChange: PropTypes.func,
};

SelectBox.defaultProps = {
  id: '',
  name: '',
  input: {},
  options: [],
  onValueChange: () => {},
};

export default SelectBox;
