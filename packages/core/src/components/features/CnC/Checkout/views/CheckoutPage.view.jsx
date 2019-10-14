/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
import VenmoBanner from '../../../../common/molecules/VenmoBanner';
import Confirmation from '../../Confirmation';
import { routerPush } from '../../../../../utils';
// import CheckoutProgressUtils from '../../../../../../../web/src/components/features/content/CheckoutProgressIndicator/utils/utils';

class CheckoutPage extends React.PureComponent {
  componentDidMount() {
    const { router } = this.props;
    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    if (currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION) {
      routerPush('/', '/');
    }
  }
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

  /**
   * This method returns the current checkout section
   */
  getCurrentSection = () => {
    const { router } = this.props;
    const section = router.query.section || router.query.subSection;
    return section || CHECKOUT_STAGES.SHIPPING;
  };

  /**
   * This method will set venmo banner state once it is visible, so that it won't be visible
   * once user comes back
   */
  isVenmoPickupDisplayed = () => {
    const { isVenmoPickupBannerDisplayed } = this.props;
    const currentSection = this.getCurrentSection();
    return currentSection && currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP
      ? isVenmoPickupBannerDisplayed
      : false;
  };

  /**
   * This method will set venmo banner state once it is visible, so that it won't be visible
   * once user comes back
   */
  isVenmoShippingDisplayed = () => {
    const { isVenmoShippingBannerDisplayed } = this.props;
    const currentSection = this.getCurrentSection();
    return currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING
      ? isVenmoShippingBannerDisplayed
      : false;
  };

  /**
   * This function is to validate if we need to show venmo banner or not.
   * Only if user comes on pickup or shipping page, but not on coming back from navigation
   * @params {string} currentSection - current checkout section name
   */
  isShowVenmoBanner = currentSection => {
    const { isUsSite, isVenmoPaymentInProgress } = this.props;
    return (
      isUsSite &&
      isVenmoPaymentInProgress &&
      ((currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP &&
        !this.isVenmoPickupDisplayed()) ||
        (currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING &&
          !this.isVenmoShippingDisplayed()))
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
      isVenmoPaymentInProgress,
      setVenmoPickupState,
      setVenmoShippingState,
    } = this.props;

    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    const isFormLoad = this.getFormLoad(pickupInitialValues, isGuest);
    return (
      <div>
        {this.isShowVenmoBanner(currentSection) && <VenmoBanner labels={pickUpLabels} />}
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
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            /* To handle use cases for venmo banner and next CTA on pickup page. If true then normal checkout flow otherwise venmo scenarios  */
            isVenmoPickupDisplayed={this.isVenmoPickupDisplayed()}
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
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            setVenmoPickupState={setVenmoPickupState}
            /* To handle use cases for venmo banner and next CTA on shipping page. If true, then normal checkout flow otherwise venmo scenarios  */
            isVenmoShippingDisplayed={this.isVenmoShippingDisplayed()}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.BILLING && (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            isGuest={isGuest}
            submitBilling={submitBilling}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.REVIEW && (
          <ReviewPage
            {...reviewProps}
            submitReview={submitReview}
            navigation={navigation}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
            setVenmoShippingState={setVenmoShippingState}
            setVenmoPickupState={setVenmoPickupState}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            isGuest={isGuest}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION && (
          <Confirmation isVenmoPaymentInProgress={isVenmoPaymentInProgress} />
        )}
      </div>
    );
  };

  render() {
    const { isGuest, router } = this.props;
    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    return (
      <CnCTemplate
        leftSection={this.renderLeftSection}
        marginTop={currentSection.toLowerCase() !== CHECKOUT_STAGES.CONFIRMATION}
        isGuest={isGuest}
        isCheckoutView
        isConfirmationPage={currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION}
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

export default CheckoutPage;
export { CheckoutPage as CheckoutPageVanilla };
