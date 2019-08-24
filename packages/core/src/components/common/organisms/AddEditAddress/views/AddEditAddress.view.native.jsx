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
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddressVerification
          onSuccess={submitAddressFormAction}
          heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
          onError={submitAddressFormAction}
        />
        <AddressFormComponent
          onSubmit={verifyAddressAction}
          addressFormLabels={addressFormLabels}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
          submitAddressFormAction={submitAddressFormAction}
          onCancel={onCancel}
          initialValues={initialValues}
        />
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
};

AddressBook.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
  submitAddressFormAction: () => null,
  verifyAddressAction: () => null,
  onCancel: () => null,
  initialValues: {},
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
