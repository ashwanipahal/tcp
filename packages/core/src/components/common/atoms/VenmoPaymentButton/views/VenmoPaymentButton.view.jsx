import React, { Component } from 'react';
import { string, func, bool, shape, oneOf } from 'prop-types';
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

  /**
   * Disable venmo cta when venmo is already initiated
   * @params {bool} flag - enable/disable venmo cta
   */
  disableVenmoButton = flag => {
    if (this.venmoButtonRef) {
      this.venmoButtonRef.disable = flag;
    }
  };

  /**
   * This method is to initiate a venmo app and fetch a nonce on successfull venmo app authorization
   */
  fetchVenmoNonce = () => {
    const { setVenmoData } = this.props;
    // we must check to verify that remembered users are authenticated and OOS are not in bag
    return venmoInstance
      .tokenize()
      .then(this.handleVenmoSuccess)
      .catch(this.handleVenmoError)
      .finally(() => {
        setVenmoData({ loading: false });
        this.disableVenmoButton(false);
      });
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
    if (venmoInstance && !isNonceNotExpired && this.canCallVenmoApi()) {
      this.venmoButtonRef.disable = true;
      this.fetchVenmoNonce();
    } else {
      onVenmoPaymentButtonClick(mode, e);
      setVenmoData({ loading: false });
      this.disableVenmoButton(false);
    }
  };

  /**
   * This callback method is called once venmo app authorization is successfull.
   * @param {object} payload - response from the venmo authorization interface.
   */
  handleVenmoSuccess = payload => {
    const { setVenmoData, mode, onVenmoPaymentButtonClick } = this.props;
    const successData = { ...payload, error: null, timestamp: Date.now() };
    setVenmoData(successData);
    onVenmoPaymentButtonClick(mode);
  };

  /**
   * This callback methos is called if we get any error or user is not authorized from the app.
   * @param {object} code - error code from the venmo plugin
   * @param {string} message - error message
   * @param {string} name - name of the venmo user tring to authenticate
   */
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
    if (isMobile && nonce && isNonceNotExpired) {
      this.setState({ hasVenmoError: false });
      setVenmoData({ loading: false });
    } else if (isMobile && mode === modes.CLIENT_TOKEN && enabled && authorizationKey) {
      this.setupVenmoInstance();
    }
  };

  /**
   * This method with instantiate the venmo button to commence authorization of the venmo app
   */
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
        .then(clientInstance => {
          return Promise.all([
            venmo.create({
              client: clientInstance,
              allowNewBrowserTab,
            }),
            dataCollector.create({
              client: clientInstance,
              paypal: true,
            }),
          ]);
        })
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
    }
  };

  render() {
    const { isMobile, venmoData, mode, enabled, className } = this.props;
    const { hasVenmoError } = this.state;
    const { supportedByBrowser } = venmoData || {};
    const venmoIcon = getIconPath('venmo-button');
    return (
      <div className={className}>
        {enabled &&
          isMobile &&
          supportedByBrowser &&
          (!hasVenmoError || mode === modes.PAYMENT_TOKEN) &&
          (this.canCallVenmoApi() || mode === modes.PAYMENT_TOKEN) && (
            <button
              type="button"
              onClick={this.handleVenmoClick}
              ref={this.setVenmoButtonRef}
              className="venmo-button"
              aria-label="Venmo Payment Button"
            >
              <img src={venmoIcon} alt="Venmo Payment Button" />
            </button>
          )}
      </div>
    );
  }
}

VenmoPaymentButton.propTypes = {
  className: string,
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
  className: '',
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
  isNonceNotExpired: false,
};

export default withStyles(VenmoPaymentButton, styles);
export { VenmoPaymentButton as VenmoPaymentButtonVanilla };
