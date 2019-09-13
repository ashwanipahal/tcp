import React from 'react';
import PropTypes from 'prop-types';
import { requireNamedOnlineModule } from '../../../../../utils/resourceLoader';
import { getLocator } from '../../../../../utils';
// import { getPaypalPaymentSettings } from '../../../../features/CnC/Checkout/container/Checkout.selector';

class PayPalButton extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    window.paypal
      ? setTimeout(this.renderPayPalButton)
      : requireNamedOnlineModule('paypal').then(this.renderPayPalButton);
  }

  initializePayPalButton = ({ containerId }) => {
    const { locale, style } = this.props;
    const options = {
      locale,
      style,
      funding: {
        disallowed: [],
      },
      env: 'sandbox',
      payment: () => {
        return '';
      },
      onAuthorize: () => {
        // const {
        //   tcpOrderId,
        //   centinelRequestPage,
        //   centinelPayload,
        //   centinelOrderId,
        // } = getPaypalPaymentSettings(this.store.getState());
        // return this.vendorServiceAbstractors
        //   .paypalAuthorization(tcpOrderId, centinelRequestPage, centinelPayload, centinelOrderId)
        //   .then(() => {
        //     getRoutingOperator(this.store).gotoPage(
        //       PAGES.checkout,
        //       { queryValues: { [PAYPAL_REDIRECT_PARAM]: 'true' } },
        //       true
        //     );
        //   })
        //   .catch(err => {
        //     getRoutingOperator(this.store).gotoPage(
        //       PAGES.cart,
        //       { queryValues: { error: err.errorCodes } },
        //       true
        //     );
        //   });
      },
      // onCancel: this.clearPaypalSettings,
      onError: () => {
        throw new Error();
      },
    };

    window.paypal.Button.render(options, `#${containerId}`);
  };

  renderPayPalButton = () => {
    const { containerId } = this.props;
    const element = document.querySelector(`#${containerId}`);
    if (element && !element.hasChildNodes()) {
      this.initializePayPalButton({
        containerId,
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
  locale: 'en_US',
  style: {
    size: 'responsive',
    color: 'blue',
    shape: 'rect',
    label: 'paypal',
    tagline: false,
    height: 48,
  },
};

PayPalButton.propTypes = {
  className: PropTypes.string.isRequired,
  locale: PropTypes.string,
  style: PropTypes.shape,
  containerId: PropTypes.string,
};

export default PayPalButton;
