import React, { Component } from 'react';
import { string, func, bool, shape, oneOf, arrayOf } from 'prop-types';
import { client, venmo, dataCollector } from 'braintree-web';
import { noop, runPromisesInSerial } from '../container/VenmoPaymentButton.util';
import styles from '../styles/VenmoPaymentButton.style';

let venmoInstance = null; // Live past the React component lifecycle.

/**
 * Direct integration with the Brain Tree JavaScriptV3 SDK to display a Venmo button.
 */
export class VenmoPaymentButton extends Component {
  static modes = {
    CLIENT_TOKEN: 'client_token',
    PAYMENT_TOKEN: 'payment_token',
  };

  static propTypes = {
    /**
     * Powered by the VenmoDirectIntegration kill switch
     */
    enabled: bool,
    /**
     * The authorization key required to authenticate with Venmo app
     */
    authorizationKey: string,

    /**
     * When in client token mode, authenticate against Venmo Mobile app
     * When in payment token mode, mule has saved a previous token.
     */
    mode: oneOf([VenmoPaymentButton.modes.CLIENT_TOKEN, VenmoPaymentButton.modes.PAYMENT_TOKEN]),

    /**
     * Set venmo data from Brain Tree JavaScript v3 SDK
     */
    setVenmoData: func,

    /**
     * When true, will open Venmo mobile authentication in a new browser tab.
     * When false,, remain in current tab which is not supported by many browsers
     */
    allowNewBrowserTab: bool,

    /**
     * Is mobile mode
     */
    mobile: bool,

    /**
     * Venmo data object
     */
    venmoData: shape({
      /**
       * Unique data per device
       */
      deviceData: string,

      /**
       * Do not enable Venmo button if device does not supported for opening Venmo in same tab.
       */
      supportedByBrowser: bool,

      /**
       * Indicates that TCP is fetching data via the Brain Tree SDK
       */
      loading: bool,

      /**
       * Details object returned right after tokenization
       */
      details: shape({
        /**
         * Authenticated username
         */
        username: string,
      }),

      /**
       * The nonce token returned immediately after Venmo mobile authentication
       */
      nonce: string,

      /**
       * Type of brain tree account
       */
      type: string,

      /**
       * Venmo error from Venmo App
       */
      error: shape({
        code: string,
        message: string,
        name: string,
      }),
    }),

    /**
     * An array of promises to call before authenticating with Venmo
     */
    prePromises: arrayOf(shape({})),

    /**
     * Called with Venmo button is clicked.
     */
    onVenmoPaymentButtonClick: func,

    /**
     * Called if Venmo authentication returns an error.
     */
    onVenmoPaymentButtonError: func,

    /**
     * Called after successful Venmo authentication.
     */
    setVenmoPaymentInProgress: func,

    /**
     * Indicates the Nonce is expired.
     */
    isNonceNotExpired: bool,
  };

  static defaultProps = {
    enabled: false,
    authorizationKey: '',
    setVenmoData: noop,
    allowNewBrowserTab: false,
    mobile: false,
    venmoData: {
      supportedByBrowser: true,
    },
    mode: VenmoPaymentButton.modes.CLIENT_TOKEN,
    prePromises: [Promise.resolve],
    onVenmoPaymentButtonClick: noop,
    onVenmoPaymentButtonError: noop,
    setVenmoPaymentInProgress: noop,
    isNonceNotExpired: true,
  };

  constructor(props) {
    super(props);
    this.venmoButtonRef = null;
    this.state = {
      hasVenmoError: true,
    };
  }

  canCallVenmoApi = () => {
    const { authorizationKey, mode, enabled } = this.props;
    return enabled && authorizationKey && mode === VenmoPaymentButton.modes.CLIENT_TOKEN;
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
  handleVenmoClickedError = e => console.error('Venmo', 'Promises Error', e);

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
      prePromises,
      mode,
      isNonceNotExpired,
      setVenmoPaymentInProgress,
    } = this.props;
    setVenmoData({ loading: true, error: null });
    setVenmoPaymentInProgress(true);
    if (venmoInstance && !isNonceNotExpired && this.canCallVenmoApi()) {
      this.venmoButtonRef.disable = true;
      runPromisesInSerial(prePromises)
        .then(this.fetchVenmoNonce)
        .catch(this.handleVenmoClickedError)
        .finally(() => {
          setVenmoData({ loading: false });
          this.venmoButtonRef.disable = false;
        });
    } else {
      runPromisesInSerial(prePromises)
        .then(() => onVenmoPaymentButtonClick(mode, e))
        .catch(this.handleVenmoClickedError)
        .finally(() => {
          setVenmoData({ loading: false });
          if (this.venmoButtonRef) this.venmoButtonRef.disable = false;
        });
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
    // DTN-4609-suppressing error when user cancels
    if (code !== 'VENMO_CANCELED') {
      setVenmoData(errorData);
      onVenmoPaymentButtonError(errorData);
      // Suppress error message
    }
  };

  componentDidUpdate = prevProps => {
    const { mode, authorizationKey, isNonceNotExpired } = this.props;
    if (
      mode === VenmoPaymentButton.modes.CLIENT_TOKEN &&
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
      mobile,
      enabled,
      venmoData: { nonce },
      setVenmoData,
      isNonceNotExpired,
    } = this.props;
    if (!mobile) return; // Do not process requests if not mobile.
    if (nonce && isNonceNotExpired) {
      this.setState({ hasVenmoError: false });
      setVenmoData({ loading: false });
      return;
    } // TODO: We must defer this to prevent button from displaying.
    if (mode === VenmoPaymentButton.modes.CLIENT_TOKEN && enabled) {
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
      mobile,
    } = this.props;
    if (!mobile) return; // Do not process requests if not mobile.
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
                console.error('Opening Venmo in the same tab is not supported by this browser');
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

  render = () => {
    const { mobile, venmoData, mode, enabled } = this.props;
    const { hasVenmoError } = this.state;
    const { supportedByBrowser } = venmoData || {};
    return (
      enabled &&
      mobile &&
      supportedByBrowser &&
      (!hasVenmoError || mode === VenmoPaymentButton.modes.PAYMENT_TOKEN) &&
      // Do not show button if there's no authorization key when in client token mode
      (this.canCallVenmoApi() ||
        // Show button, but do not call Venmo api.
        mode === VenmoPaymentButton.modes.PAYMENT_TOKEN) && (
        <button
          type="button"
          onClick={this.handleVenmoClick}
          ref={this.setVenmoButtonRef}
          aria-label="Venmo Payment Button"
        >
          Venmo
        </button>
      )
    );
  };
}

export default VenmoPaymentButton;
