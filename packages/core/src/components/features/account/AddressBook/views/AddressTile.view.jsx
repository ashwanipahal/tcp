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
  onDefaultShippingAddressClick(address: {}): Object,
  setSelectedAddress: Function,
  setDeleteModalMountState: Function,
};

class AddressBookTile extends React.Component<Props> {
  handleDefaultLinkClick = event => {
    const { onDefaultShippingAddressClick, address } = this.props;
    event.preventDefault();

    const setDefaultShippingAddressJSON = {
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine: address.addressLine,
      attributes: address.attributes,
      addressType: address.addressType,
      zipCode: address.zipCode,
      city: address.city,
      state: address.state,
      country: address.country,
      email1: address.email1,
      phone1: address.phone1,
      xcont_addressField3: address.zipCode,
      phone1Publish: address.phone1Publish === 'true' || false,
      primary: 'true',
      xcont_pageName: 'myAccount',
      nickName: address.nickName,
    };

    onDefaultShippingAddressClick(setDefaultShippingAddressJSON);
  };

  onDeleteAddressClick = e => {
    const { address, setDeleteModalMountState, setSelectedAddress } = this.props;
    e.preventDefault();
    setSelectedAddress(address);
    setDeleteModalMountState({ state: true });
  };

  render() {
    const { address, labels, className } = this.props;
    return (
      <div className={className}>
        <div className="addressTile__row--twoCol">
          <Address address={address} />
          <div>
            {address.primary === 'true' && <Badge showCheckmark>{labels.defaultShipping}</Badge>}
            {address.xcont_isDefaultBilling === 'true' && (
              <Badge showCheckmark>{labels.defaultBilling}</Badge>
            )}
            {address.xcont_isDefaultBilling !== 'true' &&
              address.xcont_isBillingAddress === 'true' && <Badge>{labels.billing}</Badge>}
            {address.primary !== 'true' && address.xcont_isShippingAddress === 'true' && (
              <Badge>{labels.shipping}</Badge>
            )}
            {address.primary !== 'true' && (
              <div className="textRight">
                <Anchor
                  fontSizeVariation="small"
                  underline
                  anchorVariation="primary"
                  handleLinkClick={this.handleDefaultLinkClick}
                  noLink
                  to=""
                >
                  {labels.makeDefault}
                </Anchor>
              </div>
            )}
          </div>
        </div>
        <div className="addressTile__row">
          <Anchor fontSizeVariation="large" underline to="/#" anchorVariation="primary">
            {labels.edit}
          </Anchor>
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            onClick={e => this.onDeleteAddressClick(e)}
          >
            {labels.delete}
          </Anchor>
        </div>
      </div>
    );
  }
}

export default withStyles(AddressBookTile, styles);
export { AddressBookTile as AddressBookTileVanilla };
