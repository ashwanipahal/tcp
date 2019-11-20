import React from 'react';
import { connect } from 'react-redux';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';
import { initActions } from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import checkoutUtil, { getPayPalFlag } from '../util/utility';
import constants from '../Checkout.constants';
import utils from '../../../../../utils';
import {
  intiSectionPage,
  formatPayload,
  mapDispatchToProps,
  mapStateToProps,
  callNeedHelpContent,
} from './CheckoutCommonContainer.util';

export class CheckoutContainer extends React.PureComponent<Props> {
  initialLoad = true;

  componentDidMount() {
    const { router, initCheckout, markBagPageRoutingDone } = this.props;
    markBagPageRoutingDone();
    const {
      isRegisteredUserCallDone,
      checkoutServerError,
      clearCheckoutServerError,
      navigation,
    } = this.props;
    /* istanbul ignore else */
    if (isRegisteredUserCallDone) {
      initCheckout(router, getPayPalFlag(navigation), navigation);
    }
    callNeedHelpContent(this.props);
    if (checkoutServerError) {
      clearCheckoutServerError({});
    }
  }

  componentDidUpdate(prevProps) {
    const { isRegisteredUserCallDone: prevIsRegisteredUserCallDone } = prevProps;
    const { isRegisteredUserCallDone, router, initCheckout, navigation, isRTPSFlow } = this.props;
    /* istanbul ignore else */
    if (
      prevIsRegisteredUserCallDone !== isRegisteredUserCallDone &&
      isRegisteredUserCallDone &&
      !isRTPSFlow
    ) {
      initCheckout(router, getPayPalFlag(navigation), navigation);
    }
  }

  componentWillUnmount() {
    const { clearIsBillingVisitedState } = this.props;
    clearIsBillingVisitedState();
  }

  shippingDidMount = () => {
    intiSectionPage(constants.CHECKOUT_STAGES.SHIPPING, this, {
      initialLoad: this.initialLoad,
    });
  };

  billingDidMount = () => {
    intiSectionPage(constants.CHECKOUT_STAGES.BILLING, this);
  };

  reviewDidMount = () => {
    intiSectionPage(constants.CHECKOUT_STAGES.REVIEW, this);
  };

  pickupDidMount = () => {
    intiSectionPage(constants.CHECKOUT_STAGES.PICKUP, this);
  };

  setAnalyticsData = (eventsInfo, name) => {
    const { setClickAnalyticsDataCheckout, cartOrderItems, trackClickAnalytics } = this.props;
    const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
    setClickAnalyticsDataCheckout({
      customEvents: eventsInfo,
      products: productsData,
    });
    trackClickAnalytics(name);
  };

  handleSubmitShippingSection = payload => {
    const { submitShipping } = this.props;
    const events = ['scCheckout', 'event86', 'event11'];
    this.setAnalyticsData(events, 'submit shipping');
    submitShipping(payload);
  };

  handleSubmitBillingSection = payload => {
    const { submitBilling } = this.props;
    const events = ['scCheckout', 'event86', 'event12'];
    this.setAnalyticsData(events, 'submit billing');
    submitBilling(payload);
  };

  handleReviewSubmit = payload => {
    const { submitReview } = this.props;
    const events = [
      'purchase',
      'event5',
      'event6',
      'event7',
      'event22',
      'event78',
      'event79',
      'event99',
    ];
    this.setAnalyticsData(events, 'submit review');
    submitReview(payload);
  };

  render() {
    const {
      initialValues,
      pickupInitialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      isMobile,
      activeStage,
      activeStep,
      isUsSite,
      shippingProps,
      navigation,
      orderHasPickUp,
      isOrderUpdateChecked,
      isGiftServicesChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      onPickupSubmit,
      loadShipmentMethods,
      isGuest,
      isExpressCheckoutPage,
      cartOrderItems,
      orderHasShipping,
      routeToPickupPage,
      setCheckoutStage,
      billingProps,
      router,
      updateShippingMethodSelection,
      updateShippingAddressData,
      addNewShippingAddressData,
      labels,
      checkoutProgressBarLabels,
      reviewProps,
      isVenmoPaymentInProgress,
      setVenmoPickupState,
      verifyAddressAction,
      setVenmoShippingState,
      getPayPalSettings,
      checkoutServerError,
      currentStage,
      submitVerifiedShippingAddressData,
      shippingMethod,
      pickUpAlternatePerson,
      isHasPickUpAlternatePerson,
      isPayPalWebViewEnable,
      setClickAnalyticsDataCheckout,
      updateCheckoutPageData,
      dispatchReviewReduxForm,
      pageData,
      bagLoading,
    } = this.props;
    const { pickUpContactPerson, pickUpContactAlternate } = this.props;
    const { isRegisteredUserCallDone, checkoutRoutingDone } = this.props;
    const { toggleCountrySelector, checkoutPageEmptyBagLabels, isBagLoaded } = this.props;
    const { toastMessage, clearCheckoutServerError, cartOrderItemsCount } = this.props;
    const availableStages = checkoutUtil.getAvailableStages(
      cartOrderItems,
      checkoutProgressBarLabels
    );
    return (
      <CheckoutPage
        pickupDidMount={this.pickupDidMount}
        isRegisteredUserCallDone={isRegisteredUserCallDone}
        isBagLoaded={isBagLoaded}
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
        billingProps={{
          ...billingProps,
          billingDidMount: this.billingDidMount,
          isRegisteredUserCallDone,
        }}
        dispatchReviewReduxForm={dispatchReviewReduxForm}
        isMobile={isMobile}
        isExpressCheckout={isExpressCheckoutPage}
        activeStage={activeStage}
        activeStep={activeStep}
        isUsSite={isUsSite}
        orderHasShipping={orderHasShipping}
        pickupInitialValues={pickupInitialValues}
        bagLoading={bagLoading}
        isOrderUpdateChecked={isOrderUpdateChecked}
        isGiftServicesChecked={isGiftServicesChecked}
        isAlternateUpdateChecked={isAlternateUpdateChecked}
        submitVerifiedShippingAddressData={submitVerifiedShippingAddressData}
        pickUpLabels={pickUpLabels}
        smsSignUpLabels={smsSignUpLabels}
        navigation={navigation}
        onPickupSubmit={onPickupSubmit}
        verifyAddressAction={verifyAddressAction}
        shippingProps={{
          ...shippingProps,
          shippingDidMount: this.shippingDidMount,
          isRegisteredUserCallDone,
        }}
        orderHasPickUp={orderHasPickUp}
        checkoutRoutingDone={checkoutRoutingDone}
        submitShippingSection={this.handleSubmitShippingSection}
        loadShipmentMethods={loadShipmentMethods}
        cartOrderItems={cartOrderItems}
        routeToPickupPage={routeToPickupPage}
        setCheckoutStage={setCheckoutStage}
        availableStages={availableStages}
        router={router}
        updateShippingMethodSelection={updateShippingMethodSelection}
        updateShippingAddressData={updateShippingAddressData}
        addNewShippingAddressData={addNewShippingAddressData}
        labels={labels}
        submitBilling={this.handleSubmitBillingSection}
        submitReview={this.handleReviewSubmit}
        reviewProps={{
          ...reviewProps,
          reviewDidMount: this.reviewDidMount,
          isRegisteredUserCallDone,
        }}
        formatPayload={formatPayload}
        isVenmoPaymentInProgress={isVenmoPaymentInProgress}
        setVenmoPickupState={setVenmoPickupState}
        setVenmoShippingState={setVenmoShippingState}
        getPayPalSettings={getPayPalSettings}
        checkoutServerError={checkoutServerError}
        currentStage={currentStage}
        shippingMethod={shippingMethod}
        pickUpAlternatePerson={pickUpAlternatePerson}
        isHasPickUpAlternatePerson={isHasPickUpAlternatePerson}
        pickUpContactPerson={pickUpContactPerson}
        pickUpContactAlternate={pickUpContactAlternate}
        toastMessage={toastMessage}
        clearCheckoutServerError={clearCheckoutServerError}
        toggleCountrySelector={toggleCountrySelector}
        cartOrderItemsCount={cartOrderItemsCount}
        checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
        setClickAnalyticsDataCheckout={setClickAnalyticsDataCheckout}
        updateCheckoutPageData={updateCheckoutPageData}
        pageData={pageData}
      />
    );
  }
}

CheckoutContainer.getInitActions = () => initActions;

CheckoutContainer.getInitialProps = (reduxProps, pageProps) => {
  const DEFAULT_ACTIVE_COMPONENT = 'shipping';
  const loadedComponent = utils.getObjectValue(
    reduxProps,
    DEFAULT_ACTIVE_COMPONENT,
    'query',
    'section'
  );
  return {
    ...pageProps,
    ...{
      pageData: {
        pageName: `checkout:${loadedComponent}`,
        pageSection: 'checkout',
        pageType: 'checkout',
        pageShortName: `checkout:${loadedComponent}`,
        loadAnalyticsOnload: false,
      },
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
