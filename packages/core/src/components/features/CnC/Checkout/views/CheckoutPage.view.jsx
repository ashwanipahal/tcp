import React from 'react';
import PropTypes from 'prop-types';
import CnCTemplate from '../../common/organism/CnCTemplate';
import PickupPage from '../organisms/PickupPage';
import ShippingPageView from '../organisms/ShippingPage';

export default class CheckoutPage extends React.PureComponent {
  renderLeftSection = () => {
    const {
      currentSection,
      initialValues,
      onEditModeChange,
      isSmsUpdatesEnabled,
      currentPhoneNumber,
      shippingProps,
    } = this.props;
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
        {currentSection.toLowerCase() === 'shipping' && <ShippingPageView {...shippingProps} />}
      </>
    );
  };

  render() {
    return <CnCTemplate leftSection={this.renderLeftSection} />;
  }
}

CheckoutPage.propTypes = {
  currentSection: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.bool.isRequired,
  isSmsUpdatesEnabled: PropTypes.bool.isRequired,
  currentPhoneNumber: PropTypes.number.isRequired,
  shippingProps: PropTypes.shape({}).isRequired,
};
