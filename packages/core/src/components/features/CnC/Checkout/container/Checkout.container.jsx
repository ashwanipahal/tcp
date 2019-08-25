import React from 'react';
import { connect } from 'react-redux';
import { initCheckoutAction, submitPickupSection, onEditModeChangeAction } from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors, {
  isGuest,
  isExpressCheckout,
  getAlternateFormUpdate,
  getPickUpContactFormLabels,
  getSendOrderUpdate,
} from './Checkout.selector';

import { getSmsSignUpLabels } from '../../ShippingPage/container/ShippingPage.selectors';

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
      isMobile,
      activeStage,
      activeStep,
      isUsSite,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      navigation,
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
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    initCheckout: () => {
      dispatch(initCheckoutAction());
    },
    onPickupSubmit: data => {
      dispatch(submitPickupSection(data));
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
    isGuest: isGuest(state),
    isMobile: selectors.getIsMobile(),
    isExpressCheckout: isExpressCheckout(state),
    activeStage: selectors.getCheckoutStage(state),
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
