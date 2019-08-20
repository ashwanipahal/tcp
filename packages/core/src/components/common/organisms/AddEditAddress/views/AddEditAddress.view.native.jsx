import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {
  StyledHeading,
  ParentContainer,
  UnderlineStyle,
} from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import AddressFormComponent from '../../AddressForm/AddressForm';

const AddressBook = props => {
  const {
    submitAddressFormAction,
    verifyAddressAction,
    isEdit,
    isMakeDefaultDisabled,
    addressFormLabels,
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={addressFormLabels.addressHeading}
          />
        </StyledHeading>
        <UnderlineStyle />
        <AddressFormComponent
          onSubmit={verifyAddressAction}
          addressFormLabels={addressFormLabels}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
          submitAddressFormAction={submitAddressFormAction}
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
};

AddressBook.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
  submitAddressFormAction: () => null,
  verifyAddressAction: () => null,
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
