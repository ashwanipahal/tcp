import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { ParentContainer } from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import AddressFormComponent from '../../AddressForm/AddressForm';

const AddressBook = props => {
  const {
    submitAddressFormAction,
    verifyAddressAction,
    isEdit,
    isMakeDefaultDisabled,
    addressFormLabels,
    onCancel,
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AddressFormComponent
          onSubmit={verifyAddressAction}
          addressFormLabels={addressFormLabels}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
          submitAddressFormAction={submitAddressFormAction}
          onCancel={onCancel}
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
};

AddressBook.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
  submitAddressFormAction: () => null,
  verifyAddressAction: () => null,
  onCancel: () => null,
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
