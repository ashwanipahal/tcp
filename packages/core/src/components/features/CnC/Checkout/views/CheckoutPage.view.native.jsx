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
    const {
      currentStage: prevCurrentStage,
      checkoutServerError: prevCheckoutServerError,
    } = prevProps;
    const { setCheckoutStage, currentStage, checkoutServerError, toastMessage } = this.props;
    if (currentStage !== prevCurrentStage) {
      setCheckoutStage(currentStage);
    }

    if (checkoutServerError && checkoutServerError !== prevCheckoutServerError) {
      toastMessage(checkoutServerError.errorMessage);
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
      bagLoading,
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
      isExpressCheckout,
      pickUpContactAlternate,
      isHasPickUpAlternatePerson,
      pickUpAlternatePerson,
      cartOrderItemsCount,
      checkoutPageEmptyBagLabels,
      pickupDidMount,
      isPayPalWebViewEnable,
      pickUpContactPerson,
    } = this.props;
    const { PICKUP, SHIPPING, BILLING, REVIEW, CONFIRMATION } = CheckoutConstants.CHECKOUT_STAGES;
    const { venmoBannerText } = pickUpLabels;
    const { shipmentMethods } = shippingProps;
    switch (currentStage && currentStage.toLowerCase()) {
      case PICKUP:
        return (
          <PickupPage
            pickupDidMount={pickupDidMount}
            cartOrderItemsCount={cartOrderItemsCount}
            isGuest={isGuest}
            isMobile={isMobile}
            isUsSite={isUsSite}
            initialValues={pickupInitialValues}
            pickupInitialValues={pickupInitialValues}
            bagLoading={bagLoading}
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
            checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
          />
        );
      case SHIPPING:
        return (
          <ShippingPage
            {...shippingProps}
            cartOrderItemsCount={cartOrderItemsCount}
            checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
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
            pickUpContactPerson={pickUpContactPerson}
            labels={labels}
            setCheckoutStage={setCheckoutStage}
            venmoBannerLabel={{ venmoBannerText }}
            setVenmoPickupState={setVenmoPickupState}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
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
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            setVenmoPickupState={setVenmoPickupState}
            setVenmoShippingState={setVenmoShippingState}
            isPayPalWebViewEnable={isPayPalWebViewEnable}
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
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            isExpressCheckout={isExpressCheckout}
            pickUpContactAlternate={pickUpContactAlternate}
            initialValues={{
              pickUpAlternateExpress: {
                hasAlternatePickup: isHasPickUpAlternatePerson,
                firstName: pickUpAlternatePerson.firstName,
                lastName: pickUpAlternatePerson.lastName,
                emailAddress: pickUpAlternatePerson.emailAddress,
              },
              expressReviewShippingSection: {
                shippingMethodId: reviewProps.defaultShipmentId,
              },
            }}
            shipmentMethods={shipmentMethods}
            setVenmoShippingState={setVenmoShippingState}
            setVenmoPickupState={setVenmoPickupState}
          />
        );
      case CONFIRMATION:
        return (
          <Confirmation
            navigation={navigation}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
          />
        );
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
  bagLoading: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  pickUpContactPerson: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  loadShipmentMethods: PropTypes.func.isRequired,
  formatPayload: PropTypes.func.isRequired,
  verifyAddressAction: PropTypes.func.isRequired,
  submitVerifiedShippingAddressData: PropTypes.func.isRequired,
  orderHasPickUp: PropTypes.bool.isRequired,
  submitShippingSection: PropTypes.func.isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
  pickupDidMount: PropTypes.func.isRequired,
  submitReview: PropTypes.func.isRequired,
  submitBilling: PropTypes.func.isRequired,
  availableStages: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  updateShippingAddressData: PropTypes.func.isRequired,
  addNewShippingAddressData: PropTypes.func.isRequired,
  currentStage: PropTypes.string.isRequired,
  checkoutServerError: PropTypes.shape({}).isRequired,
  checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
  toastMessage: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  setVenmoPickupState: PropTypes.func,
  setVenmoShippingState: PropTypes.func,
  isVenmoPickupBannerDisplayed: PropTypes.bool,
  isVenmoShippingBannerDisplayed: PropTypes.bool,
  cartOrderItemsCount: PropTypes.number.isRequired,
  isExpressCheckout: PropTypes.bool,
  pickUpContactAlternate: PropTypes.shape({}).isRequired,
  pickUpAlternatePerson: PropTypes.shape({}).isRequired,
  isHasPickUpAlternatePerson: PropTypes.shape({}).isRequired,
  isPayPalWebViewEnable: PropTypes.shape({}).isRequired,
};

CheckoutPage.defaultProps = {
  isVenmoPaymentInProgress: false,
  setVenmoPickupState: () => {},
  setVenmoShippingState: () => {},
  isVenmoPickupBannerDisplayed: true,
  isVenmoShippingBannerDisplayed: true,
  isExpressCheckout: false,
};

export default withKeyboardAvoidingView(CheckoutPage);
