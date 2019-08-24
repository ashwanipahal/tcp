import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  renderLeftSection = () => {
    const {
      router,
      initialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      shippingProps,
      navigation,
      isGuest,
      isUsSite,
      orderHasPickUp,
    } = this.props;
    const currentSection = router.query.section;
    return (
      <>
        {currentSection.toLowerCase() === 'pickup' && (
          <PickupPage
            initialValues={initialValues}
            onEditModeChange={onEditModeChange}
            isSmsUpdatesEnabled={isSmsUpdatesEnabled}
            currentPhoneNumber={currentPhoneNumber}
            navigation={navigation}
          />
        )}
        {currentSection.toLowerCase() === 'shipping' && (
          <ShippingPage
            {...shippingProps}
            isGuest={isGuest}
            isUsSite={isUsSite}
            orderHasPickUp={orderHasPickUp}
          />
        )}
      </>
    );
  };

  render() {
    return <CnCTemplate leftSection={this.renderLeftSection} />;
  }
}

CheckoutPage.propTypes = {
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  shippingProps: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};
