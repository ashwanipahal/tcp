import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/BillingPayPalButton.style';
import withStyles from '../../../../../../common/hoc/withStyles';
import PayPalButton from '../../../../common/organism/PayPalButton';
import { BodyCopy } from '../../../../../../common/atoms';

export class BillingPayPalButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    labels: PropTypes.shape({}).isRequired,
    containerId: PropTypes.string.isRequired,
  };

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const { className, labels, containerId } = this.props;

    return (
      <div className={className}>
        <div className="payment-paypal-container hide-on-desktop hide-on-tablet">
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs16"
            fontWeight="extrabold"
            dataLocator="completePurchaseLblÎ"
            className="paypal-complete-purchase"
          >
            {labels.continueWithPayPal}
          </BodyCopy>
          <PayPalButton className="billing-payPal-button" containerId={containerId} isBillingPage />
        </div>
      </div>
    );
  }
}

export default withStyles(BillingPayPalButton, styles);
export { BillingPayPalButton as BillingPayPalButtonVanilla };
