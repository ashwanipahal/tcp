import React from 'react';
import PropTypes from 'prop-types';
import { requireNamedOnlineModule } from '../../GoogleAutoSuggest/resourceLoader';
import { getLocator } from '../../../../../utils';

class PayPalButton extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    window.paypal
      ? setTimeout(this.renderPayPalButton)
      : requireNamedOnlineModule('paypal').then(this.renderPayPalButton);
  }

  initializePayPalButton = ({ containerId, height = 48 }) => {
    const options = {
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
        tagline: false, // disabling the tagline text
        height,
      },
      funding: {
        // eslint-disable-next-line no-undef
        disallowed: [],
      },
      env: 'sandbox',
      payment: () => {
        return '';
      },
      onAuthorize: () => {
        return '';
      },
      // onCancel: this.clearPaypalSettings,
      onError: () => {
        throw new Error();
      },
    };

    window.paypal.Button.render(options, `#${containerId}`);
  };

  renderPayPalButton = () => {
    const element = document.querySelector(`#paypal-button-container`);
    if (element && !element.hasChildNodes()) {
      this.initializePayPalButton({
        containerId: 'paypal-button-container',
        height: 48,
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

PayPalButton.propTypes = {
  className: PropTypes.string.isRequired,
};

export default PayPalButton;
