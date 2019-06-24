// @flow

import React from 'react';
import Row from '../../../../common/atoms/Row';
import AddressTile from './AddressTile.view';

type Props = {
  addresses: Array,
};
const AddressList = ({ addresses }: Props) => {
  return (
    <Row fullBleed>
      {addresses.size > 0 &&
        addresses.map(address => <AddressTile address={address} key={address.addressId} />)}
    </Row>
  );
};
export default AddressList;
