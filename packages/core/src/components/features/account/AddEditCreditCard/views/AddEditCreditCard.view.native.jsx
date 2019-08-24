import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from '../organism/CreditCardForm';

export const AddEditCreditCard = ({
  labels,
  isEdit,
  errorMessage,
  onClose,
  dto,
  updateCardList,
  selectedCard,
  ...otherProps
}) => {
  return (
    <SafeAreaView>
      <CreditCardForm
        labels={labels}
        isEdit={isEdit}
        onClose={onClose}
        dto={dto}
        updateCardList={updateCardList}
        selectedCard={selectedCard}
        onFileAddresskey={selectedCard && isEdit ? selectedCard.billingAddressId.toString() : ''}
        {...otherProps}
      />
    </SafeAreaView>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  dto: PropTypes.shape({}),
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
  updateCardList: PropTypes.func,
  selectedCard: PropTypes.shape({}),
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  dto: {},
  onClose: () => {},
  updateCardList: () => {},
  selectedCard: null,
};

export default AddEditCreditCard;
