// @flow
import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';
import {
  AddressTileComponent,
  AddressTileContainerComponent,
  AddressSectionComponent,
  AddressCTAContainerComponent,
  AddressRow,
} from '../styles/AddressBook.style';
import Col from '../../../../common/atoms/Col';
import Badge from '../../../../common/atoms/Badge';

type Props = {
  address: Object,
};

const AddressBookTile = ({ address }: Props) => {
  return (
    <Col colSize={{ large: 3, medium: 4, small: 6 }}>
      <AddressTileComponent>
        <AddressTileContainerComponent>
          <AddressSectionComponent>
            <AddressRow bodySize="three" tag="p" fontWeight="bold" color="primary">
              {`${address.firstName} ${address.lastName}`}
            </AddressRow>
            {address.addressLine.map(addressLine => (
              <AddressRow bodySize="three" tag="p" color="primary">
                {addressLine}
              </AddressRow>
            ))}
            <AddressRow bodySize="three" tag="p" color="primary">
              {`${address.city} ${address.state} ${address.zipCode}`}
            </AddressRow>
            <AddressRow bodySize="three" tag="p" color="primary">
              {address.country}
            </AddressRow>
            <AddressRow bodySize="three" tag="p" color="primary">
              {address.phone1}
            </AddressRow>
          </AddressSectionComponent>
          <AddressSectionComponent>
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
          </AddressSectionComponent>
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
    </Col>
  );
};

export default AddressBookTile;
