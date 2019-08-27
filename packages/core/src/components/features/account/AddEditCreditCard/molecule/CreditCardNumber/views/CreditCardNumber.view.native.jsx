import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardTextBox from '@tcp/core/src/components/common/atoms/CreditCardTextBox';

export const CreditCardNumber = ({ cardType, isEdit, ...otherProps }) => {
  return (
    <View>
      <CreditCardTextBox {...otherProps} isEdit={isEdit} cardType={cardType} maxLength={16} />
    </View>
  );
};

CreditCardNumber.propTypes = {
  cardType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
};

export default CreditCardNumber;
