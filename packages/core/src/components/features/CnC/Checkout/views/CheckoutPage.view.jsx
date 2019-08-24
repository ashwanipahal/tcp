import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickUpFormPart';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  onPickUpSubmit = data => {
    console.log(data);
  };

  leftSection = () => {
    const {
      router,
      isGuest,
      isMobile,
      isUsSite,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
      navigation,
    } = this.props;
    const currentSection = router.query.section || router.query.subSection;
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
        {currentSection.toLowerCase() === 'shipping' && <ShippingPage />}
      </div>
    );
  };

  render() {
    return (
      <div>
        <CnCTemplate leftSection={this.leftSection} />
      </div>
    );
  }
}

CheckoutPage.propTypes = {
  isGuest: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUsSite: PropTypes.bool.isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};
