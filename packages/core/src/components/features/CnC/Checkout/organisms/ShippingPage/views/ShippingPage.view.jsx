/* eslint-disable extra-rules/no-commented-out-code */
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
    handleSubmit: PropTypes.func.isRequired,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNo: null,
    address: null,
    selectedShipmentId: null,
    isGuest: true,
    isUsSite: true,
    orderHasPickUp: false,
    shipmentMethods: null,
    defaultShipmentId: null,
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
    // console.log(data);
    const { address, shipmentMethods, smsSignUp } = data;

    // const addAddressData = {
    //   applyToOrder: true,
    // };

    // const addEmailSignUp = {
    //   URL: 'email-confirmation',
    //   catalogId: '10552',
    //   emailaddr: address.email,
    //   langId: '-1',
    //   response: 'invalid::false:false',
    //   storeId: '10152',
    // };
    const { handleSubmit } = this.props;
    handleSubmit({
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: {
          addressLine1: address.address1,
          addressLine2: address.address2,
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
      shipmentMethods,
      defaultShipmentId,
    } = this.props;
    return (
      <ShippingForm
        addressLabels={addressLabels}
        isOrderUpdateChecked={isOrderUpdateChecked}
        shippingLabels={shippingLabels}
        smsSignUpLabels={smsSignUpLabels}
        initialValues={{
          address: { country: getSiteId() && getSiteId().toUpperCase() },
          shipmentMethods: { shippingMethodId: defaultShipmentId },
        }}
        selectedShipmentId={selectedShipmentId}
        checkPOBoxAddress={this.checkPOBoxAddress}
        addressPhoneNo={addressPhoneNo}
        onSubmit={this.submitShippingData}
        emailSignUpLabels={emailSignUpLabels}
        isGuest={isGuest}
        isUsSite={isUsSite}
        orderHasPickUp={orderHasPickUp}
        shipmentMethods={shipmentMethods}
      />
    );
  }
}
