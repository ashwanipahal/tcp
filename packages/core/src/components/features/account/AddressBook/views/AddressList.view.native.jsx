import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import AddressTile from './AddressTile.view.native';

// @flow
// type Props = {
//   addresses: Object[],
//   labels: {},
//   onDefaultShippingAddressClick: Object,
//   setDeleteModalMountState: Function,
//   setSelectedAddress: Function,
//   toggleAddAddressModal: Function,
// };

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

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  labels: PropTypes.shape({}).isRequired,
  onDefaultShippingAddressClick: PropTypes.shape({}).isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
  toggleAddAddressModal: PropTypes.func.isRequired,
};

export default AddressList;
