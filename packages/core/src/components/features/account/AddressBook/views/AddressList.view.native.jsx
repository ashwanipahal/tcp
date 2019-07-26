import React from 'react';
import { View, ScrollView } from 'react-native';
import AddressTile from './AddressTile.view.native';

// @flow

type Props = {
  addresses: Object[],
  labels: {},
  className: string,
  onDefaultShippingAddressClick: Object,
  setDeleteModalMountState: Function,
  setSelectedAddress: Function,
};

export const AddressList = ({
  addresses,
  labels,
  className,
  onDefaultShippingAddressClick,
  setDeleteModalMountState,
  setSelectedAddress,
}: Props) => {
  return (
    <View>
      {addresses.map((address, index) => (
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
