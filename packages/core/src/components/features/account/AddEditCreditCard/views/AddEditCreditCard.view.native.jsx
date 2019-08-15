import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from '../organism/CreditCardForm';

export const AddEditCreditCard = ({ labels, isEdit, errorMessage, onClose, ...otherProps }) => {
  return (
    <SafeAreaView>
      <CreditCardForm labels={labels} isEdit={isEdit} onClose={onClose} {...otherProps} />
    </SafeAreaView>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  onClose: () => {},
};

export default AddEditCreditCard;
