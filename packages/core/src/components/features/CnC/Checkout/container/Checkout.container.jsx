import React from 'react';
import { connect } from 'react-redux';
import {
  initCheckoutAction,
  submitShippingSection,
  submitPickupSection,
  onEditModeChangeAction,
} from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors from './Checkout.selector';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';

const {
  getSendOrderUpdate,
  getShippingLabels,
  getSmsSignUpLabels,
  getSelectedShipmentId,
  getAddressFields,
  getAddressPhoneNo,
  getIsOrderHasPickup,
  getEmailSignUpLabels,
  getShipmentMethods,
  getDefaultShipmentID,
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getShippingSendOrderUpdate,
} = selectors;

export class CheckoutContainer extends React.Component<Props> {
  componentDidMount() {
    const { initCheckout } = this.props;
    initCheckout();
  }

  render() {
    const {
      router,
      initialValues,
      pickupInitialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      isGuest,
      isMobile,
      isExpressCheckout,
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
    } = this.props;

    return (
      <CheckoutPage
        router={router}
        initialValues={initialValues}
        onEditModeChange={onEditModeChange}
        isSmsUpdatesEnabled={isSmsUpdatesEnabled}
        currentPhoneNumber={currentPhoneNumber}
        isGuest={isGuest}
        isMobile={isMobile}
        isExpressCheckout={isExpressCheckout}
        activeStage={activeStage}
        activeStep={activeStep}
        isUsSite={isUsSite}
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
    onPickupSubmit: () => {
      dispatch(submitPickupSection());
    },
    onEditModeChange: data => {
      dispatch(onEditModeChangeAction(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    initialValues: selectors.getPickupInitialPickupSectionValues(state),
    pickupInitialValues: selectors.getPickupInitialPickupSectionValues(state),
    isSmsUpdatesEnabled: selectors.isSmsUpdatesEnabled(),
    currentPhoneNumber: selectors.getCurrentPickupFormNumber(state),
    isGuest: selectors.isGuest(state),
    isMobile: selectors.getIsMobile(),
    isExpressCheckout: selectors.isExpressCheckout(state),
    activeStage: selectors.getCheckoutStage(state),
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

    activeStep: selectors.getCheckoutStage(state),
    // moveToCheckoutStage: storeOperators.checkoutSignalsOperator.moveToStage,
    // availableStages: storeOperators.checkoutSignalsOperator.getAvailableStages(),

    //  isPlccOfferModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccPromoModalId,
    // isPlccFormModalOpen: generalStoreView.getOpenModalId(state) === MODAL_IDS.plccFormModalId,
    isUsSite: selectors.isUsSite(),
    // shouldSkipBillingStep: storeOperators.checkoutOperator.shouldSkipBillingStep(),
    orderHasPickUp: getIsOrderHasPickup(state),
    pickUpLabels: getPickUpContactFormLabels(state),
    smsSignUpLabels: getSmsSignUpLabels(state),
    isOrderUpdateChecked: getSendOrderUpdate(state),
    isAlternateUpdateChecked: getAlternateFormUpdate(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
