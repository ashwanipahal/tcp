import { submit } from 'redux-form';
import { setClickAnalyticsData, trackClick, updatePageData } from '@tcp/core/src/analytics/actions';
import CHECKOUT_ACTIONS, {
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
  submitReviewSection,
  setVenmoPickupMessageState,
  setVenmoShippingMessageState,
  submitVerifiedAddressData,
  getSetIsBillingVisitedActn,
} from './Checkout.action';
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
  getPageData,
} from './Checkout.selector';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';
import { getAddressListState } from '../../../account/AddressBook/container/AddressBook.selectors';
import {
  getUserPhoneNumber,
  getIsRegisteredUserCallDone,
} from '../../../account/User/container/User.selectors';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';
import { toastMessageInfo } from '../../../../common/atoms/Toast/container/Toast.actions.native';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import { getCVVCodeInfoContentId } from '../organisms/BillingPage/container/BillingPage.selectors';
import constants from '../Checkout.constants';
import { getPayPalFlag } from '../util/utility';
import { isMobileApp } from '../../../../../utils';
import GiftCardSelector from '../organisms/GiftCardsSection/container/GiftCards.selectors';
import { getCardListFetchingState } from '../../../account/Payment/container/Payment.selectors';
import SMSNotificationSelectors from '../../Confirmation/organisms/SMSNotifications/container/SMSNotifications.selectors';
import { getInitialGiftWrapOptions } from '../organisms/ShippingPage/molecules/GiftServices/container/GiftServices.selector';

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
} = selectors;

export const formatPayload = payload => {
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

export const intiSectionPage = (pageName, scope, extraProps = {}) => {
  const scopeValue = scope;
  const { initCheckoutSectionPage, router, isRegisteredUserCallDone, navigation } = scope.props;
  let recalc;
  let isPaypalPostBack;
  let appRouting;
  if (router && router.query) {
    ({ recalc, isPaypalPostBack, appRouting } = router.query);
  }
  if (isRegisteredUserCallDone || isMobileApp()) {
    initCheckoutSectionPage({
      pageName,
      recalc,
      isPaypalPostBack,
      initialLoad: scopeValue.initialLoad,
      appRouting,
      navigation,
      ...extraProps,
    });
    scopeValue.initialLoad = false;
  }
  if (isMobileApp()) {
    isPaypalPostBack = getPayPalFlag(navigation);
  }
};

/* istanbul ignore next */
export const mapDispatchToProps = dispatch => {
  return {
    initCheckout: (router, isPaypalFlow, navigation) => {
      dispatch(CHECKOUT_ACTIONS.initCheckoutAction(router, isPaypalFlow, navigation));
    },
    initCheckoutSectionPage: payload => {
      dispatch(CHECKOUT_ACTIONS.initCheckoutSectionPageAction(payload));
    },
    submitShipping: payload => {
      dispatch(submitShippingSection(payload));
    },
    onPickupSubmit: data => dispatch(submitPickupSection(data)),
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
    updateShippingAddressData: (payload, afterUpdateAddress) => {
      dispatch(updateShippingAddress(payload, afterUpdateAddress));
    },
    addNewShippingAddressData: payload => {
      dispatch(addNewShippingAddress(payload));
    },
    submitBilling: payload => dispatch(submitBillingSection(payload)),
    fetchNeedHelpContent: contentIds => dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds)),
    markBagPageRoutingDone: () => dispatch(BAG_PAGE_ACTIONS.setBagPageIsRouting(false)),
    submitReview: payload => dispatch(submitReviewSection(payload)),
    verifyAddressAction: payload => dispatch(verifyAddress(payload)),
    dispatchReviewReduxForm: () => dispatch(submit(constants.REVIEW_FORM_NAME)),
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
      dispatch(CHECKOUT_ACTIONS.toggleCountrySelectorModal(payload));
    },
    setClickAnalyticsDataCheckout: payload => {
      dispatch(setClickAnalyticsData(payload));
    },
    trackClickAnalytics: payload => {
      dispatch(trackClick(payload));
    },
    updateCheckoutPageData: payload => {
      dispatch(updatePageData(payload));
    },
    clearIsBillingVisitedState: () => {
      dispatch(getSetIsBillingVisitedActn(false));
    },
    cartLoading: () => {
      dispatch(BAG_PAGE_ACTIONS.setBagPageLoading());
    },
  };
};

/* istanbul ignore next */
export const mapStateToProps = state => {
  const giftWrap = getInitialGiftWrapOptions(state);
  const hasSetGiftOptions = giftWrap && giftWrap.size;
  return {
    initialValues: selectors.getPickupInitialPickupSectionValues(state),
    checkoutRoutingDone: selectors.getIfCheckoutRoutingDone(state),
    pickupInitialValues: selectors.getPickupInitialPickupSectionValues(state),
    bagLoading: BagPageSelector.isBagLoading(state),
    isSmsUpdatesEnabled: selectors.isSmsUpdatesEnabled(),
    currentPhoneNumber: selectors.getCurrentPickupFormNumber(state),
    isGuest: isGuestUser(state),
    isMobile: selectors.getIsMobile(),
    isExpressCheckoutPage: isExpressCheckout(state),
    activeStage: getCheckoutStage(state),
    shippingMethod: getDefaultShipmentID(state),
    checkoutPageEmptyBagLabels: getCheckoutPageEmptyBagLabels(state),
    emailSignUpFlags: BagPageSelector.getIfEmailSignUpDone(state),
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
      isLoadingShippingMethods: GiftCardSelector.getIsLoading(state),
      isFetching: getCardListFetchingState(state),
      bagLoading: BagPageSelector.isBagLoading(state),
      hasSetGiftOptions,
    },
    billingProps: {
      labels: getBillingLabels(state),
      shippingAddress: getShippingAddress(state),
      billingData: getBillingValues(state),
      userAddresses: getAddressListState(state),
      creditFieldLabels: getCreditFieldLabels(state),
      isFetching: getCardListFetchingState(state),
      bagLoading: BagPageSelector.isBagLoading(state),
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
      isFetching: getCardListFetchingState(state),
      bagLoading: BagPageSelector.isBagLoading(state),
    },
    isVenmoPaymentInProgress: selectors.isVenmoPaymentInProgress(state),
    getPayPalSettings: selectors.getPayPalSettings(state),
    checkoutServerError: selectors.getCheckoutServerError(state),
    isRegisteredUserCallDone: getIsRegisteredUserCallDone(state),
    currentStage: getCurrentCheckoutStage(state),
    pickUpAlternatePerson: getPickupAltValues(state),
    isHasPickUpAlternatePerson: isPickupAlt(state),
    pickUpContactPerson: getPickupValues(state),
    pickUpContactAlternate: selectors.getPickupInitialPickupSectionValues(state),
    cvvCodeInfoContentId: getCVVCodeInfoContentId(state),
    couponHelpContentId: BagPageSelector.getNeedHelpContentId(state),
    isRTPSFlow: selectors.getIsRtpsFlow(state),
    isPayPalWebViewEnable: BagPageSelector.getPayPalWebViewStatus(state),
    pageData: getPageData(state),
    notificationMsgContentId: SMSNotificationSelectors.getNotificationMsgContentId(state),
    subscribeSuccessMsgContentId: SMSNotificationSelectors.getSubscribeSuccessMsgContentId(state),
    isVenmoPickupBannerDisplayed: selectors.isVenmoPickupBannerDisplayed(state),
    isVenmoShippingBannerDisplayed: selectors.isVenmoShippingBannerDisplayed(state),
  };
};

export const callNeedHelpContent = props => {
  const {
    fetchNeedHelpContent,
    needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId,
    notificationMsgContentId,
    subscribeSuccessMsgContentId,
  } = props;
  fetchNeedHelpContent([
    needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId,
    notificationMsgContentId,
    subscribeSuccessMsgContentId,
  ]);
};
