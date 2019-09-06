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
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentForm === 'VerificationModal' && (
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
            onError={submitAddressFormAction}
            toggleAddressModal={toggleAddressModal}
            setModalHeading={setModalHeading}
          />
        )}

        {currentForm === 'AddAddress' && (
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
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
