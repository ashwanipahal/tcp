import React from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { withRouter } from 'next/router';
import { initCheckoutAction, onEditModeChangeAction } from './Checkout.action';
import CheckoutPage from '../views/CheckoutPage.view';
import selectors, {
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
      isGuest,
      isMobile,
      isExpressCheckout,
      activeStage,
      activeStep,
      isUsSite,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
    } = this.props;

    return (
      <CheckoutPage
        initialValues={initialValues}
        currentSection={router.query.section}
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
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    initCheckout: () => {
      dispatch(initCheckoutAction());
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CheckoutContainer)
);
