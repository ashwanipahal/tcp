import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingForm from '../organisms/ShippingForm';
import StyledHeader from '../styles/ShippingPage.style.native';
import checkoutUtil from '../../../util/utility';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';

const { hasPOBox } = checkoutUtil;
export default class ShippingPage extends React.Component {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    selectedShipmentId: PropTypes.string,
    addressPhoneNumber: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    orderHasPickUp: PropTypes.bool,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
    loadShipmentMethods: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNumber: null,
    address: null,
    selectedShipmentId: null,
    isGuest: true,
    isUsSite: true,
    orderHasPickUp: false,
    shipmentMethods: null,
    defaultShipmentId: null,
  };

  componentDidUpdate(prevProps) {
    const { address } = this.props;
    const { address: prevAddress } = prevProps;
    if (address && prevAddress) {
      const {
        address: { addressLine1, addressLine2 },
        loadShipmentMethods,
      } = this.props;
      const {
        address: { addressLine1: prevAddressLine1, addressLine2: prevAddressLine2 },
      } = prevProps;
      if (
        (addressLine1 !== prevAddressLine1 || addressLine2 !== prevAddressLine2) &&
        hasPOBox(addressLine1, addressLine2)
      ) {
        loadShipmentMethods();
      }
    }
  }

  submitShippingForm = data => {
    const { address, shipmentMethods, smsSignUp } = data;
    const { handleSubmit } = this.props;
    handleSubmit({
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          country: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          isCommercialAddress: false,
          state: address.state,
          zipCode: address.zipCode,
        },
        addressId: undefined,
        emailAddress: address.emailAddress,

        emailSignup: true,
        onFileAddressKey: undefined,
        phoneNumber: address.phoneNumber,
        saveToAccount: address.saveToAccount || true,
        setAsDefault: address.isDefault || true,
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      shippingLabels,
      shipmentMethods,
      defaultShipmentId,
      selectedShipmentId,
      isGuest,
      isUsSite,
      orderHasPickUp,
      smsSignUpLabels,
      isOrderUpdateChecked,
      addressPhoneNumber,
      addressLabels,
      emailSignUpLabels,
      loadShipmentMethods,
    } = navigation.state.params;

    return (
      <>
        <CheckoutProgressIndicator activeStage="shipping" navigation={navigation} />
        <ScrollView>
          <CheckoutSectionTitleDisplay title={shippingLabels.header} />
          <StyledHeader>
            <BodyCopy
              color="black"
              fontWeight="regular"
              fontFamily="primary"
              fontSize="fs28"
              text={shippingLabels.sectionHeader}
              textAlign="left"
            />
          </StyledHeader>
          {shipmentMethods && shipmentMethods.length > 0 && (
            <ShippingForm
              shippingLabels={shippingLabels}
              shipmentMethods={shipmentMethods}
              initialValues={{
                shipmentMethods: { shippingMethodId: defaultShipmentId },
              }}
              selectedShipmentId={selectedShipmentId}
              isGuest={isGuest}
              isUsSite={isUsSite}
              orderHasPickUp={orderHasPickUp}
              smsSignUpLabels={smsSignUpLabels}
              isOrderUpdateChecked={isOrderUpdateChecked}
              emailSignUpLabels={emailSignUpLabels}
              addressPhoneNo={addressPhoneNumber}
              addressLabels={addressLabels}
              loadShipmentMethods={loadShipmentMethods}
              navigation={navigation}
              submitShippingForm={this.submitShippingForm}
            />
          )}
        </ScrollView>
      </>
    );
  }
}
