import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import Address from '../../../../common/molecules/Address';
import styles from '../styles/AddressTile.style';
import Badge from '../../../../common/atoms/Badge';

// @flow

type Props = {
  address: Object,
  labels: Object,
  className: string,
};

const onDeleteAddressClick = (e, address, openAccountModalComponent) => {
  e.preventDefault();
  openAccountModalComponent('delete', address);
};

export const AddressBookTile = ({
  address,
  labels,
  className,
  openAccountModalComponent,
}: Props) => {
  return (
    <div className={className}>
      <div className="addressTile__row--twoCol">
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
            <Anchor fontSizeVariation="small" underline to="/#" anchorVariation="primary">
              {labels.makeDefault}
            </Anchor>
          )}
        </div>
      </div>
      <div className="addressTile__row--oneCol">
        <Anchor fontSizeVariation="medium" underline to="/#" anchorVariation="primary">
          {labels.edit}
        </Anchor>
        <Anchor
          fontSizeVariation="medium"
          underline
          to="/#"
          anchorVariation="primary"
          onClick={e => onDeleteAddressClick(e, address, openAccountModalComponent)}
        >
          {labels.delete}
        </Anchor>
      </div>
    </div>
  );
};

export default withStyles(AddressBookTile, styles);
