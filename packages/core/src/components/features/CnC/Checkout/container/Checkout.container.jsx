import React from 'react';
import { connect } from 'react-redux';
import {
  initCheckoutAction,
  submitShippingSection,
  submitPickupSection,
  onEditModeChangeAction,
  fetchShipmentMethods,
  routeToPickupPage as routeToPickupPageActn,
} from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors, {
  isGuest as isGuestUser,
  isExpressCheckout,
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getSendOrderUpdate,
  getCheckoutStage,
} from './Checkout.selector';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import BagPageSelector from '../../BagPage/container/BagPage.selectors';

const {
  getShippingLabels,
  getSmsSignUpLabels,
  getSelectedShipmentId,
  getAddressFields,
  getAddressPhoneNo,
  getIsOrderHasPickup,
  getIsOrderHasShipping,
  getEmailSignUpLabels,
  getShipmentMethods,
  getDefaultShipmentID,
  getShippingSendOrderUpdate,
} = selectors;

export class CheckoutContainer extends React.Component<Props> {
  componentDidMount() {
    const { initCheckout } = this.props;
    initCheckout();
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
    } = this.props;
    console.log('isGuest', isGuest, initialValues, isUsSite);
    return (
      <CheckoutPage
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
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
    pickUpLabels: { ...getPickUpContactFormLabels(state), ...getEmailSignUpLabels(state) },
    smsSignUpLabels: getSmsSignUpLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
    cartOrderItems: BagPageSelector.getOrderItems(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
