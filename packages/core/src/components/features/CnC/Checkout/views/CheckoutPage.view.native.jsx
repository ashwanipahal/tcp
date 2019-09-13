import React from 'react';
import PropTypes from 'prop-types';
import CheckoutConstants from '../Checkout.constants';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';

export default class CheckoutPage extends React.PureComponent {
  submitShippingSection = data => {
    const { submitShippingSection, navigation } = this.props;
    submitShippingSection({ ...data, navigation });
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
      billingProps,
      reviewProps,
      orderHasShipping,
      loadShipmentMethods,
      orderHasPickUp,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
      availableStages,
      labels,
      submitBilling,
      // setCheckoutStage,
      onPickupSubmit,
      submitReview,
    } = this.props;

    const { routeTo } = navigation.state.params;
    return (
      <>
        {routeTo.toLowerCase() === CheckoutConstants.CHECKOUT_PAGES_NAMES.PICKUP.toLowerCase() && (
          <PickupPage
            isGuest={isGuest}
            isMobile={isMobile}
            isUsSite={isUsSite}
            initialValues={pickupInitialValues}
            pickupInitialValues={pickupInitialValues}
            onEditModeChange={onEditModeChange}
            isSmsUpdatesEnabled={isSmsUpdatesEnabled}
            currentPhoneNumber={currentPhoneNumber}
            isOrderUpdateChecked={isOrderUpdateChecked}
            isAlternateUpdateChecked={isAlternateUpdateChecked}
            pickUpLabels={pickUpLabels}
            smsSignUpLabels={smsSignUpLabels}
            onPickupSubmit={onPickupSubmit}
            navigation={navigation}
            availableStages={availableStages}
          />
        )}
        {routeTo.toLowerCase() ===
          CheckoutConstants.CHECKOUT_PAGES_NAMES.SHIPPING.toLowerCase() && (
          <ShippingPage
            {...shippingProps}
            loadShipmentMethods={loadShipmentMethods}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={this.submitShippingSection}
            availableStages={availableStages}
            labels={labels}
          />
        )}
        {routeTo.toLowerCase() === CheckoutConstants.CHECKOUT_PAGES_NAMES.BILLING.toLowerCase() && (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            availableStages={availableStages}
            submitBilling={submitBilling}
          />
        )}
        {routeTo.toLowerCase() === CheckoutConstants.CHECKOUT_PAGES_NAMES.REVIEW.toLowerCase() && (
          <ReviewPage
            {...reviewProps}
            navigation={navigation}
            submitReview={submitReview}
            availableStages={availableStages}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
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
  billingProps: PropTypes.shape({}).isRequired,
  reviewProps: PropTypes.shape({}).isRequired,
  orderHasShipping: PropTypes.bool.isRequired,
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
  submitReview: PropTypes.func.isRequired,
  submitBilling: PropTypes.func.isRequired,
  availableStages: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
};
