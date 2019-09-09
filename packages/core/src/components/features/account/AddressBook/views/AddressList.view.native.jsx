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
  toggleAddAddressModal: Function,
};

export const AddressList = ({
  addresses,
  labels,
  onDefaultShippingAddressClick,
  setDeleteModalMountState,
  setSelectedAddress,
  toggleAddAddressModal,
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
          toggleAddAddressModal={toggleAddAddressModal}
        />
      ))}
    </View>
  );
};
export default AddressList;
