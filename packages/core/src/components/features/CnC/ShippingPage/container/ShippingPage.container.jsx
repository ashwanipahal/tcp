import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShippingPageView from '../views';
import {
  getSendOrderUpdate,
  getShippingLabels,
  getSmsSignUpLabels,
  getSelectedShipmentId,
  getAddressFields,
} from './ShippingPage.selectors';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';

const ShippingPage = ({
  addressLabels,
  isOrderUpdateChecked,
  shippingLabels,
  smsSignUpLabels,
  selectedShipmentId,
  address,
}) => {
  return (
    <ShippingPageView
      addressLabels={addressLabels}
      isOrderUpdateChecked={isOrderUpdateChecked}
      shippingLabels={shippingLabels}
      smsSignUpLabels={smsSignUpLabels}
      selectedShipmentId={selectedShipmentId}
      address={address}
    />
  );
};

export const mapStateToProps = state => {
  return {
    addressLabels: getAddEditAddressLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    shippingLabels: getShippingLabels(state),
    smsSignUpLabels: getSmsSignUpLabels(state),
    selectedShipmentId: getSelectedShipmentId(state),
    address: getAddressFields(state),
  };
};

ShippingPage.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  selectedShipmentId: PropTypes.string,
  address: PropTypes.shape({}),
};

ShippingPage.defaultProps = {
  isOrderUpdateChecked: false,
  selectedShipmentId: null,
  address: null,
};

export default connect(mapStateToProps)(ShippingPage);
export { ShippingPage as ShippingPageVanilla };
