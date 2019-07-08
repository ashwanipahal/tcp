import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import AddressTile from './AddressTile.view';
import styles from '../styles/AddressList.style';

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
    <Row fullBleed className={className}>
      {addresses.map((address, index) => (
        <Col
          className="addressList__col"
          key={`container-${address.addressId}`}
          colSize={{ large: 4, medium: 4, small: 6 }}
          ignoreGutter={{
            large: (index + 1) % 3 === 0,
            medium: (index + 1) % 2 === 0,
            small: true,
          }}
        >
          <AddressTile
            address={address}
            key={address.addressId}
            labels={labels}
            setDeleteModalMountState={setDeleteModalMountState}
            setSelectedAddress={setSelectedAddress}
            onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          />
        </Col>
      ))}
    </Row>
  );
};
export default withStyles(AddressList, styles);
