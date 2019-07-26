import React from 'react';
import { View } from 'react-native';
import AddressTile from './AddressTile.view.native';

// @flow
type Props = {
  addresses: Object[],
  labels: {},
  onDefaultShippingAddressClick: Object,
  setDeleteModalMountState: Function,
  setSelectedAddress: Function,
};

export const AddressList = ({
  addresses,
  labels,
  onDefaultShippingAddressClick,
  setDeleteModalMountState,
  setSelectedAddress,
}: Props) => {
  return (
    <View>
      {addresses.map(address => (
        <AddressTile
          address={address}
          key={address.addressId}
          labels={labels}
          setDeleteModalMountState={setDeleteModalMountState}
          setSelectedAddress={setSelectedAddress}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
        />
      ))}
    </View>
  );
};
export default AddressList;
