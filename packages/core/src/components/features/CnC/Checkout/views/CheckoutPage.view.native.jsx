import React from 'react';
import PropTypes from 'prop-types';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  render() {
    const {
      initialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      navigation,
      shippingProps,
      loadShipmentMethods,
      isGuest,
      isUsSite,
      orderHasPickUp,
      submitShippingSection,
    } = this.props;
    return (
      <>
        <PickupPage
          initialValues={initialValues}
          onEditModeChange={onEditModeChange}
          isSmsUpdatesEnabled={isSmsUpdatesEnabled}
          currentPhoneNumber={currentPhoneNumber}
          navigation={navigation}
        />
        <ShippingPage
          {...shippingProps}
          loadShipmentMethods={loadShipmentMethods}
          navigation={navigation}
          isGuest={isGuest}
          isUsSite={isUsSite}
          orderHasPickUp={orderHasPickUp}
          handleSubmit={submitShippingSection}
        />
      </>
    );
  }
}

CheckoutPage.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  shippingProps: PropTypes.shape({}).isRequired,
  loadShipmentMethods: PropTypes.func.isRequired,
  isGuest: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUsSite: PropTypes.bool.isRequired,
  orderHasPickUp: PropTypes.bool.isRequired,
  submitShippingSection: PropTypes.func.isRequired,
};
