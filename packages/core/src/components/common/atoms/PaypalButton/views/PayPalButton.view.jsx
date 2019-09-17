import React from 'react';
import PropTypes from 'prop-types';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { getLocator } from '../../../../../utils';

class PayPalButton extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    window.paypal
      ? setTimeout(this.renderPayPalButton)
      : requireNamedOnlineModule('paypal').then(this.renderPayPalButton);
  }

  renderPayPalButton = () => {
    const { containerId, height, initalizePayPalButton, isQualifedOrder } = this.props;
    const element = document.querySelector(`#${containerId}`);
    if (element && !element.hasChildNodes()) {
      initalizePayPalButton({
        containerId,
        height,
        isQualifedOrder,
      });
    }
  };

  render() {
    const { className } = this.props;
    return (
      <div
        data-locator={getLocator('addedtobag_btnpaypal')}
        className={className}
        id="paypal-button-container"
      />
    );
  }
}

PayPalButton.defaultProps = {
  containerId: 'paypal-button-container',
  height: 48,
};

PayPalButton.propTypes = {
  className: PropTypes.string.isRequired,
  containerId: PropTypes.string,
  height: PropTypes.number,
  initalizePayPalButton: PropTypes.func.isRequired,
  isQualifedOrder: PropTypes.bool.isRequired,
};

export default PayPalButton;
