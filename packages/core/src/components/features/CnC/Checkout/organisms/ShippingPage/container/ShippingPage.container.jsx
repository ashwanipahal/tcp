/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShippingPage from '../views/ShippingPage.view';
import checkoutUtil from '../../../util/utility';

const { hasPOBox } = checkoutUtil;

class ShippingContainer extends React.Component {
  static propTypes = {
    shippingDidMount: PropTypes.func.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    shipmentMethods: PropTypes.shape({}).isRequired,

    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    isGiftServicesChecked: PropTypes.bool,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    selectedShipmentId: PropTypes.string,
    addressPhoneNumber: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
    checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
    orderHasPickUp: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
    loadShipmentMethods: PropTypes.func.isRequired,
    routeToPickupPage: PropTypes.func.isRequired,
    isSaveToAddressBookChecked: PropTypes.bool,
    userAddresses: PropTypes.shape([]),
    onFileAddressKey: PropTypes.string,
    isMobile: PropTypes.bool,
    newUserPhoneNo: PropTypes.number,
    shippingAddressId: PropTypes.string,
    setAsDefaultShipping: PropTypes.bool,
    addNewShippingAddressData: PropTypes.func.isRequired,
    // checkoutRoutingDone: PropTypes.bool.isRequired,
    formatPayload: PropTypes.func.isRequired,
    submitVerifiedShippingAddressData: PropTypes.func.isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
    updateShippingMethodSelection: PropTypes.func.isRequired,
    saveToAddressBook: PropTypes.bool,
    updateShippingAddressData: PropTypes.func.isRequired,
    toggleCountrySelector: PropTypes.func.isRequired,
    shippingDidMount: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    syncErrors: PropTypes.shape({}),
    shippingAddress: PropTypes.shape({}),
    isVenmoPaymentInProgress: PropTypes.bool,
    isVenmoShippingDisplayed: PropTypes.bool,
    setVenmoPickupState: PropTypes.func,
    shippingPhoneAndEmail: PropTypes.shape({}),
    ServerErrors: PropTypes.node.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    pageCategory: PropTypes.string,
    clearCheckoutServerError: PropTypes.func.isRequired,
    checkoutServerError: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    pickUpContactPerson: PropTypes.shape({}).isRequired,
    isLoadingShippingMethods: PropTypes.bool,
  };

  static defaultProps = {};

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

    if (
      shippingAddressId &&
      prevSelectedShipmentId &&
      selectedShipmentId !== prevSelectedShipmentId
    ) {
      updateShippingMethodSelection({ id: selectedShipmentId });
    }
  };

  render() {
    const { shipmentMethods } = this.props;
    return (
      <>
        {shipmentMethods && shipmentMethods.length > 0 && (
          <ShippingPage
            {...this.props}
            shippingDidUpdate={this.shippingDidUpdate}
            submitVerifiedShippingAddressData={this.submitVerifiedShippingAddressData}
          />
        )}
      </>
    );
  }
}

export default connect()(ShippingContainer);
