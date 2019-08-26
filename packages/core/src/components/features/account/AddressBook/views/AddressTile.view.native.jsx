import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  AddressTileWrapper,
  AddressTileContext,
  AddressLinks,
  AddressLinkLeftMargin,
  AddressLabelsPrimary,
} from '../styles/AddressBook.style.native';

import withStyles from '../../../../common/hoc/withStyles.native';
import Badge from '../../../../common/atoms/Badge';
import Anchor from '../../../../common/atoms/Anchor';
import Address from '../../../../common/molecules/Address';

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
  };

  render() {
    const { address, labels } = this.props;

    return (
      <AddressTileWrapper>
        <AddressTileContext>
          <View>
            {address && (
              <Address
                address={address}
                dataLocatorPrefix="addressbook"
                fontWeight="bold"
                showName
              />
            )}
          </View>
          <View>
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
              <AddressLabelsPrimary>
                <Badge dataLocator="addressbook-shippinglabel" primary>
                  {labels.addressBook.ACC_LBL_SHIPPING}
                </Badge>
              </AddressLabelsPrimary>
            )}
            {address.primary !== 'true' && (
              <View className="textRight">
                <Anchor
                  fontSizeVariation="small"
                  underline
                  anchorVariation="primary"
                  onPress={this.handleDefaultLinkClick}
                  noLink
                  to="/#"
                  dataLocator="addressbook-makedefault"
                  text={labels.common.lbl_common_makeDefault}
                  color="gray.900"
                />
              </View>
            )}
          </View>
        </AddressTileContext>
        <AddressLinks>
          <AddressLinkLeftMargin>
            <Anchor
              fontSizeVariation="large"
              underline
              to="/#"
              anchorVariation="primary"
              text={labels.common.lbl_common_edit}
              color="gray.900"
            />
          </AddressLinkLeftMargin>
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            text={labels.common.lbl_common_delete}
            color="gray.900"
          />
        </AddressLinks>
      </AddressTileWrapper>
    );
  }
}

AddressBookTile.propTypes = {
  address: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}),
  setSelectedAddress: PropTypes.func.isRequired,
  setDeleteModalMountState: PropTypes.func.isRequired,
};

AddressBookTile.defaultProps = {
  labels: {
    common: {
      lbl_common_makeDefault: '',
      lbl_common_edit: '',
      lbl_common_delete: '',
    },
  },
};

export default withStyles(AddressBookTile);
export { AddressBookTile as AddressBookTileVanilla };
