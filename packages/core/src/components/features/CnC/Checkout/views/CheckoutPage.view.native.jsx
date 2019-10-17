import React from 'react';
import PropTypes from 'prop-types';
import CheckoutConstants from '../Checkout.constants';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';
import withKeyboardAvoidingView from '../../../../common/hoc/withKeyboardAvoidingView.native';
import Confirmation from '../../Confirmation';

class CheckoutPage extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { currentStage: prevCurrentStage } = prevProps;
    const { setCheckoutStage, currentStage } = this.props;
    if (currentStage !== prevCurrentStage) {
      setCheckoutStage(currentStage);
    }
  }

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
      onPickupSubmit,
      formatPayload,
      verifyAddressAction,
      submitVerifiedShippingAddressData,
      submitReview,
      currentStage,
      setCheckoutStage,
      isVenmoPaymentInProgress,
      setVenmoPickupState,
      setVenmoShippingState,
      isVenmoPickupBannerDisplayed,
      isVenmoShippingBannerDisplayed,
    } = this.props;
    const { PICKUP, SHIPPING, BILLING, REVIEW, CONFIRMATION } = CheckoutConstants.CHECKOUT_STAGES;
    const { venmoBannerText } = pickUpLabels;
    switch (currentStage && currentStage.toLowerCase()) {
      case PICKUP:
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
            setCheckoutStage={setCheckoutStage}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            orderHasShipping={orderHasShipping}
            isVenmoPickupDisplayed={isVenmoPickupBannerDisplayed}
            isVenmoShippingDisplayed={isVenmoShippingBannerDisplayed}
          />
        );
      case SHIPPING:
        return (
          <ShippingPage
            {...shippingProps}
            loadShipmentMethods={loadShipmentMethods}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            submitVerifiedShippingAddressData={submitVerifiedShippingAddressData}
            verifyAddressAction={verifyAddressAction}
            formatPayload={formatPayload}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={this.submitShippingSection}
            availableStages={availableStages}
            updateShippingMethodSelection={updateShippingMethodSelection}
            updateShippingAddressData={updateShippingAddressData}
            addNewShippingAddressData={addNewShippingAddressData}
            labels={labels}
            setCheckoutStage={setCheckoutStage}
            venmoBannerLabel={{ venmoBannerText }}
            setVenmoPickupState={setVenmoPickupState}
            isVenmoPickupDisplayed={isVenmoPickupBannerDisplayed}
            isVenmoShippingDisplayed={isVenmoShippingBannerDisplayed}
          />
        );
      case BILLING:
        return (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            navigation={navigation}
            isGuest={isGuest}
            isUsSite={isUsSite}
            availableStages={availableStages}
            submitBilling={submitBilling}
            setCheckoutStage={setCheckoutStage}
          />
        );
      case REVIEW:
        return (
          <ReviewPage
            {...reviewProps}
            navigation={navigation}
            submitReview={submitReview}
            availableStages={availableStages}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
            setCheckoutStage={setCheckoutStage}
            setVenmoPickupState={setVenmoPickupState}
            setVenmoShippingState={setVenmoShippingState}
          />
        );
      case CONFIRMATION:
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
  formatPayload: PropTypes.func.isRequired,
  verifyAddressAction: PropTypes.func.isRequired,
  submitVerifiedShippingAddressData: PropTypes.func.isRequired,
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
  currentStage: PropTypes.string.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  setVenmoPickupState: PropTypes.func,
  setVenmoShippingState: PropTypes.func,
  isVenmoPickupBannerDisplayed: PropTypes.bool,
  isVenmoShippingBannerDisplayed: PropTypes.bool,
};

CheckoutPage.defaultProps = {
  isVenmoPaymentInProgress: false,
  setVenmoPickupState: () => {},
  setVenmoShippingState: () => {},
  isVenmoPickupBannerDisplayed: true,
  isVenmoShippingBannerDisplayed: true,
};

export default withKeyboardAvoidingView(CheckoutPage);
