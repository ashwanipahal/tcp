import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSendOrderUpdate,
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getSmsSignUpLabels,
} from './Pickup.selectors';

import CheckoutPickUpForm from '../views/CheckoutPickUpFormView';
import { isCanada } from '../../../../../utils';

export class PickupContainer extends React.PureComponent {
  render() {
    const {
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
    } = this.props;
    const props = {
      error: '',
      isGuest: true,
      isUsSite: !isCanada(),
      pickUpLabels,
      smsSignUpLabels,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
    };
    return <CheckoutPickUpForm {...props} />;
  }
}

PickupContainer.propTypes = {
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    pickUpLabels: getPickUpContactFormLabels(state),
    smsSignUpLabels: getSmsSignUpLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
  };
};

export default connect(mapStateToProps)(PickupContainer);
export { PickupContainer as PickupContainerVanilla };
