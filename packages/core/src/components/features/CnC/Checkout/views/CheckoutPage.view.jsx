/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import {
  setLoaderState,
  setSectionLoaderState,
} from '@tcp/core/src/components/common/molecules/Loader/container/Loader.actions';
import { isClient } from '@tcp/core/src/utils';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import BillingPage from '../organisms/BillingPage';
import ReviewPage from '../organisms/ReviewPage';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
import VenmoBanner from '../../../../common/molecules/VenmoBanner';
import Confirmation from '../../Confirmation';
import { routerPush, scrollToParticularElement } from '../../../../../utils';
import ErrorMessage from '../../common/molecules/ErrorMessage';
import { Anchor, Button } from '../../../../common/atoms';
import CheckoutPageEmptyBag from '../molecules/CheckoutPageEmptyBag';
import checkoutUtil from '../util/utility';
import {
  getCurrentSection,
  updateAnalyticsData,
  getFormLoad,
  propsTypes,
} from './CheckoutPage.view.util';

class CheckoutPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.pageServerError = null;
    this.pageServerErrorRef = this.pageServerErrorRef.bind(this);
    this.reviewFormRef = React.createRef();
    if (isClient()) {
      const { setCheckoutStage } = props;
      const currentSection = this.getCurrentCheckoutSection(props);
      setCheckoutStage(currentSection);
      if (currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION) {
        routerPush('/', '/');
      }
    }
  }

  componentDidMount() {
    setSectionLoaderState({ addedToBagLoaderState: false, section: 'addedtobag' });
    setSectionLoaderState({ miniBagLoaderState: false, section: 'minibag' });
    setLoaderState(false);
  }

  componentDidUpdate(prevProps) {
    const { checkoutServerError, setCheckoutStage, activeStage } = this.props;
    const currentSection = this.getCurrentCheckoutSection(this.props);
    if (currentSection !== activeStage) {
      setCheckoutStage(currentSection);
    }
    if (
      checkoutServerError &&
      this.pageServerError !== null &&
      checkoutServerError !== prevProps.checkoutServerError
    ) {
      scrollToParticularElement(this.pageServerError);
    }
    updateAnalyticsData(this.props, prevProps);
  }

  getCurrentCheckoutSection = props => {
    const { router } = props;
    const section = router.query.section || router.query.subSection;
    return section || CHECKOUT_STAGES.SHIPPING;
  };

  getIsRenderConfirmation = () => {
    const { router } = this.props;
    return router.query.fromReview || false;
  };

  /**
   * This method will set venmo banner state once it is visible, so that it won't be visible
   * once user comes back
   */
  isVenmoPickupDisplayed = () => {
    const { isVenmoPickupBannerDisplayed } = this.props;
    const currentSection = getCurrentSection(this.props);
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
    const currentSection = getCurrentSection(this.props);
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
      cartLoading,
      emailSignUpFlags,
    } = this.props;
    const { isHasPickUpAlternatePerson, pickUpAlternatePerson, pickUpContactPerson } = this.props;
    const { pickUpContactAlternate, checkoutServerError, toggleCountrySelector } = this.props;
    const { clearCheckoutServerError, setClickAnalyticsDataCheckout, cartOrderItems } = this.props;
    const { cartOrderItemsCount, checkoutPageEmptyBagLabels } = this.props;
    const { isBagLoaded, isRegisteredUserCallDone, checkoutRoutingDone } = this.props;
    const currentSection = this.getCurrentCheckoutSection(this.props);
    const isFormLoad = getFormLoad(pickupInitialValues, isGuest);
    const { shipmentMethods } = shippingProps;
    const isRendorConfirmation = this.getIsRenderConfirmation();
    return (
      <div>
        {this.isShowVenmoBanner(currentSection) && <VenmoBanner labels={pickUpLabels} />}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && isFormLoad && (
          <PickUpFormPart
            emailSignUpFlags={emailSignUpFlags}
            checkoutRoutingDone={checkoutRoutingDone}
            pickupDidMount={pickupDidMount}
            isRegisteredUserCallDone={isRegisteredUserCallDone}
            isBagLoaded={isBagLoaded}
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
            cartOrderItemsCount={cartOrderItemsCount}
            checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
            setClickAnalyticsDataCheckout={setClickAnalyticsDataCheckout}
            cartOrderItems={cartOrderItems}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && (
          <ShippingPage
            emailSignUpFlags={emailSignUpFlags}
            checkoutRoutingDone={checkoutRoutingDone}
            isBagLoaded={isBagLoaded}
            cartOrderItemsCount={cartOrderItemsCount}
            checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
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
            pickUpContactPerson={pickUpContactPerson}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.BILLING && (
          <BillingPage
            {...billingProps}
            checkoutRoutingDone={checkoutRoutingDone}
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
            checkoutRoutingDone={checkoutRoutingDone}
            navigation={navigation}
            orderHasPickUp={orderHasPickUp}
            orderHasShipping={orderHasShipping}
            setVenmoShippingState={setVenmoShippingState}
            setVenmoPickupState={setVenmoPickupState}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            isGuest={isGuest}
            isExpressCheckout={isExpressCheckout}
            onSubmit={this.reviewFormSubmit}
            shipmentMethods={shipmentMethods}
            reviewFormSubmit={this.reviewFormSubmit}
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
              cardType: reviewProps.cardType,
            }}
            clearCheckoutServerError={clearCheckoutServerError}
            pageCategory={currentSection.toLowerCase()}
            cartLoading={cartLoading}
          />
        )}
        {currentSection.toLowerCase() === CHECKOUT_STAGES.CONFIRMATION && isRendorConfirmation && (
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

  reviewFormSubmit = data => checkoutUtil.handleReviewFormSubmit(this, data);

  pageServerErrorRef(ref) {
    this.pageServerError = ref;
  }

  render() {
    const {
      isGuest,
      dispatchReviewReduxForm,
      reviewProps,
      checkoutServerError,
      isBagLoaded,
    } = this.props;
    const { cartOrderItemsCount, checkoutPageEmptyBagLabels } = this.props;
    const { ariaLabelSubmitOrderButton, applyConditionPreText } = reviewProps.labels;
    const { applyConditionTermsText, nextSubmitText } = reviewProps.labels;
    const { applyConditionPolicyText, applyConditionAndText } = reviewProps.labels;
    const currentSection = this.getCurrentCheckoutSection(this.props);
    const isRendorConfirmation = this.getIsRenderConfirmation();
    return (
      <>
        {(!isBagLoaded || cartOrderItemsCount > 0) && isRendorConfirmation ? (
          <CnCTemplate
            showLeftSection
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
                    onClick={dispatchReviewReduxForm}
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
        ) : (
          <CheckoutPageEmptyBag labels={checkoutPageEmptyBagLabels} />
        )}
      </>
    );
  }
}

CheckoutPage.propTypes = propsTypes;

CheckoutPage.defaultProps = {
  isVenmoPaymentInProgress: false,
  setVenmoPickupState: () => {},
  setVenmoShippingState: () => {},
  isExpressCheckout: false,
  shippingMethod: {},
  isVenmoPickupBannerDisplayed: true,
  isVenmoShippingBannerDisplayed: true,
  pageData: {},
};

export default CheckoutPage;
export { CheckoutPage as CheckoutPageVanilla };
