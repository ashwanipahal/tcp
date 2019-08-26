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
      shippingProps
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
        <ShippingPage {...shippingProps} />
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
};
