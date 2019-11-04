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
import checkoutSelectors from '../container/Checkout.selector';
import Confirmation from '../../Confirmation';
import { routerPush, scrollToParticularElement } from '../../../../../utils';
import ErrorMessage from '../../common/molecules/ErrorMessage';
import { Anchor, Button } from '../../../../common/atoms';
// import CheckoutProgressUtils from '../../../../../../../web/src/components/features/content/CheckoutProgressIndicator/utils/utils';

class CheckoutPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.pageServerError = null;
    this.pageServerErrorRef = this.pageServerErrorRef.bind(this);
  }

  componentDidMount() {
    const { router } = this.props;
    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    if (currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION) {
      routerPush('/', '/');
    }
  }

  componentDidUpdate(prevProps) {
    const { checkoutServerError } = this.props;
    if (
      checkoutServerError &&
      this.pageServerError !== null &&
      checkoutServerError !== prevProps.checkoutServerError
    ) {
      scrollToParticularElement(this.pageServerError);
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
    const currentSection = this.getCurrentSection();
    let venmoPickupDisplayed = false;
    if (currentSection && currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP) {
      venmoPickupDisplayed = checkoutSelectors.isVenmoPickupBannerDisplayed();
    }
    return venmoPickupDisplayed;
  };

  /**
   * This method will set venmo banner state once it is visible, so that it won't be visible
   * once user comes back
   */
  isVenmoShippingDisplayed = () => {
    const currentSection = this.getCurrentSection();
    let venmoShippingDisplayed = false;
    if (currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING) {
      venmoShippingDisplayed = checkoutSelectors.isVenmoShippingBannerDisplayed();
    }
    return venmoShippingDisplayed;
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

  renderPageErrors = () => {
    const { checkoutServerError } = this.props;
    return (
      <div className="checkout-page-error-container elem-mt-MED" ref={this.pageServerErrorRef}>
        {checkoutServerError && (
          <ErrorMessage error={checkoutServerError.errorMessage} className="checkout-page-error" />
        )}
      </div>
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
      verifyAddressAction,
      formatPayload,
      submitVerifiedShippingAddressData,
      isExpressCheckout,
      initShippingPage,
      shippingMethod,
      pickupDidMount,
      isHasPickUpAlternatePerson,
      pickUpAlternatePerson,
      pickUpContactPerson,
      pickUpContactAlternate,
      checkoutServerError,
      clearCheckoutServerError,
      toggleCountrySelector,
    } = this.props;

    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    const isFormLoad = this.getFormLoad(pickupInitialValues, isGuest);
    const { shipmentMethods } = shippingProps;

    return (
      <div>
        {this.isShowVenmoBanner(currentSection) && <VenmoBanner labels={pickUpLabels} />}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && isFormLoad && (
          <PickUpFormPart
            pickupDidMount={pickupDidMount}
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
            ServerErrors={this.renderPageErrors}
            checkoutServerError={checkoutServerError}
            pageCategory={currentSection.toLowerCase()}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && (
          <ShippingPage
            {...shippingProps}
            toggleCountrySelector={toggleCountrySelector}
            initShippingPage={initShippingPage}
            isGuest={isGuest}
            isUsSite={isUsSite}
            formatPayload={formatPayload}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={submitShippingSection}
            loadShipmentMethods={loadShipmentMethods}
            routeToPickupPage={routeToPickupPage}
            isMobile={isMobile}
            updateShippingMethodSelection={updateShippingMethodSelection}
            updateShippingAddressData={updateShippingAddressData}
            addNewShippingAddressData={addNewShippingAddressData}
            labels={labels}
            verifyAddressAction={verifyAddressAction}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            setVenmoPickupState={setVenmoPickupState}
            submitVerifiedShippingAddressData={submitVerifiedShippingAddressData}
            /* To handle use cases for venmo banner and next CTA on shipping page. If true, then normal checkout flow otherwise venmo scenarios  */
            isVenmoShippingDisplayed={this.isVenmoShippingDisplayed()}
            ServerErrors={this.renderPageErrors}
            checkoutServerError={checkoutServerError}
            clearCheckoutServerError={clearCheckoutServerError}
            pageCategory={currentSection.toLowerCase()}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.BILLING && (
          <BillingPage
            {...billingProps}
            orderHasShipping={orderHasShipping}
            isGuest={isGuest}
            submitBilling={submitBilling}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            ServerErrors={this.renderPageErrors}
            checkoutServerError={checkoutServerError}
            clearCheckoutServerError={clearCheckoutServerError}
            pageCategory={currentSection.toLowerCase()}
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
            isExpressCheckout={isExpressCheckout}
            shipmentMethods={shipmentMethods}
            pickUpContactPerson={pickUpContactPerson}
            pickUpContactAlternate={pickUpContactAlternate}
            ServerErrors={this.renderPageErrors}
            checkoutServerError={checkoutServerError}
            initialValues={{
              expressReviewShippingSection: {
                shippingMethodId: shippingMethod,
              },
              pickUpAlternateExpress: {
                hasAlternatePickup: isHasPickUpAlternatePerson,
                firstName: pickUpAlternatePerson.firstName,
                lastName: pickUpAlternatePerson.lastName,
                emailAddress: pickUpAlternatePerson.emailAddress,
              },
            }}
            clearCheckoutServerError={clearCheckoutServerError}
            pageCategory={currentSection.toLowerCase()}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION && (
          <Confirmation
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            pageCategory={currentSection.toLowerCase()}
          />
        )}
      </div>
    );
  };

  handleDefaultLinkClick = e => {
    e.preventDefault();
  };

  pageServerErrorRef(ref) {
    this.pageServerError = ref;
  }

  render() {
    const { isGuest, router, submitReview, reviewProps, checkoutServerError } = this.props;
    const { ariaLabelSubmitOrderButton, applyConditionPreText } = reviewProps.labels;
    const { applyConditionTermsText, nextSubmitText } = reviewProps.labels;
    const { applyConditionPolicyText, applyConditionAndText } = reviewProps.labels;
    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    return (
      <CnCTemplate
        leftSection={this.renderLeftSection}
        marginTop={currentSection.toLowerCase() !== CHECKOUT_STAGES.CONFIRMATION}
        isGuest={isGuest}
        isCheckoutView
        orderLedgerAfterView={
          currentSection.toLowerCase() === CHECKOUT_STAGES.REVIEW && (
            <div className="review-submit-container">
              <Button
                aria-label={ariaLabelSubmitOrderButton}
                type="button"
                className="review-submit-button"
                fontSize="fs13"
                fontWeight="extrabold"
                buttonVariation="variable-width"
                fill="BLUE"
                onClick={submitReview}
              >
                {nextSubmitText}
              </Button>
              <div className="submit-disclaimer">
                {applyConditionPreText}
                <Anchor
                  className="submit-disclaimer-link"
                  underline
                  to="/#"
                  dataLocator="termAndConditionText"
                  onClick={this.handleDefaultLinkClick}
                >
                  {applyConditionTermsText}
                </Anchor>
                {applyConditionAndText}
                <Anchor
                  className="submit-disclaimer-link"
                  underline
                  to="/#"
                  dataLocator="PrivacyText"
                  onClick={this.handleDefaultLinkClick}
                >
                  {applyConditionPolicyText}
                </Anchor>
              </div>
            </div>
          )
        }
        isConfirmationPage={currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION}
        pageCategory={currentSection.toLowerCase()}
        checkoutServerError={checkoutServerError}
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
  verifyAddressAction: PropTypes.func.isRequired,
  toggleCountrySelector: PropTypes.func.isRequired,
  submitVerifiedShippingAddressData: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  orderHasShipping: PropTypes.bool.isRequired,
  routeToPickupPage: PropTypes.func.isRequired,
  pickupDidMount: PropTypes.func.isRequired,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  updateShippingAddressData: PropTypes.func.isRequired,
  addNewShippingAddressData: PropTypes.func.isRequired,
  submitBilling: PropTypes.func.isRequired,
  initShippingPage: PropTypes.func.isRequired,
  formatPayload: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  setVenmoPickupState: PropTypes.func,
  setVenmoShippingState: PropTypes.func,
  checkoutServerError: PropTypes.shape({}).isRequired,
  isExpressCheckout: PropTypes.bool,
  shippingMethod: PropTypes.shape({}),
  pickUpAlternatePerson: PropTypes.shape({}).isRequired,
  isHasPickUpAlternatePerson: PropTypes.shape({}).isRequired,
  pickUpContactPerson: PropTypes.shape({}).isRequired,
  pickUpContactAlternate: PropTypes.shape({}).isRequired,
  clearCheckoutServerError: PropTypes.func.isRequired,
};

CheckoutPage.defaultProps = {
  isVenmoPaymentInProgress: false,
  setVenmoPickupState: () => {},
  setVenmoShippingState: () => {},
  isExpressCheckout: false,
  shippingMethod: {},
};

export default CheckoutPage;
export { CheckoutPage as CheckoutPageVanilla };
