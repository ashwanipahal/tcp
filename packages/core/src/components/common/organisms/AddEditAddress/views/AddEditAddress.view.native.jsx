import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { ParentContainer } from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import AddressVerification from '../../AddressVerification/container/AddressVerification.container';
import AddressFormComponent from '../../AddressForm/AddressForm';

const AddressBook = props => {
  const {
    submitAddressFormAction,
    verifyAddressAction,
    isEdit,
    isMakeDefaultDisabled,
    addressFormLabels,
    onCancel,
    initialValues,
    currentForm,
    toggleAddressModal,
    addressLine1,
    countryState,
    setModalHeading,
    verificationResult,
  } = props;
  const showVerification = currentForm === 'VerificationModal' && !!verificationResult;
  const showAddAddress =
    currentForm === 'AddAddress' || (!verificationResult && currentForm === 'VerificationModal');

  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {showVerification && (
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
            onError={submitAddressFormAction}
            toggleAddressModal={toggleAddressModal}
            setModalHeading={setModalHeading}
          />
        )}

        {showAddAddress && (
          <AddressFormComponent
            onSubmit={verifyAddressAction}
            addressFormLabels={addressFormLabels}
            isEdit={isEdit}
            toggleAddressModal={toggleAddressModal}
            isMakeDefaultDisabled={isMakeDefaultDisabled}
            submitAddressFormAction={submitAddressFormAction}
            onCancel={onCancel}
            initialValues={initialValues}
            currentForm={currentForm}
            addressLine1={addressLine1}
            countryState={countryState}
            setModalHeading={setModalHeading}
          />
        )}
      </ScrollView>
    </View>
  );
};

AddressBook.propTypes = {
  addressFormLabels: PropTypes.shape({}).isRequired,
  isEdit: PropTypes.bool,
  isMakeDefaultDisabled: PropTypes.bool,
  submitAddressFormAction: PropTypes.func,
  verifyAddressAction: PropTypes.func,
  onCancel: PropTypes.func,
  initialValues: PropTypes.shape({}),
  currentForm: PropTypes.string,
  toggleAddressModal: PropTypes.func,
  addressLine1: PropTypes.string,
  setAddressLine1: PropTypes.func,
  countryState: PropTypes.string,
  setModalHeading: PropTypes.func,
  verificationResult: PropTypes.string,
};

AddressBook.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
  submitAddressFormAction: () => null,
  verifyAddressAction: () => null,
  toggleAddressModal: () => {},
  onCancel: () => null,
  initialValues: {},
  currentForm: null,
  addressLine1: '',
  setAddressLine1: () => {},
  countryState: '',
  setModalHeading: PropTypes.func,
  verificationResult: '',
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
