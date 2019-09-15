import React, { Component } from 'react';
import { string, func, bool, shape, oneOf, arrayOf } from 'prop-types';
import { client, venmo, dataCollector } from 'braintree-web';
import { getIconPath } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import logger from '@tcp/core/src/utils/loggerInstance';
import { noop, modes, constants } from '../container/VenmoPaymentButton.util';
import styles from '../styles/VenmoPaymentButton.style';

let venmoInstance = null;

export class VenmoPaymentButton extends Component {
  constructor(props) {
    super(props);
    this.venmoButtonRef = null;
    this.state = {
      hasVenmoError: true,
    };
  }

  canCallVenmoApi = () => {
    const { authorizationKey, mode, enabled } = this.props;
    return enabled && authorizationKey && mode === modes.CLIENT_TOKEN;
  };

  setVenmoButtonRef = target => {
    this.venmoButtonRef = target;
  };

  fetchVenmoNonce = () => {
    const { setVenmoData } = this.props;
    // we must check to verify that remembered users are authenticated and OOS are not in bag
    return venmoInstance
      .tokenize()
      .then(this.handleVenmoSuccess)
      .catch(this.handleVenmoError)
      .finally(() => setVenmoData({ loading: false }));
  };

  // Logic will go here for in some cases, we may not want to display an error message
  handleVenmoClickedError = e => logger.error('Venmo', 'Promises Error', e);

  handleVenmoInstanceError = err => {
    const { hasVenmoError } = this.state;
    if (!hasVenmoError) {
      this.setState({ hasVenmoError: true });
    }
    this.handleVenmoClickedError(err);
  };

  handleVenmoClick = e => {
    const {
      setVenmoData,
      onVenmoPaymentButtonClick,
      mode,
      isNonceNotExpired,
      setVenmoPaymentInProgress,
    } = this.props;
    setVenmoData({ loading: true, error: null });
    setVenmoPaymentInProgress(true);
    if (venmoInstance && this.canCallVenmoApi()) {
      this.venmoButtonRef.disable = true;
      this.fetchVenmoNonce();
      this.venmoButtonRef.disable = false;
    } else {
      onVenmoPaymentButtonClick(mode, e);
      setVenmoData({ loading: false });
    }
  };

  handleVenmoSuccess = payload => {
    const { setVenmoData, mode, onVenmoPaymentButtonClick } = this.props;
    const successData = { ...payload, error: null, timestamp: Date.now() };
    setVenmoData(successData);
    onVenmoPaymentButtonClick(mode);
  };

  handleVenmoError = ({ code, message, name }) => {
    const { setVenmoData, onVenmoPaymentButtonError } = this.props;
    const errorData = { nonce: '', error: { code, message, name } };
    if (code !== constants.VENMO_CANCELED) {
      setVenmoData(errorData);
      onVenmoPaymentButtonError(errorData);
      // Suppress error message
    }
  };

  componentDidUpdate = prevProps => {
    const { mode, authorizationKey, isNonceNotExpired } = this.props;
    if (
      mode === modes.CLIENT_TOKEN &&
      (prevProps.authorizationKey !== authorizationKey ||
        prevProps.isNonceNotExpired !== isNonceNotExpired)
    ) {
      this.setupVenmoInstance(); // New client key
    }
  };

  componentDidMount = () => {
    const {
      mode,
      authorizationKey,
      isMobile,
      enabled,
      venmoData: { nonce },
      setVenmoData,
      isNonceNotExpired,
    } = this.props;
    if (!isMobile) return; // Do not process requests if not mobile.
    if (nonce && isNonceNotExpired) {
      this.setState({ hasVenmoError: false });
      setVenmoData({ loading: false });
      return;
    } // TODO: We must defer this to prevent button from displaying.
    if (mode === modes.CLIENT_TOKEN && enabled) {
      if (authorizationKey) {
        this.setupVenmoInstance();
      }
    }
  };

  setupVenmoInstance = () => {
    const {
      authorizationKey: authorization,
      setVenmoData,
      allowNewBrowserTab,
      isMobile,
    } = this.props;
    if (!isMobile) return; // Do not process requests if not mobile.
    if (this.canCallVenmoApi()) {
      setVenmoData({ loading: true });
      client
        .create({ authorization })
        .then(client => {
          return Promise.all([
            venmo.create({
              client,
              allowNewBrowserTab,
            }),
            dataCollector.create({
              client,
              paypal: true,
            }),
          ])
            .then(([venmoInstanceRef, dataCollectorInstanceRef]) => {
              venmoInstance = venmoInstanceRef;
              if (venmoInstance.isBrowserSupported()) {
                const { deviceData } = dataCollectorInstanceRef;
                if (deviceData) {
                  const deviceDataValue = JSON.parse(deviceData);
                  setVenmoData({
                    deviceData: deviceDataValue.correlation_id,
                    supportedByBrowser: true,
                  });
                  this.setState({ hasVenmoError: false });
                }
              } else {
                logger.error('Opening Venmo in the same tab is not supported by this browser');
                setVenmoData({ supportedByBrowser: false });
              }
            })
            .catch(err => this.handleVenmoInstanceError(err))
            .finally(() => {
              setVenmoData({ loading: false });
            });
        })
        .catch(err => this.handleVenmoInstanceError(err))
        .finally(() => {
          setVenmoData({ loading: false });
        });
    }
  };

  render() {
    const { isMobile, venmoData, mode, enabled, className } = this.props;
    const { hasVenmoError } = this.state;
    const { supportedByBrowser } = venmoData || {};
    const venmoIcon = getIconPath('venmo-button');
    return (
      <div className={className}>
        <button
          type="button"
          onClick={this.handleVenmoClick}
          ref={this.setVenmoButtonRef}
          className="venmo-button"
          aria-label="Venmo Payment Button"
        >
          <img src={venmoIcon} alt="Venmo Payment Button" />
        </button>
      </div>
    );
  }
}

VenmoPaymentButton.propTypes = {
  enabled: bool,
  authorizationKey: string,
  mode: oneOf([modes.CLIENT_TOKEN, modes.PAYMENT_TOKEN]),
  setVenmoData: func,
  allowNewBrowserTab: bool,
  isMobile: bool,
  venmoData: shape({
    deviceData: string,
    supportedByBrowser: bool,
    loading: bool,
    details: shape({
      username: string,
    }),
    nonce: string,
    type: string,
    error: shape({
      code: string,
      message: string,
      name: string,
    }),
  }),
  onVenmoPaymentButtonClick: func,
  onVenmoPaymentButtonError: func,
  setVenmoPaymentInProgress: func,
  isNonceNotExpired: bool,
};

VenmoPaymentButton.defaultProps = {
  enabled: false,
  authorizationKey: '',
  setVenmoData: noop,
  allowNewBrowserTab: false,
  isMobile: false,
  venmoData: {
    supportedByBrowser: true,
  },
  mode: modes.CLIENT_TOKEN,
  onVenmoPaymentButtonClick: noop,
  onVenmoPaymentButtonError: noop,
  setVenmoPaymentInProgress: noop,
  isNonceNotExpired: true,
};

export default withStyles(VenmoPaymentButton, styles);
export { VenmoPaymentButton as VenmoPaymentButtonVanilla };
