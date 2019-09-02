import React from 'react';
import PropTypes from 'prop-types';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  onPickUpSubmit = data => {
    const {
      onPickupSubmit,
      isGuest,
      isUsSite,
      shippingProps,
      loadShipmentMethods,
      orderHasPickUp,
      submitShippingSection,
    } = this.props;
    const { firstName, lastName, phoneNumber, emailAddress } = data.pickUpContact;
    const { hasAlternatePickup } = data.pickUpAlternate;
    const { navigation } = this.props;
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
    navigation.navigate('ShippingPage', {
      ...shippingProps,
      loadShipmentMethods,
      navigation,
      isGuest,
      isUsSite,
      orderHasPickUp,
      handleSubmit: { submitShippingSection },
    });
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
      shippingProps,
      loadShipmentMethods,
      orderHasPickUp,
      submitShippingSection,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
      // setCheckoutStage,
    } = this.props;

    const { nextToRoot } = navigation.state.params;
    return (
      <>
        {nextToRoot === 'pickupPage' && (
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
            onPickUpSubmit={this.onPickUpSubmit}
            navigation={navigation}
          />
        )}
        {nextToRoot === 'shippingPage' && (
          <ShippingPage
            {...shippingProps}
            loadShipmentMethods={loadShipmentMethods}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={submitShippingSection}
          />
        )}
      </>
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
  loadShipmentMethods: PropTypes.func.isRequired,
  orderHasPickUp: PropTypes.bool.isRequired,
  submitShippingSection: PropTypes.func.isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
};
