import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from '../organism/CreditCardForm';

export const AddEditCreditCard = ({ labels, isEdit, errorMessage, onClose, dto, ...otherProps }) => {
  return (
    <SafeAreaView>
      <CreditCardForm labels={labels} isEdit={isEdit} onClose={onClose} dto={dto} {...otherProps} />
    </SafeAreaView>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  dto: PropTypes.shape({}),
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  dto: {},
  onClose: () => {},
};

export default AddEditCreditCard;
