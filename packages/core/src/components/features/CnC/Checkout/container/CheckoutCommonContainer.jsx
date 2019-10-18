import React from 'react';
import { connect } from 'react-redux';
import {
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
  initShippingAction,
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
} from './Checkout.selector';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import checkoutUtil from '../util/utility';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  getUserPhoneNumber,
  getIsRegisteredUserCallDone,
} from '../../../account/User/container/User.selectors';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

const {
  getSmsSignUpLabels,
  getSelectedShipmentId,
  getAddressFields,
  getAddressPhoneNo,
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
    } = this.props;
    /* istanbul ignore else */
    if (isRegisteredUserCallDone) {
      initCheckout(router);
    }
    fetchNeedHelpContent([
      needHelpContentId,
      getGiftServicesContentTcpId,
      getGiftServicesContentGymId,
    ]);
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
      submitVerifiedShippingAddressData,
      initShippingPage,
    } = this.props;
    const availableStages = checkoutUtil.getAvailableStages(
      cartOrderItems,
      checkoutProgressBarLabels
    );
    return (
      <CheckoutPage
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
        billingProps={billingProps}
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
        shippingProps={shippingProps}
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
        reviewProps={reviewProps}
        formatPayload={this.formatPayload}
        isVenmoPaymentInProgress={isVenmoPaymentInProgress}
        setVenmoPickupState={setVenmoPickupState}
        setVenmoShippingState={setVenmoShippingState}
        initShippingPage={initShippingPage}
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
    initShippingPage: () => {
      dispatch(initShippingAction());
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
    setVenmoPickupState: data => dispatch(setVenmoPickupMessageState(data)),
    setVenmoShippingState: data => dispatch(setVenmoShippingMessageState(data)),
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
    shippingProps: {
      isSubmitting: getShipmentLoadingStatus(state),
      addressLabels: getAddEditAddressLabels(state),
      isOrderUpdateChecked: getShippingSendOrderUpdate(state),
      isGiftServicesChecked: getGiftWrappingValues(state),
      smsSignUpLabels: getSmsSignUpLabels(state),
      selectedShipmentId: getSelectedShipmentId(state), // selected shipment radio button
      address: getAddressFields(state), // address for fields data
      addressPhoneNumber: getAddressPhoneNo(state), // phone field inside address for section
      emailSignUpLabels: getEmailSignUpLabels(state),
      shipmentMethods: getShipmentMethods(state), // all the shipment methods from api
      defaultShipmentId: getDefaultShipmentID(state), // default shipment to be shown as selected
      isSaveToAddressBookChecked: getSaveToAddressBook(state),
      userAddresses: getAddressListState(state),
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
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isGiftServicesChecked: getGiftServicesSend(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
    labels: selectors.getLabels(state),
    checkoutProgressBarLabels: getCheckoutProgressBarLabels(state),
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    getGiftServicesContentTcpId: BagPageSelector.getGiftServicesContentTcpId(state),
    getGiftServicesContentGymId: BagPageSelector.getGiftServicesContentGymId(state),
    reviewProps: {
      labels: getReviewLabels(state),
    },
    isVenmoPaymentInProgress: selectors.isVenmoPaymentInProgress(),
    isRegisteredUserCallDone: getIsRegisteredUserCallDone(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
