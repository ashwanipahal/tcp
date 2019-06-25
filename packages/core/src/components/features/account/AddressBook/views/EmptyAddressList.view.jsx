// @flow

import React from 'react';
import { AddNewAddressCTAContainer, EmptyAddressRow } from '../styles/AddressBook.style';

type Props = {
  labels: Object,
};

const EmptyAddressList = ({ labels }: Props) => {
  return (
    <AddNewAddressCTAContainer>
      <EmptyAddressRow bodySize="three" tag="p" fontWeight="bold">
        {labels.createAddressBookMsg}
      </EmptyAddressRow>
      <EmptyAddressRow bodySize="three" tag="p">
        {labels.createAddressBookBenefitMsg}
      </EmptyAddressRow>
    </AddNewAddressCTAContainer>
  );
};

export default EmptyAddressList;
