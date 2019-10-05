import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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
  const [verifyModalDisplayed, setVerifyModalDisplayed] = useState(false);
  return (
    <>
      {!showCreditCardFields && (
        <>
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={
              isEdit
                ? getLabelValue(labels, 'ACC_LBL_EDIT_ADDRESS', 'addressBook')
                : getLabelValue(labels, 'ACC_LBL_VERIFY_YOUR_ADDRESS_HEADING_ADD', 'addressBook')
            }
            labels={labels}
            onError={submitAddressFormAction}
            verifyModalRendered={status => setVerifyModalDisplayed(status)}
            toggleAddressModal={false}
          />
          {!verifyModalDisplayed && (
            <CreditCardForm
              labels={labels}
              onSubmit={verifyAddressAction}
              onClose={onClose}
              initialValues={initialValues}
              isEdit={isEdit}
              showUserName={showUserName}
              showCreditCardFields={showCreditCardFields}
              addressFormLabels={addressFormLabels}
              mailingAddress={mailingAddress}
              onFileAddresskey=""
              {...otherProps}
            />
          )}
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
    </>
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
