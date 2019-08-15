import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from '../organism/CreditCardForm';

export const AddEditCreditCard = ({ labels, isEdit, errorMessage, ...otherProps }) => {
  return (
    <View>
      <CreditCardForm labels={labels} isEdit={isEdit} {...otherProps} />
    </View>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
};

export default AddEditCreditCard;
