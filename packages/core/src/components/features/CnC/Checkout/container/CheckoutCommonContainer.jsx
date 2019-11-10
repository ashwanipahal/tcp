import React from 'react';
import { connect } from 'react-redux';
import CHECKOUT_ACTIONS, {
  initCheckoutAction,
  submitShippingSection,
  submitPickupSection,
  onEditModeChangeAction,
  fetchShipmentMethods,
  routeToPickupPage as routeToPickupPageActn,
  getSetCheckoutStage,
  updateShipmentMethodSelection,
  updateShippingAddress,
  addNewShippingAddress,
  submitBillingSection,
  initActions,
  submitReviewSection,
  setVenmoPickupMessageState,
  setVenmoShippingMessageState,
  submitVerifiedAddressData,
  initCheckoutSectionPageAction,
  toggleCountrySelectorModal,
} from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors, {
  isGuest as isGuestUser,
  isExpressCheckout,
  getAlternateFormUpdate,
  getSendOrderUpdate,
  getCheckoutStage,
  getGiftServicesSend,
  isUsSite as isUsSiteUser,
  getPickupAltValues,
  isPickupAlt,
  getPickupValues,
} from './Checkout.selector';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import checkoutUtil from '../util/utility';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  getUserPhoneNumber,
  getIsRegisteredUserCallDone,
  isPlccUser,
  getplccCardNumber,
} from '../../../account/User/container/User.selectors';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';
import constants from '../Checkout.constants';
import { getCVVCodeInfoContentId } from '../organisms/BillingPage/container/BillingPage.selectors';

const {
  getSmsSignUpLabels,
  getSelectedShipmentId,
  getAddressFields,
  getShippingPhoneNo,
  getIsOrderHasPickup,
  getIsOrderHasShipping,
  getBillingLabels,
  getEmailSignUpLabels,
  getShipmentMethods,
  getDefaultShipmentID,
  getShippingSendOrderUpdate,
  getSaveToAddressBook,
  getOnFileAddressKey,
  getShippingAddressID,
  getDefaultShipping,
  getAddEditResponseAddressId,
  getShippingAddress,
  getCheckoutProgressBarLabels,
  getSyncError,
  getGiftWrappingValues,
  getReviewLabels,
  getBillingValues,
  getShippingPhoneAndEmail,
  getCreditFieldLabels,
  getShipmentLoadingStatus,
  getCurrentCheckoutStage,
  getShippingAddressList,
  getIsPaymentDisabled,
  getCheckoutPageEmptyBagLabels,
  getIsRTPSEnabled
} = selectors;

export class CheckoutContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const {
      needHelpContentId,
      fetchNeedHelpContent,
      getGiftServicesContentTcpId,
      getGiftServicesContentGymId,
      isRegisteredUserCallDone,
      initCheckout,
      router,
      cvvCodeInfoContentId,
      checkoutServerError,
      clearCheckoutServerError,
    } = this.props;
    /* istanbul ignore else */
    if (isRegisteredUserCallDone) {
      initCheckout(router);
    }
    fetchNeedHelpContent([
      needHelpContentId,
      getGiftServicesContentTcpId,
      getGiftServicesContentGymId,
      cvvCodeInfoContentId,
    ]);
    if (checkoutServerError) {
      clearCheckoutServerError({});
    }
  }

  componentDidUpdate(prevProps) {
    const { isRegisteredUserCallDone: prevIsRegisteredUserCallDone } = prevProps;
    const { isRegisteredUserCallDone, router, initCheckout } = this.props;
    /* istanbul ignore else */
    if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && isRegisteredUserCallDone) {
      initCheckout(router);
    }
  }

  formatPayload = payload => {
    const { addressLine1, addressLine2, zipCode, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine1,
        address2: addressLine2,
        zip: zipCode,
      },
    };
  };

  intiSectionPage = (pageName, extraProps = {}) => {
    const { initCheckoutSectionPage, router } = this.props;
    let recalc;
    let isPaypalPostBack;
    if (router && router.query) {
      ({ recalc, isPaypalPostBack } = router.query);
    }
    initCheckoutSectionPage({ pageName, recalc, isPaypalPostBack, ...extraProps });
  };

  shippingDidMount = () => {
    this.intiSectionPage(constants.CHECKOUT_STAGES.SHIPPING, { initialLoad: true });
  };

  billingDidMount = () => {
    this.intiSectionPage(constants.CHECKOUT_STAGES.BILLING);
  };

  reviewDidMount = () => {
    this.intiSectionPage(constants.CHECKOUT_STAGES.REVIEW);
  };

  pickupDidMount = () => {
    this.intiSectionPage(constants.CHECKOUT_STAGES.PICKUP);
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
      submitShipping,
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
      submitBilling,
      checkoutProgressBarLabels,
      submitReview,
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
      pickUpContactPerson,
      pickUpContactAlternate,
      toastMessage,
      clearCheckoutServerError,
      cartOrderItemsCount,
      toggleCountrySelector,
      checkoutPageEmptyBagLabels,
      isBagLoaded,
      updateRTPS
    } = this.props;
    const availableStages = checkoutUtil.getAvailableStages(
      cartOrderItems,
      checkoutProgressBarLabels
    );

    return (
      <CheckoutPage
        pickupDidMount={this.pickupDidMount}
        isBagLoaded={isBagLoaded}
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
        billingProps={{ ...billingProps, billingDidMount: this.billingDidMount }}
        isMobile={isMobile}
        isExpressCheckout={isExpressCheckoutPage}
        activeStage={activeStage}
        activeStep={activeStep}
        isUsSite={isUsSite}
        orderHasShipping={orderHasShipping}
        pickupInitialValues={pickupInitialValues}
        isOrderUpdateChecked={isOrderUpdateChecked}
        isGiftServicesChecked={isGiftServicesChecked}
        isAlternateUpdateChecked={isAlternateUpdateChecked}
        submitVerifiedShippingAddressData={submitVerifiedShippingAddressData}
        pickUpLabels={pickUpLabels}
        smsSignUpLabels={smsSignUpLabels}
        navigation={navigation}
        onPickupSubmit={onPickupSubmit}
        verifyAddressAction={verifyAddressAction}
        shippingProps={{ ...shippingProps, shippingDidMount: this.shippingDidMount }}
        orderHasPickUp={orderHasPickUp}
        submitShippingSection={submitShipping}
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
        submitBilling={submitBilling}
        submitReview={submitReview}
        reviewProps={{ ...reviewProps, reviewDidMount: this.reviewDidMount }}
        formatPayload={this.formatPayload}
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
        updateRTPS={updateRTPS}
      />
    );
  }
}

CheckoutContainer.getInitActions = () => initActions;

export const mapDispatchToProps = dispatch => {
  return {
    initCheckout: router => {
      dispatch(initCheckoutAction(router));
    },
    initCheckoutSectionPage: payload => {
      dispatch(initCheckoutSectionPageAction(payload));
    },
    submitShipping: payload => {
      dispatch(submitShippingSection(payload));
    },
    onPickupSubmit: data => {
      dispatch(submitPickupSection(data));
    },
    onEditModeChange: data => {
      dispatch(onEditModeChangeAction(data));
    },
    loadShipmentMethods: formName => {
      dispatch(fetchShipmentMethods(formName));
    },
    routeToPickupPage: () => {
      dispatch(routeToPickupPageActn());
    },
    setCheckoutStage: payload => {
      dispatch(getSetCheckoutStage(payload));
    },
    updateShippingMethodSelection: payload => {
      dispatch(updateShipmentMethodSelection(payload));
    },
    updateShippingAddressData: payload => {
      dispatch(updateShippingAddress(payload));
    },
    addNewShippingAddressData: payload => {
      dispatch(addNewShippingAddress(payload));
    },
    submitBilling: payload => {
      dispatch(submitBillingSection(payload));
    },
    fetchNeedHelpContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
    submitReview: payload => {
      dispatch(submitReviewSection(payload));
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
    submitVerifiedShippingAddressData: payload => {
      dispatch(submitVerifiedAddressData(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
    setVenmoPickupState: data => dispatch(setVenmoPickupMessageState(data)),
    setVenmoShippingState: data => dispatch(setVenmoShippingMessageState(data)),
    clearCheckoutServerError: data => dispatch(CHECKOUT_ACTIONS.setServerErrorCheckout(data)),
    toggleCountrySelector: payload => {
      dispatch(toggleCountrySelectorModal(payload));
    },
    updateRTPS: payload => dispatch(CHECKOUT_ACTIONS.updateRTPSData(payload))
  };
};

const mapStateToProps = state => {
  return {
    initialValues: selectors.getPickupInitialPickupSectionValues(state),
    pickupInitialValues: selectors.getPickupInitialPickupSectionValues(state),
    isSmsUpdatesEnabled: selectors.isSmsUpdatesEnabled(),
    currentPhoneNumber: selectors.getCurrentPickupFormNumber(state),
    isGuest: isGuestUser(state),
    isMobile: selectors.getIsMobile(),
    isExpressCheckoutPage: isExpressCheckout(state),
    activeStage: getCheckoutStage(state),
    shippingMethod: getDefaultShipmentID(state),
    checkoutPageEmptyBagLabels: getCheckoutPageEmptyBagLabels(state),
    shippingProps: {
      isSubmitting: getShipmentLoadingStatus(state),
      addressLabels: getAddEditAddressLabels(state),
      isOrderUpdateChecked: getShippingSendOrderUpdate(state),
      isGiftServicesChecked: getGiftWrappingValues(state),
      smsSignUpLabels: getSmsSignUpLabels(state),
      selectedShipmentId: getSelectedShipmentId(state), // selected shipment radio button
      address: getAddressFields(state), // address for fields data
      addressPhoneNumber: getShippingPhoneNo(state), // phone field inside address for section
      emailSignUpLabels: getEmailSignUpLabels(state),
      shipmentMethods: getShipmentMethods(state), // all the shipment methods from api
      defaultShipmentId: getDefaultShipmentID(state), // default shipment to be shown as selected
      isSaveToAddressBookChecked: getSaveToAddressBook(state),
      userAddresses: getShippingAddressList(state),
      onFileAddressKey: getOnFileAddressKey(state), // selected address Id in dropdown
      newUserPhoneNo: getUserPhoneNumber(state), // newly added user phone number to be shown as default in mobile number field in address form
      shippingAddressId: getShippingAddressID(state), // address user has selected should be shown as selected in dropdown, not the default address
      setAsDefaultShipping: getDefaultShipping(state),
      addEditResponseAddressId: getAddEditResponseAddressId(state),
      shippingAddress: getShippingAddress(state),
      syncErrors: getSyncError(state),
      shippingPhoneAndEmail: getShippingPhoneAndEmail(state),
    },
    billingProps: {
      labels: getBillingLabels(state),
      shippingAddress: getShippingAddress(state),
      billingData: getBillingValues(state),
      userAddresses: getAddressListState(state),
      creditFieldLabels: getCreditFieldLabels(state),
    },
    activeStep: getCheckoutStage(state),
    //  isPlccOfferModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccPromoModalId,
    // isPlccFormModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccFormModalId,
    isUsSite: isUsSiteUser(),
    // shouldSkipBillingStep: storeOperators.checkoutOperator.shouldSkipBillingStep(),
    orderHasPickUp: getIsOrderHasPickup(state),
    orderHasShipping: getIsOrderHasShipping(state),
    pickUpLabels: {
      ...selectors.getPickUpContactFormLabels(state),
      ...getEmailSignUpLabels(state),
    },
    smsSignUpLabels: getSmsSignUpLabels(state),
    isBagLoaded: BagPageSelector.isBagLoaded(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isGiftServicesChecked: getGiftServicesSend(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
    cartOrderItemsCount: BagPageSelector.getTotalItems(state),
    labels: selectors.getLabels(state),
    checkoutProgressBarLabels: getCheckoutProgressBarLabels(state),
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    getGiftServicesContentTcpId: BagPageSelector.getGiftServicesContentTcpId(state),
    getGiftServicesContentGymId: BagPageSelector.getGiftServicesContentGymId(state),
    reviewProps: {
      labels: getReviewLabels(state),
      isPaymentDisabled: getIsPaymentDisabled(state),
      defaultShipmentId: getDefaultShipmentID(state),
      cardType: selectors.getCardType(state),
      isRTPSDataRequired: !(isPlccUser(state) || getplccCardNumber(state)) && getIsRTPSEnabled(state)
    },
    isVenmoPaymentInProgress: selectors.isVenmoPaymentInProgress(),
    getPayPalSettings: selectors.getPayPalSettings(state),
    checkoutServerError: selectors.getCheckoutServerError(state),
    isRegisteredUserCallDone: getIsRegisteredUserCallDone(state),
    currentStage: getCurrentCheckoutStage(state),
    pickUpAlternatePerson: getPickupAltValues(state),
    isHasPickUpAlternatePerson: isPickupAlt(state),
    pickUpContactPerson: getPickupValues(state),
    pickUpContactAlternate: selectors.getPickupInitialPickupSectionValues(state),
    cvvCodeInfoContentId: getCVVCodeInfoContentId(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
