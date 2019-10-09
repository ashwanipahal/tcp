import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Anchor from '../../../../common/atoms/Anchor';
import Address from '../../../../common/molecules/Address';
import styles from '../styles/AddressTile.style';
import Badge from '../../../../common/atoms/Badge';
import utils from '../../../../../utils';
import Col from '../../../../common/atoms/Col';
import Row from '../../../../common/atoms/Row';

class AddressBookTile extends React.Component {
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
              <div className="default-address-label">
                {address.primary === 'true' && (
                  <Badge showCheckmark dataLocator="addressbook-defshippinglabel">
                    {getLabelValue(labels, 'ACC_LBL_DEFAULT_SHIPPING', 'addressBook')}
                  </Badge>
                )}
                {address.xcont_isDefaultBilling === 'true' && (
                  <Badge showCheckmark dataLocator="addressbook-defbillinglabel">
                    {getLabelValue(labels, 'ACC_LBL_DEFAULT_BILLING', 'addressBook')}
                  </Badge>
                )}
                {address.primary !== 'true' && address.xcont_isShippingAddress === 'true' && (
                  <Badge
                    dataLocator="addressbook-shippinglabel"
                    className="addressbook-shippinglabel"
                  >
                    {getLabelValue(labels, 'ACC_LBL_SHIPPING', 'addressBook')}
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
                      dataLocator="addressbook-makedefault"
                    >
                      {getLabelValue(labels, 'lbl_common_makeDefault', 'common')}
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
            dataLocator="addressbook-edit"
            onClick={this.onEditAddressClick}
          >
            {getLabelValue(labels, 'lbl_common_edit', 'common')}
          </Anchor>
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            dataLocator="addressbook-deletelink"
            onClick={e => this.onDeleteAddressClick(e)}
          >
            {getLabelValue(labels, 'lbl_common_delete', 'common')}
          </Anchor>
        </div>
      </div>
    );
  }
}

AddressBookTile.propTypes = {
  address: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  onDefaultShippingAddressClick: PropTypes.shape({}).isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
  setSelectedAddress: PropTypes.func.isRequired,
};

export default withStyles(AddressBookTile, styles);
export { AddressBookTile as AddressBookTileVanilla };
