import React from 'react';
import PropTypes from 'prop-types';
import ShippingForm from '../organisms/ShippingForm';
import { getSiteId } from '../../../../../../../utils/utils.web';
import checkoutUtil from '../../../util/utility';

const { hasPOBox } = checkoutUtil;

export default class ShippingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    selectedShipmentId: PropTypes.string,
    addressPhoneNo: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    orderHasPickUp: PropTypes.bool,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNo: null,
    address: null,
    selectedShipmentId: null,
    isGuest: true,
    isUsSite: true,
    orderHasPickUp: false,
  };

  checkPOBoxAddress = () => {
    const {
      address: { addressLine1, addressLine2 },
    } = this.props;
    if (hasPOBox(addressLine1, addressLine2)) {
      console.log('action to call shipment method');
    }
  };

  submitShippingData = data => {
    console.log(data);
    const { address, shipmentMethods, smsSignUp } = data;
    const addressData = {
      // verify address data
      addressLine1: address.address1,
      addressLine2: address.address2 || '',
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
    };
    const updateShipmentMethodsData = {
      // shipment Methods data
      transVibesSmsPhoneNo: smsSignUp.phoneNumber || '',
      shipModeId: shipmentMethods.shippingMethodId,
    };

    const addAddressData = {
      // addAddressData
      address1: address.address1,
      address2: address.address2,
      zip: address.zip,
      city: address.city,
      country: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone1: address.phoneNumber,
      state: address.state,
      email1: address.email,
      saveToAccount: address.saveToAccount || false,
      primary: address.isDefault || false,
      applyToOrder: true,
    };

    const addEmailSignUp = {
      URL: 'email-confirmation',
      catalogId: '10552',
      emailaddr: address.email,
      langId: '-1',
      response: 'invalid::false:false',
      storeId: '10152',
    };
  };

  render() {
    const {
      addressLabels,
      isOrderUpdateChecked,
      shippingLabels,
      smsSignUpLabels,
      addressPhoneNo,
      selectedShipmentId,
      emailSignUpLabels,
      isGuest,
      isUsSite,
      orderHasPickUp,
    } = this.props;
    return (
      <ShippingForm
        addressLabels={addressLabels}
        isOrderUpdateChecked={isOrderUpdateChecked}
        shippingLabels={shippingLabels}
        smsSignUpLabels={smsSignUpLabels}
        initialValues={{
          address: { country: getSiteId() && getSiteId().toUpperCase() },
          shipmentMethods: { shippingMethodId: '901101' },
        }}
        selectedShipmentId={selectedShipmentId}
        checkPOBoxAddress={this.checkPOBoxAddress}
        addressPhoneNo={addressPhoneNo}
        onSubmit={this.submitShippingData}
        emailSignUpLabels={emailSignUpLabels}
        isGuest={isGuest}
        isUsSite={isUsSite}
        orderHasPickUp={orderHasPickUp}
      />
    );
  }
}
