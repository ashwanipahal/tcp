import React from 'react';
import PropTypes from 'prop-types';
import CheckoutConstants from '../Checkout.constants';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';
import Confirmation from '../../Confirmation';

export default class CheckoutPage extends React.PureComponent {
  submitShippingSection = data => {
    const { submitShippingSection, navigation } = this.props;
    submitShippingSection({ ...data, navigation });
  };

  getCurrentPage = () => {
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
      updateShippingMethodSelection,
      updateShippingAddressData,
      addNewShippingAddressData,
      // setCheckoutStage,
      onPickupSubmit,
      submitReview,
    } = this.props;
    const { routeTo } = navigation.state.params;
    const currentRoute = routeTo.toLowerCase();
    const {
      PICKUP,
      SHIPPING,
      BILLING,
      REVIEW,
      CONFIRMATION,
    } = CheckoutConstants.CHECKOUT_PAGES_NAMES;
    switch (currentRoute) {
      case PICKUP.toLowerCase():
        return (
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
        );
      case SHIPPING.toLowerCase():
        return (
          <ShippingPage
            {...shippingProps}
            loadShipmentMethods={loadShipmentMethods}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={this.submitShippingSection}
            availableStages={availableStages}
            updateShippingMethodSelection={updateShippingMethodSelection}
            updateShippingAddressData={updateShippingAddressData}
            addNewShippingAddressData={addNewShippingAddressData}
            labels={labels}
          />
        );
      case BILLING.toLowerCase():
        return (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            availableStages={availableStages}
            submitBilling={submitBilling}
          />
        );
      case REVIEW.toLowerCase():
        return (
          <ReviewPage
            {...reviewProps}
            navigation={navigation}
            submitReview={submitReview}
            availableStages={availableStages}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
          />
        );
      case CONFIRMATION.toLowerCase():
        return <Confirmation />;
      default:
        return null;
    }
  };

  render() {
    return <>{this.getCurrentPage()}</>;
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
  updateShippingMethodSelection: PropTypes.func.isRequired,
  updateShippingAddressData: PropTypes.func.isRequired,
  addNewShippingAddressData: PropTypes.func.isRequired,
};
