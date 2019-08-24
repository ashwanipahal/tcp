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
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNo: null,
    address: null,
    selectedShipmentId: null,
  };

  checkPOBoxAddress = () => {
    const {
      address: { addressLine1, addressLine2 },
    } = this.props;
    if (hasPOBox(addressLine1, addressLine2)) {
      console.log('action to call shipment method');
    }
  };

  render() {
    const {
      addressLabels,
      isOrderUpdateChecked,
      shippingLabels,
      smsSignUpLabels,
      addressPhoneNo,
      selectedShipmentId,
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
      />
    );
  }
}
