import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { ParentContainer } from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import LineComp from '@tcp/core/src/components/common/atoms/Line';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import { ModalHeading, LineWrapper } from '../styles/AddEditAddress.style.native';
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
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ModalHeading>
          <BodyCopy
            mobileFontFamily={['secondary']}
            fontWeight="extrabold"
            fontSize="fs16"
            text={addressFormLabels.addAddressHeading}
          />
        </ModalHeading>
        <LineWrapper>
          <LineComp marginTop={5} borderWidth={1} borderColor="black" />
        </LineWrapper>

        {currentForm === 'VerificationModal' && (
          <AddressVerification
            onSuccess={submitAddressFormAction}
            heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
            onError={submitAddressFormAction}
            toggleAddressModal={toggleAddressModal}
          />
        )}

        {currentForm === 'AddAddress' && (
          <AddressFormComponent
            onSubmit={verifyAddressAction}
            addressFormLabels={addressFormLabels}
            isEdit={isEdit}
            isMakeDefaultDisabled={isMakeDefaultDisabled}
            submitAddressFormAction={submitAddressFormAction}
            onCancel={onCancel}
            initialValues={initialValues}
            currentForm={currentForm}
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
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
