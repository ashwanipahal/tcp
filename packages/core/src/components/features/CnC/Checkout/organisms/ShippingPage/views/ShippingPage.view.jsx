import React from 'react';
import PropTypes from 'prop-types';
import ShippingForm from '../organisms/ShippingForm';
import { getSiteId } from '../../../../../../../utils/utils.web';

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

  hasPOBox = (addressLine1 = '', addressLine2 = '') => {
    // some delimiter that will not allow them to match only if concatenated
    const value = `${addressLine1}#${addressLine2}`;
    // REVIEW: got the regex from: https://gist.github.com/gregferrell/7494667
    // seems to cover most use cases; not in the mood to write it from scratch
    return (
      value.search(
        /\bbox(?:\b$|([\s|-]+)?[0-9]+)|(p[-.\s]*o[-.\s]*|(post office|post)\s)b(\.|ox|in)?\b|(^p[.]?(o|b)[.]?$)/gim
      ) >= 0
    );
  };

  checkPOBoxAddress = () => {
    const {
      address: { addressLine1, addressLine2 },
    } = this.props;
    if (this.hasPOBox(addressLine1, addressLine2)) {
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
