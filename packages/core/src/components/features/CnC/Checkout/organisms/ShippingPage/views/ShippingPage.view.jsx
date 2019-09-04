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
    addressPhoneNumber: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    orderHasPickUp: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
    loadShipmentMethods: PropTypes.func.isRequired,
    routeToPickupPage: PropTypes.func.isRequired,
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
        loadShipmentMethods({ formName: 'checkoutShipping' });
      }
    }

  }

  submitShippingData = data => {
    // console.log(data);
    const { address, shipmentMethods, onFileAddressKey, defaultShipping, saveToAddressBook, smsSignUp = {} } = data;

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
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: defaultShipping || true,
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
      addressPhoneNumber,
      selectedShipmentId,
      emailSignUpLabels,
      isGuest,
      isUsSite,
      orderHasPickUp,
      shipmentMethods,
      defaultShipmentId,
      loadShipmentMethods,
      routeToPickupPage,
      isSaveToAddressBookChecked,
      userAddresses,
      onFileAddressKey,
      isMobile,
      newUserPhoneNo
    } = this.props;
    let defaultAddressId = null;
    if (userAddresses) {
      const defaultAddress = userAddresses.filter(address => address.primary === 'true')
      defaultAddressId = defaultAddress.size > 0 ? defaultAddress.get(0).addressId : '';
    }
    return (
      <>
        {shipmentMethods.length > 0 && (
          <ShippingForm
            routeToPickupPage={routeToPickupPage}
            addressLabels={addressLabels}
            isOrderUpdateChecked={isOrderUpdateChecked}
            shippingLabels={shippingLabels}
            smsSignUpLabels={smsSignUpLabels}
            initialValues={{
              address: { country: getSiteId() && getSiteId().toUpperCase() },
              shipmentMethods: { shippingMethodId: defaultShipmentId },
              saveToAddressBook: !isGuest && !defaultAddressId,
              onFileAddressKey: defaultAddressId
            }}
            selectedShipmentId={selectedShipmentId}
            checkPOBoxAddress={this.checkPOBoxAddress}
            addressPhoneNo={addressPhoneNumber}
            onSubmit={this.submitShippingData}
            emailSignUpLabels={emailSignUpLabels}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            shipmentMethods={shipmentMethods}
            loadShipmentMethods={loadShipmentMethods}
            defaultShipmentId={defaultShipmentId}
            isSaveToAddressBookChecked={isSaveToAddressBookChecked}
            userAddresses={userAddresses}
            onFileAddressKey={onFileAddressKey}
            isMobile={isMobile}
            newUserPhoneNo={newUserPhoneNo}
            defaultAddressId={defaultAddressId}
          />
        )}
      </>
    );
  }
}
