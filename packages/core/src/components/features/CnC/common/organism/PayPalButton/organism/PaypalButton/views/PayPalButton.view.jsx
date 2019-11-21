import React from 'react';
import PropTypes from 'prop-types';
import { isClient } from '@tcp/core/src/utils';
import { requireNamedOnlineModule } from '../../../../../../../../../utils/resourceLoader';
import ErrorMessage from '../../../../../molecules/ErrorMessage';
import { getLocator } from '../../../../../../../../../utils';
import errorBoundary from '../../../../../../../../common/hoc/withErrorBoundary';

class PayPalButton extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    if (window.paypal) {
      setTimeout(this.renderPayPalButton);
    } else if (isClient() && !window.isPaypalCalled) {
      requireNamedOnlineModule('paypal').then(this.renderPayPalButton);
      window.isPaypalCalled = true;
    }
  }

  renderPayPalButton = () => {
    const { containerId, height, initalizePayPalButton, isQualifedOrder, paypalEnv } = this.props;
    const element = document.querySelector(`#${containerId}`);
    if (element && !element.hasChildNodes()) {
      initalizePayPalButton({
        containerId,
        height,
        isQualifedOrder,
        paypalEnv,
      });
    }
  };

  render() {
    const { className, error, isAddToBagModal, containerId } = this.props;
    return (
      <div>
        {error && !isAddToBagModal && <ErrorMessage error={error} />}
        {error && isAddToBagModal && <ErrorMessage error={error} />}
        <div
          data-locator={getLocator('addedtobag_btnpaypal')}
          className={className}
          id={containerId}
        />
      </div>
    );
  }
}

PayPalButton.defaultProps = {
  containerId: 'paypal-button-container',
  height: 48,
  error: '',
  isAddToBagModal: false,
};

PayPalButton.propTypes = {
  className: PropTypes.string.isRequired,
  error: PropTypes.string,
  containerId: PropTypes.string,
  height: PropTypes.number,
  initalizePayPalButton: PropTypes.func.isRequired,
  isQualifedOrder: PropTypes.bool.isRequired,
  isAddToBagModal: PropTypes.bool,
  paypalEnv: PropTypes.string.isRequired,
};

export default errorBoundary(PayPalButton);
