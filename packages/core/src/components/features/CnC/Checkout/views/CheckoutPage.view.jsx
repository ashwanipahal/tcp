import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickupPage from '../organisms/PickupPage';
import ShippingPage from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  render() {
    const {
      router,
      initialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      navigation,
    } = this.props;
    const currentSection = router.query.section;
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
                  navigation={navigation}
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
  router: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};
