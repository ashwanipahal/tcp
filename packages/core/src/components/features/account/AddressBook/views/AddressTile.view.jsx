import React from 'react';
import Router from 'next/router'; //eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Anchor from '../../../../common/atoms/Anchor';
import Address from '../../../../common/molecules/Address';
import styles from '../styles/AddressTile.style';
import Badge from '../../../../common/atoms/Badge';
import utils from '../../../../../utils';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';

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

  onEditAddressClick = e => {
    e.preventDefault();
    const { address } = this.props;
    utils.routerPush(
      `/account?id=edit-address&addressId=${address.addressId}`,
      `/account/address-book/edit-address/${address.addressId}`
    );
  };

  render() {
    const { address, labels, className } = this.props;
    return (
      <div className={className}>
        <div className="addressTile__row--twoCol">
          <Row fullBleed>
            <Col
              colSize={{
                small: 3,
                large: 7,
                medium: 4,
              }}
            >
              <Address address={address} dataLocatorPrefix="addressbook" fontWeight="extrabold" />
            </Col>
            <Col
              colSize={{
                small: 3,
                large: 5,
                medium: 4,
              }}
            >
              <div>
                {address.primary === 'true' && (
                  <Badge showCheckmark dataLocator="addressbook-defshippinglabel">
                    {labels.addressBook.ACC_LBL_DEFAULT_SHIPPING}
                  </Badge>
                )}
                {address.xcont_isDefaultBilling === 'true' && (
                  <Badge showCheckmark dataLocator="addressbook-defbillinglabel">
                    {labels.addressBook.ACC_LBL_DEFAULT_BILLING}
                  </Badge>
                )}
                {address.primary !== 'true' && address.xcont_isShippingAddress === 'true' && (
                  <Badge
                    dataLocator="addressbook-shippinglabel"
                    className="addressbook-shippinglabel"
                  >
                    {labels.addressBook.ACC_LBL_SHIPPING}
                  </Badge>
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
                      data-locator="addressbook-makedefault"
                    >
                      {labels.common.lbl_common_makeDefault}
                    </Anchor>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div className="addressTile__row">
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            data-locator="addressbook-edit"
            onClick={this.onEditAddressClick}
          >
            {labels.common.lbl_common_edit}
          </Anchor>
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            data-locator="addressbook-deletelink"
            onClick={e => this.onDeleteAddressClick(e)}
          >
            {labels.common.lbl_common_delete}
          </Anchor>
        </div>
      </div>
    );
  }
}

export default withStyles(AddressBookTile, styles);
export { AddressBookTile as AddressBookTileVanilla };
