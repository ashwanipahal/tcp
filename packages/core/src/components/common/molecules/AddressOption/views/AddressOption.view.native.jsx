import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import LabeledRadioButton from '@tcp/core/src/components/common/atoms/LabeledRadioButton';
import Address from '../../Address';
import AddressOptionsContainer from '../AddressOption.styles.native';

const AddressOption = ({ showInput, address, onChange, isSelected }) => {
  if (showInput) {
    return (
      <AddressOptionsContainer>
        <RadioForm>
          <LabeledRadioButton onPress={onChange} checked={isSelected} obj={{}} index={0} />
        </RadioForm>

        <Address address={address} showName showPhone={false} showCountry={false} />
      </AddressOptionsContainer>
    );
  }
  return (
    <View>
      <Address address={address} showName showPhone={false} showCountry={false} />
    </View>
  );
};

AddressOption.propTypes = {
  onChange: PropTypes.func,
  inputProps: PropTypes.shape({}),
  showInput: PropTypes.bool,
  address: PropTypes.shape({}),
  isSelected: PropTypes.bool,
};

AddressOption.defaultProps = {
  onChange: () => {},
  inputProps: {},
  showInput: true,
  address: {},
  isSelected: false,
};

export default AddressOption;
