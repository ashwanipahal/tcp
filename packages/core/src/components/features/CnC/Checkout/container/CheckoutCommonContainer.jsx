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
    const {
      isRegisteredUserCallDone: prevIsRegisteredUserCallDone,
      cartOrderItems: prevCartOrderItems,
    } = prevProps;
    const {
      isRegisteredUserCallDone,
      router,
      initCheckout,
      navigation,
      isRTPSFlow,
      cartOrderItems,
      setClickAnalyticsDataCheckout,
      trackPageViewCheckout,
    } = this.props;
    /* istanbul ignore else */
    if (
      prevIsRegisteredUserCallDone !== isRegisteredUserCallDone &&
      isRegisteredUserCallDone &&
      !isRTPSFlow
    ) {
      initCheckout(router, getPayPalFlag(navigation), navigation);
    }

    const events = this.getAnalyticsEvents();
    if (cartOrderItems !== prevCartOrderItems && events.length > 0) {
      const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
      setClickAnalyticsDataCheckout({
        customEvents: events,
        products: productsData,
      });
      trackPageViewCheckout({});
    }
  }

  componentWillUnmount() {
    const { clearIsBillingVisitedState } = this.props;
    clearIsBillingVisitedState();
  }

  getAnalyticsEvents = () => {
    const { currentStage } = this.props;
    const events = [];
    if (currentStage.toLowerCase() === constants.CHECKOUT_STAGES.PICKUP) {
      events.push('scCheckout', 'event86', 'event69');
    } else if (currentStage.toLowerCase() === constants.CHECKOUT_STAGES.SHIPPING) {
      events.push('scCheckout', 'event86', 'event9');
    } else if (currentStage.toLowerCase() === constants.CHECKOUT_STAGES.BILLING) {
      events.push('scCheckout', 'event86', 'event11');
    } else if (currentStage.toLowerCase() === constants.CHECKOUT_STAGES.REVIEW) {
      events.push('scCheckout', 'event86', 'event12');
    } else if (currentStage.toLowerCase() === constants.CHECKOUT_STAGES.CONFIRMATION) {
      events.push(
        'purchase',
        'event5',
        'event6',
        'event7',
        'event22',
        'event78',
        'event79',
        'event99'
      );
    }
    return events;
  };

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

  handleSubmitShippingSection = payload => {
    const { submitShipping } = this.props;
    submitShipping(payload);
  };

  handleSubmitBillingSection = payload => {
    const { submitBilling } = this.props;
    submitBilling(payload);
  };

  handleReviewSubmit = payload => {
    const { submitReview } = this.props;
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
      updateFromMSG,
      loadShipmentMethods,
      isGuest,
      isExpressCheckoutPage,
      cartOrderItems,
      orderHasShipping,
      routeToPickupPage,
      setCheckoutStage,
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
      isVenmoPickupBannerDisplayed,
      isVenmoShippingBannerDisplayed,
      isPayPalWebViewEnable,
      setClickAnalyticsDataCheckout,
      updateCheckoutPageData,
      dispatchReviewReduxForm,
      pageData,
      dispatch,
      titleLabel,
    } = this.props;
    const { pickUpContactPerson, pickUpContactAlternate, emailSignUpFlags } = this.props;
    const { isRegisteredUserCallDone, checkoutRoutingDone } = this.props;
    const { toggleCountrySelector, checkoutPageEmptyBagLabels, isBagLoaded } = this.props;
    const { toastMessage, clearCheckoutServerError, cartOrderItemsCount, bagLoading } = this.props;
    const availableStages = checkoutUtil.getAvailableStages(
      cartOrderItems,
      checkoutProgressBarLabels
    );
    return (
      <CheckoutPage
        pickupDidMount={this.pickupDidMount}
        emailSignUpFlags={emailSignUpFlags}
        isRegisteredUserCallDone={isRegisteredUserCallDone}
        isBagLoaded={isBagLoaded}
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
        billingProps={{
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
        updateFromMSG={updateFromMSG}
        verifyAddressAction={verifyAddressAction}
        shippingProps={{
          ...shippingProps,
          shippingDidMount: this.shippingDidMount,
          isRegisteredUserCallDone,
          dispatch,
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
        isVenmoPickupBannerDisplayed={isVenmoPickupBannerDisplayed}
        isVenmoShippingBannerDisplayed={isVenmoShippingBannerDisplayed}
        toastMessage={toastMessage}
        clearCheckoutServerError={clearCheckoutServerError}
        toggleCountrySelector={toggleCountrySelector}
        cartOrderItemsCount={cartOrderItemsCount}
        checkoutPageEmptyBagLabels={checkoutPageEmptyBagLabels}
        isPayPalWebViewEnable={isPayPalWebViewEnable}
        setClickAnalyticsDataCheckout={setClickAnalyticsDataCheckout}
        updateCheckoutPageData={updateCheckoutPageData}
        pageData={pageData}
        titleLabel={titleLabel}
      />
    );
  }
}

CheckoutContainer.getInitActions = () => initActions;

CheckoutContainer.pageInfo = {
  pageId: 'Checkout',
};

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
        pageSubSection: 'checkout',
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
