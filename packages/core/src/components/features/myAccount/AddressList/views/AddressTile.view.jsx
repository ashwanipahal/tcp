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
  labels: Object,
};

const AddressBookTile = ({ address, labels }: Props) => {
  return (
    <AddressTileComponent>
      <AddressTileContainerComponent>
        <Address address={address} />
        <div>
          {address.primary === 'true' && <Badge showCheckmark>{labels.defaultShipping}</Badge>}
          {address.xcont_isDefaultBilling === 'true' && (
            <Badge showCheckmark>{labels.defaultBilling}</Badge>
          )}
          {address.xcont_isBillingAddress === 'true' && <Badge>{labels.billing}</Badge>}
          {address.primary !== 'true' && address.xcont_isShippingAddress === 'true' && (
            <Badge>{labels.shipping}</Badge>
          )}
          {address.primary !== 'true' && (
            <Anchor fontSizeVariation="small" underline>
              {labels.makeDefault}
            </Anchor>
          )}
        </div>
      </AddressTileContainerComponent>
      <AddressCTAContainerComponent>
        <Anchor fontSizeVariation="medium" underline>
          {labels.edit}
        </Anchor>
        <Anchor fontSizeVariation="medium" underline>
          {labels.delete}
        </Anchor>
      </AddressCTAContainerComponent>
    </AddressTileComponent>
  );
};

export default AddressBookTile;
