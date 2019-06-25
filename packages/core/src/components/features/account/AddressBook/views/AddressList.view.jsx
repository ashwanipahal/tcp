// @flow

import React from 'react';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import AddressTile from './AddressTile.view';

type Props = {
  addresses: Object[],
  labels: {},
};
const AddressList = ({ addresses, labels }: Props) => {
  return (
    <Row fullBleed>
      {addresses.map((address, index) => (
        <Col
          key={`container-${address.addressId}`}
          colSize={{ large: 3, medium: 4, small: 6 }}
          ignoreGutter={{
            large: (index + 1) % 3 === 0,
            medium: (index + 1) % 2 === 0,
            small: true,
          }}
        >
          <AddressTile address={address} key={address.addressId} labels={labels} />
        </Col>
      ))}
    </Row>
  );
};
export default AddressList;
