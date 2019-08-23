import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickUpFormPart from '../organisms/PickUpFormPart';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  leftSection = () => {
    const {
      isGuest,
      isMobile,
      isUsSite,
      currentSection,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      isOrderUpdateChecked,
      isAlternateUpdateChecked,
      pickUpLabels,
      smsSignUpLabels,
      pickupInitialValues,
    } = this.props;

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
          />
        )}
        {currentSection.toLowerCase() === 'shipping' && <ShippingPage />}
      </div>
    );
  };

  render() {
    return <CnCTemplate leftSection={this.leftSection} />;
  }
}

CheckoutPage.propTypes = {
  isGuest: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUsSite: PropTypes.bool.isRequired,
  currentSection: PropTypes.string.isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  isOrderUpdateChecked: PropTypes.bool.isRequired,
  isAlternateUpdateChecked: PropTypes.bool.isRequired,
  pickupInitialValues: PropTypes.shape({}).isRequired,
  pickUpLabels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
};
