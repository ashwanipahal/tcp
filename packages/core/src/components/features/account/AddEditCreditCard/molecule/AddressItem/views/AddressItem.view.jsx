/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Address from '../../../../../../common/molecules/Address';

const AddressItem = ({ address, isPlain }) => {
  if (isPlain) {
    return `${address.firstName} ${address.lastName}
            ${address.addressLine[0]}
            ${address.city}
          `;
  }
  return <Address address={address} />;
};

AddressItem.propTypes = {
  address: PropTypes.object.isRequired,
  isPlain: PropTypes.bool,
};

AddressItem.defaultProps = {
  isPlain: true,
};

export default AddressItem;
