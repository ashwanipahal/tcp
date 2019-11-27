/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Shipping from '../views';
import checkoutUtil from '../../../util/utility';

const { hasPOBox } = checkoutUtil;

class ShippingContainer extends React.Component {
  static propTypes = {
    shippingDidMount: PropTypes.func.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    checkoutRoutingDone: PropTypes.bool.isRequired,
    shipmentMethods: PropTypes.shape({}).isRequired,

    addressLabels: PropTypes.shape({}).isRequired,
    checkoutServerError: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { shippingDidMount } = this.props;
    shippingDidMount();
  }

  shouldComponentUpdate() {
    const { isSubmitting } = this.props;
    return !isSubmitting;
  }

  submitVerifiedShippingAddressData = scopeValue => shippingAddress => {
    const scope = scopeValue;
    const {
      submitVerifiedShippingAddressData,
      navigation,
      updateShippingAddressData,
    } = scope.props;
    scope.setState({ showAddressVerification: false });
    if (scope.isAddressUpdating) {
      scope.isAddressUpdating = false;
      scope.submitShippingAddressData.shipTo.address = {
        ...scope.submitShippingAddressData.shipTo.address,
        ...shippingAddress,
        addressLine1: shippingAddress.address1,
        addressLine2: shippingAddress.address2,
        zipCode: shippingAddress.zip,
      };
      return updateShippingAddressData(scope.submitShippingAddressData);
    }
    return submitVerifiedShippingAddressData({
      shippingAddress,
      submitData: scope.submitData,
      navigation,
    });
  };

  shippingDidUpdate = prevProps => {
    const { address } = this.props;
    const { selectedShipmentId, updateShippingMethodSelection, shippingAddressId } = this.props;
    const { address: prevAddress, selectedShipmentId: prevSelectedShipmentId } = prevProps;
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

    if (shippingAddressId && selectedShipmentId !== prevSelectedShipmentId) {
      updateShippingMethodSelection({ id: selectedShipmentId });
    }
    const { shipmentMethods: prevShipmentMethods } = prevProps;
    const { shipmentMethods: nextShipmentMethods, dispatch, defaultShipmentId } = this.props;
    if (nextShipmentMethods && prevShipmentMethods !== nextShipmentMethods) {
      dispatch(change('checkoutShipping', 'shipmentMethods.shippingMethodId', defaultShipmentId));
    }
  };

  addNewShippingAddress = () => {
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      addNewShippingAddressData,
    } = this.props;
    addNewShippingAddressData({
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    });
  };

  updateShippingAddress = scopeValue => () => {
    const scope = scopeValue;
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      formatPayload,
      verifyAddressAction,
    } = scope.props;
    scope.isAddressUpdating = true;
    scope.submitShippingAddressData = {
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    };
    const formattedPayload = formatPayload(address);
    scope.setState({ showAddressVerification: true });
    return verifyAddressAction(formattedPayload);
  };

  submitShippingForm = scopeValue => data => {
    const scope = scopeValue;
    const {
      address,
      shipmentMethods,
      onFileAddressKey,
      defaultShipping,
      saveToAddressBook,
      smsSignUp = {},
    } = data;
    const {
      isGuest,
      userAddresses,
      formatPayload,
      setVenmoPickupState,
      hasSetGiftOptions,
    } = scope.props;
    let shipAddress = address;
    if (!isGuest && userAddresses && userAddresses.size > 0 && onFileAddressKey) {
      shipAddress = userAddresses.find(item => item.addressId === onFileAddressKey);
      if (shipAddress) {
        const { addressLine } = shipAddress;
        const [addressLine1, addressLine2] = addressLine;
        shipAddress.addressLine1 = addressLine1;
        shipAddress.addressLine2 = addressLine2;
      }
    }
    const submitData = {
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: shipAddress,
        addressId: shipAddress.addressId,
        emailAddress: shipAddress.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: shipAddress.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: defaultShipping || shipAddress.primary === 'true',
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
      hasSetGiftOptions,
    };
    const { handleSubmit, verifyAddressAction } = scope.props;
    if (!onFileAddressKey) {
      const formattedPayload = formatPayload(shipAddress);
      scope.submitData = submitData;
      scope.setState({ showAddressVerification: true });
      return verifyAddressAction(formattedPayload);
    }

    handleSubmit(submitData);
    return setVenmoPickupState(true);
  };

  render() {
    const { shipmentMethods, checkoutRoutingDone } = this.props;
    return (
      <>
        {
          <Shipping
            {...this.props}
            updateShippingAddress={this.updateShippingAddress}
            submitShippingForm={this.submitShippingForm}
            shippingDidUpdate={this.shippingDidUpdate}
            submitVerifiedShippingAddressData={this.submitVerifiedShippingAddressData}
            addNewShippingAddress={this.addNewShippingAddress}
          />
        }
      </>
    );
  }
}

export default connect()(ShippingContainer);
