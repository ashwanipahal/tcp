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
