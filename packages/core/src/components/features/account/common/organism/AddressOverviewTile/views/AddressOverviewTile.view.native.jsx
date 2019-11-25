import React from 'react';
import { View } from 'react-native';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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

  /**
   *  Redirects to corresponding page based on default billing address availability
   */
  defaultBillingCta = defaultBillingAddress => {
    const { handleComponentChange } = this.props;
    handleComponentChange(
      defaultBillingAddress && defaultBillingAddress.length
        ? 'addressBookMobile'
        : 'paymentGiftCardsPageMobile'
    );
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
          text={getLabelValue(labels, 'lbl_overview_addressBookHeading')}
          color="black"
          fontWeight="extrabold"
        />

        <UnderlineStyle />

        <AddressTypeContainer>
          <View style={LeftContainer}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={getLabelValue(labels, 'lbl_overview_defaultShipingAddress')}
              color="black"
              fontWeight="extrabold"
            />
          </View>
          <View style={RightContainer}>
            <Anchor
              anchorVariation="primary"
              text={
                defaultShippingAddress && defaultShippingAddress.length
                  ? getLabelValue(labels, 'lbl_overview_addressBookEdit')
                  : getLabelValue(labels, 'lbl_overview_addressBookAdd')
              }
              onPress={() => handleComponentChange('addressBookMobile')}
              underline
              fontSizeVariation="large"
              noLink
              dataLocator="addressbook-overview-edit"
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
            showPhone={false}
          />
        ) : (
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="regular"
            text={getLabelValue(labels, 'lbl_overview_addressNotAdded')}
          />
        )}
        <UnderlineStyle />

        <AddressTypeContainer>
          <View style={LeftContainer}>
            <BodyCopy
              fontFamily="secondary"
              fontSize="fs14"
              text={getLabelValue(labels, 'lbl_overview_defaultBillingAddress')}
              color="black"
              fontWeight="extrabold"
            />
          </View>
          <View style={RightContainer}>
            <Anchor
              anchorVariation="primary"
              text={
                defaultBillingAddress && defaultBillingAddress.length
                  ? getLabelValue(labels, 'lbl_overview_addressBookEdit')
                  : getLabelValue(labels, 'lbl_overview_addressBookAdd')
              }
              onPress={() => this.defaultBillingCta(defaultBillingAddress)}
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
            showPhone={false}
          />
        ) : (
          <BodyCopy
            fontSize="fs14"
            fontFamily="secondary"
            fontWeight="regular"
            text={getLabelValue(labels, 'lbl_overview_addressNotAdded')}
          />
        )}

        <ButtonWrapperStyle>
          <CustomButton
            text={getLabelValue(labels, 'lbl_overview_addressBookCTA')}
            fill="BLUE"
            onPress={() => handleComponentChange('addressBookMobile')}
          />
        </ButtonWrapperStyle>
      </AddressTileContainer>
    );
  }
}

export default AddressOverviewTile;
