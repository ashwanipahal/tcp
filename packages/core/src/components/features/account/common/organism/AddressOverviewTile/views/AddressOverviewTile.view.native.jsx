import React from 'react';
import { View } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import PropTypes from 'prop-types';
import CustomButton from '../../../../../../common/atoms/Button';
import {
  UnderlineStyle,
  AddressTileContainer,
  ButtonWrapperStyle,
  BodyCopyStyle,
  AddressTypeContainer,
  LeftContainer,
  RightContainer,
} from '../styles/AddressOverviewTile.style.native';
import Address from '../../../../../../common/molecules/Address';
import Anchor from '../../../../../../common/atoms/Anchor';

export class AddressOverviewTile extends React.PureComponent<Props> {
  static propTypes = {
    addressList: PropTypes.arrayOf({}),
    labels: PropTypes.shape({}),
    handleComponentChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labels: {},
    addressList: [],
  };

  render() {
    const { addressList, labels, handleComponentChange } = this.props;
    const defaultShippingAddress = [];
    const defaultBillingAddress = [];

    if (addressList) {
      addressList
        .map(addr => addr)
        .forEach(item => {
          if (item.primary === 'true') {
            defaultShippingAddress.push(item);
          }
          if (item.xcont_isDefaultBilling === 'true') {
            defaultBillingAddress.push(item);
          }
        });
    }
    return (
      <AddressTileContainer>
        <BodyCopy
          fontFamily="secondary"
          fontSize="fs16"
          text={labels.lbl_overview_addressBookHeading}
          color="black"
        />

        <UnderlineStyle />

        <AddressTypeContainer>
          <View style={LeftContainer}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              text={labels.lbl_overview_defaultShipingAddress}
              color="black"
            />
          </View>
          <View style={RightContainer}>
            <Anchor
              anchorVariation="primary"
              text={
                defaultBillingAddress && defaultBillingAddress.length
                  ? labels.lbl_overview_addressBookEdit
                  : labels.lbl_overview_addressBookAdd
              }
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="addressbook-overview-edit"
              color="gray.900"
            />
          </View>
        </AddressTypeContainer>
        {defaultShippingAddress && defaultShippingAddress.length ? (
          <Address
            address={defaultShippingAddress[0]}
            showCountry={false}
            customStyle={BodyCopyStyle}
            showName={false}
          />
        ) : (
          <BodyCopy
            fontSize="fs13"
            fontFamily="primary"
            fontWeight="regular"
            text={labels.lbl_overview_addressNotAdded}
          />
        )}
        <UnderlineStyle />

        <AddressTypeContainer>
          <View style={LeftContainer}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs16"
              text={labels.lbl_overview_defaultBillingAddress}
              color="black"
            />
          </View>
          <View style={RightContainer}>
            <Anchor
              anchorVariation="primary"
              text={
                defaultBillingAddress && defaultBillingAddress.length
                  ? labels.lbl_overview_addressBookEdit
                  : labels.lbl_overview_addressBookAdd
              }
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              data-locator="addressbook-makedefault"
              color="gray.900"
              lineHeight="10"
            />
          </View>
        </AddressTypeContainer>

        {defaultBillingAddress && defaultBillingAddress.length ? (
          <Address
            address={defaultBillingAddress[0]}
            showCountry={false}
            customStyle={BodyCopyStyle}
            showName={false}
          />
        ) : (
          <BodyCopy
            fontSize="fs13"
            fontFamily="primary"
            fontWeight="regular"
            text={labels.lbl_overview_addressNotAdded}
          />
        )}

        <ButtonWrapperStyle>
          <CustomButton
            text={labels.lbl_overview_addressBookCTA}
            buttonVariation="variable-width"
            fill="BLUE"
            color="white"
            onPress={() => handleComponentChange('addressBookMobile')}
          />
        </ButtonWrapperStyle>
      </AddressTileContainer>
    );
  }
}

export default AddressOverviewTile;
