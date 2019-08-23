import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getSendOrderUpdate,
} from './Pickup.selectors';
import { getSmsSignUpLabels } from '../../ShippingPage/container/ShippingPage.selectors';

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
      pickUpData: {
        firstName: 'firstName',
        lastName: 'lastName',
        emailAddress: 'name@gmail.com',
        phoneNumber: '8778788778',
        smsInfo: {
          wantsSmsOrderUpdates: '8778788778',
          smsUpdateNumber: '8778788778',
        },
        hasAlternatePickup: true,
        pickUpAlternate: {},
      },
      initialValues: {
        pickUpContact: {
          firstName: 'deependra',
          lastName: 'sankhala',
          emailAddress: 'deep@gmail.com',
          phoneNumber: '8778788778',
        },
        smsSignUp: {
          sendOrderUpdate: true,
          phoneNumber: '8778788778',
        },
        pickUpAlternate: {
          hasAlternatePickup: true,
          firstName: 'firstName',
          lastName: 'lastName',
          emailAddress: 'name@gmail.com',
        },
      },
      error: '',
      isGuest: false,
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
  initialValues: PropTypes.shape({}).isRequired,
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
