import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShippingPageView from '../views';
import {
  getAddressFormLabels,
  getSendOrderUpdate,
  getShippingLabels,
  getSmsSignUpLabels,
} from './ShippingPage.selectors';

const ShippingPage = ({ addressLabels, isOrderUpdateChecked, shippingLabels, smsSignUpLabels }) => {
  return (
    <ShippingPageView
      addressLabels={addressLabels}
      isOrderUpdateChecked={isOrderUpdateChecked}
      shippingLabels={shippingLabels}
      smsSignUpLabels={smsSignUpLabels}
    />
  );
};

export const mapStateToProps = state => {
  return {
    addressLabels: getAddressFormLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    shippingLabels: getShippingLabels(state),
    smsSignUpLabels: getSmsSignUpLabels(state),
  };
};

ShippingPage.propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  shippingLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
};

ShippingPage.defaultProps = {
  isOrderUpdateChecked: false,
};

export default connect(mapStateToProps)(ShippingPage);
export { ShippingPage as ShippingPageVanilla };
