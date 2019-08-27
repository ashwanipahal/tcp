import React from 'react';
import PropTypes from 'prop-types';
import PickupPage from '../organisms/PickupPage';
// import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  onPickUpSubmit = data => {
    const { onPickupSubmit } = this.props;
    const { firstName, lastName, phoneNumber, emailAddress } = data.pickUpContact;
    const { hasAlternatePickup } = data.pickUpAlternate;
    const params = {
      pickUpContact: {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        smsInfo: {
          wantsSmsOrderUpdates: data.smsSignUp.sendOrderUpdate,
        },
      },
      hasAlternatePickup,
      pickUpAlternate: {
        firstName: hasAlternatePickup ? data.pickUpAlternate.firstName : '',
        lastName: hasAlternatePickup ? data.pickUpAlternate.lastName : '',
        emailAddress: hasAlternatePickup ? data.pickUpAlternate.emailAddress : '',
      },
    };
    onPickupSubmit(params);
  };

  render() {
    const {
      isGuest,
      isMobile,
      isUsSite,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      navigation,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
    } = this.props;
    return (
      <PickupPage
        isGuest={isGuest}
        isMobile={isMobile}
        isUsSite={isUsSite}
        initialValues={pickupInitialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isOrderUpdateChecked={isOrderUpdateChecked}
        isAlternateUpdateChecked={isAlternateUpdateChecked}
        pickUpLabels={pickUpLabels}
        smsSignUpLabels={smsSignUpLabels}
        onSubmit={this.onPickUpSubmit}
        navigation={navigation}
      />
    );
  }
}

CheckoutPage.propTypes = {
  isGuest: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUsSite: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  shippingProps: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
};
