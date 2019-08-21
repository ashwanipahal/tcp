import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSendOrderUpdate, getAlternateFormUpdate } from './Pickup.selectors';

import CheckoutPickUpForm from '../views/CheckoutPickUpFormView';

export class PickupContainer extends React.PureComponent {
  render() {
    const { isOrderUpdateChecked, isAlternateUpdateChecked } = this.props;
    const props = {
      error: '',
      isGuest: true,
      isUsSite: true,
      isSMSActive: false,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
    };
    return <CheckoutPickUpForm {...props} />;
  }
}

PickupContainer.propTypes = {
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
  };
};

export default connect(mapStateToProps)(PickupContainer);
