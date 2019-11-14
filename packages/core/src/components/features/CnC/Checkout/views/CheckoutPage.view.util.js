import PropTypes from 'prop-types';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
import CONSTANTS from '../Checkout.constants';

/**
 * This method returns the current checkout section
 */
export const getCurrentSection = props => {
  const { router } = props;
  const section = router.query.section || router.query.subSection;
  return section || CHECKOUT_STAGES.SHIPPING;
};

export const updateAnalyticsData = (props, prevProps) => {
  const { updateCheckoutPageData, router, pageData } = props;
  const currentSection = router.query.section || router.query.subSection;
  const { router: prevRouter } = prevProps;
  const prevCurrentSection = prevRouter.query.section || prevRouter.query.subSection;
  const { pageName } = pageData;
  if (typeof pageName === 'undefined' || currentSection !== prevCurrentSection) {
    const checkoutName = CONSTANTS.CHECKOUT;
    const pageDataUpdated = {
      pageName: `${checkoutName}:${currentSection}`,
      pageSection: checkoutName,
      pageType: checkoutName,
      pageShortName: `${checkoutName}:${currentSection}`,
      loadAnalyticsOnload: false,
    };
    updateCheckoutPageData(pageDataUpdated);
  }
};

export const getFormLoad = (pickupInitialValues, isGuest) => {
  return !!(
    isGuest ||
    (pickupInitialValues &&
      pickupInitialValues.pickUpContact &&
      pickupInitialValues.pickUpContact.firstName)
  );
};

export const propsTypes = {
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
  isBagLoaded: PropTypes.bool.isRequired,
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
  isRegisteredUserCallDone: PropTypes.bool.isRequired,
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
  getIfCheckoutRoutingDone: PropTypes.bool.isRequired,
  checkoutRoutingDone: PropTypes.bool.isRequired,
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
  dispatchReviewReduxForm: PropTypes.func.isRequired,
  isHasPickUpAlternatePerson: PropTypes.shape({}).isRequired,
  pickUpContactPerson: PropTypes.shape({}).isRequired,
  checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
  pickUpContactAlternate: PropTypes.shape({}).isRequired,
  clearCheckoutServerError: PropTypes.func.isRequired,
  cartOrderItemsCount: PropTypes.number.isRequired,
  setClickAnalyticsDataCheckout: PropTypes.func.isRequired,
  updateCheckoutPageData: PropTypes.func.isRequired,
  updateRTPS: PropTypes.func.isRequired,
  setCheckoutStage: PropTypes.func.isRequired,
  pageData: PropTypes.shape({}),
};
