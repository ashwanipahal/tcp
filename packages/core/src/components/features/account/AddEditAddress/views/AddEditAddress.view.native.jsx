import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  StyledHeading,
  ParentContainer,
  UnderlineStyle,
} from '@tcp/core/src/components/features/account/AddressBook/styles/AddressBook.style';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles.native';
import AddressFormComponent from '../../common/organism/AddressForm/AddressForm';

// @flow
type Props = {
  labels: Object,
  isEdit?: boolean,
  isMakeDefaultDisabled?: boolean,
  submitAddressFormAction: any,
  verifyAddressAction: any,
};

const AddressBook = (props: Props) => {
  const {
    labels,
    submitAddressFormAction,
    verifyAddressAction,
    isEdit,
    isMakeDefaultDisabled,
  } = props;
  return (
    <View {...props}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledHeading>
          <BodyCopy
            fontSize="fs16"
            fontWeight="extrabold"
            text={labels.acc_lbl_add_address_form_heading}
          />
        </StyledHeading>
        <UnderlineStyle />
        <AddressFormComponent
          onSubmit={verifyAddressAction}
          labels={labels}
          isEdit={isEdit}
          isMakeDefaultDisabled={isMakeDefaultDisabled}
          submitAddressFormAction={submitAddressFormAction}
        />
      </ScrollView>
    </View>
  );
};

AddressBook.defaultProps = {
  isEdit: false,
  isMakeDefaultDisabled: false,
};

export default withStyles(AddressBook, ParentContainer);

export { AddressBook as AddressBookVanilla };
