import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; //eslint-disable-line
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';
import CHECKOUT_STAGES from '../../../../../../../web/src/pages/App.constants';
import CheckoutProgressUtils from '../../../../../../../web/src/components/features/content/CheckoutProgressIndicator/utils/utils';

class CheckoutPage extends React.PureComponent {
  componentDidUpdate() {
    const { router, cartOrderItems } = this.props;
    const currentStage = router.query.section;

    const availableStages = CheckoutProgressUtils.getAvailableStages(cartOrderItems);

    let requestedStage = '';
    if (availableStages.length > 3) {
      requestedStage = CHECKOUT_STAGES.PICKUP;
    } else {
      requestedStage = CHECKOUT_STAGES.SHIPPING;
    }
    CheckoutProgressUtils.routeToStage(requestedStage, cartOrderItems, false, currentStage);
  }

  onPickUpSubmit = data => {
    const { onPickupSubmit } = this.props;
    const { firstName, lastName, phoneNumber, emailAddress } = data.pickUpContact;
    const { hasAlternatePickup } = data.pickUpAlternate;
    const params = {
      pickUpContact: {
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        smsInfo: {
          wantsSmsOrderUpdates: data.smsSignUp.sendOrderUpdate,
        },
      },
      hasAlternatePickup,
      pickUpAlternate: {
        firstName: hasAlternatePickup ? data.pickUpAlternate.firstName : '',
        lastName: hasAlternatePickup ? data.pickUpAlternate.lastName : '',
        emailAddress: hasAlternatePickup ? data.pickUpAlternate.emailAddress : '',
      },
    };
    onPickupSubmit(params);
  };

  renderLeftSection = () => {
    const {
      router,
      isGuest,
      isMobile,
      isUsSite,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      shippingProps,
      navigation,
      orderHasPickUp,
      submitShippingSection,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
      loadShipmentMethods,
      // onPickupSubmit,
    } = this.props;

    const section = router.query.section || router.query.subSection;
    const currentSection = section || CHECKOUT_STAGES.SHIPPING;
    return (
      <div>
        {currentSection.toLowerCase() === 'pickup' && (
          <PickUpFormPart
            isGuest={isGuest}
            isMobile={isMobile}
            isUsSite={isUsSite}
            initialValues={pickupInitialValues}
            onEditModeChange={onEditModeChange}
            isSmsUpdatesEnabled={isSmsUpdatesEnabled}
            currentPhoneNumber={currentPhoneNumber}
            isOrderUpdateChecked={isOrderUpdateChecked}
            isAlternateUpdateChecked={isAlternateUpdateChecked}
            pickUpLabels={pickUpLabels}
            smsSignUpLabels={smsSignUpLabels}
            onSubmit={this.onPickUpSubmit}
            navigation={navigation}
          />
        )}
        {currentSection.toLowerCase() === 'shipping' && (
          <ShippingPage
            {...shippingProps}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
            handleSubmit={submitShippingSection}
            loadShipmentMethods={loadShipmentMethods}
          />
        )}
      </div>
    );
  };

  render() {
    return <CnCTemplate leftSection={this.renderLeftSection} />;
  }
}

CheckoutPage.propTypes = {
  isGuest: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUsSite: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  shippingProps: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  orderHasPickUp: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  submitShippingSection: PropTypes.func.isRequired,
  loadShipmentMethods: PropTypes.func.isRequired,
  // onPickupSubmit: PropTypes.func.isRequired,
  onPickupSubmit: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
};

export default withRouter(CheckoutPage);
export { CheckoutPage as CheckoutPageVanilla };
