import React from 'react';
import { connect } from 'react-redux';
import { initCheckoutAction, submitShippingSection } from './Checkout.action';
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
        shippingProps={shippingProps}
        navigation={navigation}
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
  };
};

const mapStateToProps = state => {
  return {
    initialValues: selectors.getInitialPickupSectionValues(state),
    onEditModeChange: true, // storeOperators.checkoutSignalsOperator.setIsEditingSubform,
    isSmsUpdatesEnabled: selectors.isSmsUpdatesEnabled(),
    currentPhoneNumber: selectors.getCurrentPickupFormNumber(state),
    isGuest: selectors.isGuest(state),
    isMobile: selectors.getIsMobile(),
    isExpressCheckout: selectors.isExpressCheckout(state),
    activeStage: selectors.getCheckoutStage(state),
    shippingProps: {
      addressLabels: getAddEditAddressLabels(state),
      isOrderUpdateChecked: getSendOrderUpdate(state),
      shippingLabels: getShippingLabels(state),
      smsSignUpLabels: getSmsSignUpLabels(state),
      selectedShipmentId: getSelectedShipmentId(state),
      address: getAddressFields(state),
      addressPhoneNumber: getAddressPhoneNo(state),
      emailSignUpLabels: getEmailSignUpLabels(state),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
