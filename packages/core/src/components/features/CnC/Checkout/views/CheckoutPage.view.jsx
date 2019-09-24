/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
// import CheckoutProgressUtils from '../../../../../../../web/src/components/features/content/CheckoutProgressIndicator/utils/utils';

class CheckoutPage extends React.PureComponent {
  // componentDidUpdate() {
  // const { router, cartOrderItems } = this.props;
  // const currentStage = router.query.section;
  // const availableStages = CheckoutProgressUtils.getAvailableStages(cartOrderItems);
  // let requestedStage = '';
  // if (availableStages.length > 3) {
  //   requestedStage = CHECKOUT_STAGES.PICKUP;
  // } else {
  //   requestedStage = CHECKOUT_STAGES.SHIPPING;
  // }
  // CheckoutProgressUtils.routeToStage(requestedStage, cartOrderItems, false, currentStage);
  // }

  getFormLoad = (pickupInitialValues, isGuest) => {
    return !!(
      isGuest ||
      (pickupInitialValues &&
        pickupInitialValues.pickUpContact &&
        pickupInitialValues.pickUpContact.firstName)
    );
  };

  renderLeftSection = () => {
    const {
      router,
      isGuest,
      isMobile,
      isUsSite,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      shippingProps,
      navigation,
      orderHasPickUp,
      submitShippingSection,
      isOrderUpdateChecked,
      isGiftServicesChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
      loadShipmentMethods,
      onPickupSubmit,
      orderHasShipping,
      routeToPickupPage,
      updateShippingMethodSelection,
      updateShippingAddressData,
      addNewShippingAddressData,
      billingProps,
      labels,
      submitBilling,
      reviewProps,
      submitReview,
    } = this.props;

    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    const isFormLoad = this.getFormLoad(pickupInitialValues, isGuest);
    return (
      <div>
        {currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && isFormLoad && (
          <PickUpFormPart
            isGuest={isGuest}
            isMobile={isMobile}
            isUsSite={isUsSite}
            initialValues={pickupInitialValues}
            pickupInitialValues={pickupInitialValues}
            onEditModeChange={onEditModeChange}
            isSmsUpdatesEnabled={isSmsUpdatesEnabled}
            currentPhoneNumber={currentPhoneNumber}
            isOrderUpdateChecked={isOrderUpdateChecked}
            isGiftServicesChecked={isGiftServicesChecked}
            isAlternateUpdateChecked={isAlternateUpdateChecked}
            pickUpLabels={pickUpLabels}
            smsSignUpLabels={smsSignUpLabels}
            orderHasShipping={orderHasShipping}
            onPickupSubmit={onPickupSubmit}
            navigation={navigation}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && (
          <ShippingPage
            {...shippingProps}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={submitShippingSection}
            loadShipmentMethods={loadShipmentMethods}
            routeToPickupPage={routeToPickupPage}
            isMobile={isMobile}
            updateShippingMethodSelection={updateShippingMethodSelection}
            updateShippingAddressData={updateShippingAddressData}
            addNewShippingAddressData={addNewShippingAddressData}
            labels={labels}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.BILLING && (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            isGuest={isGuest}
            submitBilling={submitBilling}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.REVIEW && (
          <ReviewPage
            {...reviewProps}
            submitReview={submitReview}
            navigation={navigation}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
          />
        )}
      </div>
    );
  };

  render() {
    const { isGuest } = this.props;
    return (
      <CnCTemplate
        leftSection={this.renderLeftSection}
        marginTop
        isGuest={isGuest}
        isCheckoutView
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
  billingProps: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isGiftServicesChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  reviewProps: PropTypes.shape({}).isRequired,
  submitReview: PropTypes.func.isRequired,
  orderHasPickUp: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  submitShippingSection: PropTypes.func.isRequired,
  loadShipmentMethods: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  orderHasShipping: PropTypes.bool.isRequired,
  routeToPickupPage: PropTypes.func.isRequired,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  updateShippingAddressData: PropTypes.func.isRequired,
  addNewShippingAddressData: PropTypes.func.isRequired,
  submitBilling: PropTypes.func.isRequired,
};

export default CheckoutPage;
export { CheckoutPage as CheckoutPageVanilla };
