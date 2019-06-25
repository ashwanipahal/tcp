// @flow
import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';
import Address from '../../../../common/molecules/Address';
import {
  AddressTileComponent,
  AddressTileContainerComponent,
  AddressCTAContainerComponent,
} from '../styles/AddressBook.style';
import Badge from '../../../../common/atoms/Badge';

type Props = {
  address: Object,
};

const AddressBookTile = ({ address }: Props) => {
  return (
    <AddressTileComponent>
      <AddressTileContainerComponent>
        <Address address={address} />
        <div>
          {address.primary === 'true' && <Badge showCheckmark>DEFAULT SHIPPING</Badge>}
          {address.xcont_isDefaultBilling === 'true' && (
            <Badge showCheckmark>DEFAULT BILLING</Badge>
          )}
          {address.xcont_isBillingAddress === 'true' && <Badge>BILLING</Badge>}
          {address.primary !== 'true' && address.xcont_isShippingAddress === 'true' && (
            <Badge>SHIPPING</Badge>
          )}
          {address.primary !== 'true' && (
            <Anchor fontSizeVariation="small" underline>
              Make Default
            </Anchor>
          )}
        </div>
      </AddressTileContainerComponent>
      <AddressCTAContainerComponent>
        <Anchor fontSizeVariation="medium" underline>
          Edit
        </Anchor>
        <Anchor fontSizeVariation="medium" underline>
          Delete
        </Anchor>
      </AddressCTAContainerComponent>
    </AddressTileComponent>
  );
};

export default AddressBookTile;
