import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import CreditCardForm from '../organism/CreditCardForm';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';

export const AddEditCreditCard = ({
  labels,
  isEdit,
  errorMessage,
  onClose,
  dto,
  updateCardList,
  selectedCard,
  showCreditCardFields,
  submitAddressFormAction,
  backToAddressBookClick,
  verifyAddressAction,
  initialValues,
  onFileAddresskey,
  mailingAddress,
  showUserName,
  addressFormLabels,
  ...otherProps
}) => {
  return (
    <SafeAreaView>
      {!showCreditCardFields && (
        <>
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={
              isEdit
                ? labels.addressBook.ACC_LBL_EDIT_ADDRESS
                : labels.addressBook.ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD
            }
            labels={labels}
            onError={submitAddressFormAction}
          />
          <CreditCardForm
            labels={labels}
            onSubmit={verifyAddressAction}
            initialValues={initialValues}
            isEdit={isEdit}
            backToPaymentClick={backToAddressBookClick}
            showUserName={showUserName}
            showCreditCardFields={showCreditCardFields}
            addressFormLabels={addressFormLabels}
            {...otherProps}
          />
        </>
      )}
      {showCreditCardFields && (
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
      )}
    </SafeAreaView>
  );
};

AddEditCreditCard.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  addressFormLabels: PropTypes.shape({}),
  dto: PropTypes.shape({}),
  isEdit: PropTypes.bool,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
  updateCardList: PropTypes.func,
  selectedCard: PropTypes.shape({}),
  showCreditCardFields: PropTypes.bool,
  mailingAddress: PropTypes.bool,
  showUserName: PropTypes.bool,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: PropTypes.shape({}),
  onFileAddresskey: PropTypes.string,
};

AddEditCreditCard.defaultProps = {
  errorMessage: null,
  isEdit: false,
  dto: {},
  onClose: () => {},
  updateCardList: () => {},
  selectedCard: null,
  showCreditCardFields: true,
  showUserName: true,
  submitAddressFormAction: PropTypes.func,
  backToAddressBookClick: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  initialValues: {},
  onFileAddresskey: '',
  mailingAddress: false,
  addressFormLabels: {},
};

export default AddEditCreditCard;
