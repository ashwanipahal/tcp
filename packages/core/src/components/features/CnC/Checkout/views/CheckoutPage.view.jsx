import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  render() {
    const {
      currentSection,
      initialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
    } = this.props;
    return (
      <CnCTemplate
        leftSection={() => {
          return (
            <>
              {currentSection.toLowerCase() === 'pickup' && (
                <PickupPage
                  initialValues={initialValues}
                  onEditModeChange={onEditModeChange}
                  isSmsUpdatesEnabled={isSmsUpdatesEnabled}
                  currentPhoneNumber={currentPhoneNumber}
                />
              )}
              {currentSection.toLowerCase() === 'shipping' && <ShippingPage />}
            </>
          );
        }}
      />
    );
  }
}

CheckoutPage.propTypes = {
  currentSection: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
};
