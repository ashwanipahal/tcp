import React from 'react';
import { connect } from 'react-redux';
// import CheckoutProgressUtils from '@tcp/web/src/components/features/content/CheckoutProgressIndicator/utils/utils'
import {
  initCheckoutAction,
  submitShippingSection,
  submitPickupSection,
  onEditModeChangeAction,
  fetchShipmentMethods,
  routeToPickupPage as routeToPickupPageActn,
  getSetCheckoutStage,
  submitBillingSection,
} from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors, {
  isGuest as isGuestUser,
  isExpressCheckout,
  getAlternateFormUpdate,
  getSendOrderUpdate,
  getCheckoutStage,
} from './Checkout.selector';
import checkoutUtil from '../util/utility';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';
import BAG_PAGE_ACTIONS from '../../BagPage/container/BagPage.actions';

const {
  getShippingLabels,
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
  getCheckoutProgressBarLabels,
} = selectors;

export class CheckoutContainer extends React.Component<Props> {
  componentDidMount() {
    const { initCheckout, needHelpContentId, fetchNeedHelpContent } = this.props;
    initCheckout();
    fetchNeedHelpContent([needHelpContentId]);
  }

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
      submitBilling,
      checkoutProgressBarLabels,
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
        isAlternateUpdateChecked={isAlternateUpdateChecked}
        pickUpLabels={pickUpLabels}
        smsSignUpLabels={smsSignUpLabels}
        navigation={navigation}
        onPickupSubmit={onPickupSubmit}
        shippingProps={shippingProps}
        orderHasPickUp={orderHasPickUp}
        submitShippingSection={submitShipping}
        loadShipmentMethods={loadShipmentMethods}
        cartOrderItems={cartOrderItems}
        routeToPickupPage={routeToPickupPage}
        setCheckoutStage={setCheckoutStage}
        availableStages={availableStages}
        router={router}
        submitBilling={submitBilling}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    initCheckout: () => {
      dispatch(initCheckoutAction());
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
    submitBilling: payload => {
      dispatch(submitBillingSection(payload));
    },
    fetchNeedHelpContent: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
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
      addressLabels: getAddEditAddressLabels(state),
      isOrderUpdateChecked: getShippingSendOrderUpdate(state),
      shippingLabels: getShippingLabels(state),
      smsSignUpLabels: getSmsSignUpLabels(state),
      selectedShipmentId: getSelectedShipmentId(state),
      address: getAddressFields(state),
      addressPhoneNumber: getAddressPhoneNo(state),
      emailSignUpLabels: getEmailSignUpLabels(state),
      shipmentMethods: getShipmentMethods(state),
      defaultShipmentId: getDefaultShipmentID(state),
    },
    billingProps: {
      labels: getBillingLabels(state),
    },
    // isAddressVerifyModalOpen: addressesStoreView.isVerifyAddressModalOpen(state),
    // onPickupSubmit: storeOperators.checkoutFormOperator.submitPickupSection,
    // onShippingSubmit: storeOperators.checkoutFormOperator.submitShippingSection,
    // onBillingSubmit: storeOperators.checkoutFormOperator.submitBillingSection,
    // onReviewSubmit: storeOperators.checkoutFormOperator.submitOrderForProcessing,

    activeStep: getCheckoutStage(state),
    // moveToCheckoutStage: storeOperators.checkoutSignalsOperator.moveToStage,
    // availableStages: storeOperators.checkoutSignalsOperator.getAvailableStages(),

    //  isPlccOfferModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccPromoModalId,
    // isPlccFormModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccFormModalId,
    isUsSite: selectors.isUsSite(),
    // shouldSkipBillingStep: storeOperators.checkoutOperator.shouldSkipBillingStep(),
    orderHasPickUp: getIsOrderHasPickup(state),
    orderHasShipping: getIsOrderHasShipping(state),
    pickUpLabels: {
      ...selectors.getPickUpContactFormLabels(state),
      ...getEmailSignUpLabels(state),
    },
    smsSignUpLabels: getSmsSignUpLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
    checkoutProgressBarLabels: getCheckoutProgressBarLabels(state),
    needHelpContentId: BagPageSelector.getNeedHelpContentId(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
