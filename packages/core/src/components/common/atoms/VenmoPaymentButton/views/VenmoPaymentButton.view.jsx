import React, { Component } from 'react';
import { string, func, bool, shape, oneOf, arrayOf } from 'prop-types';
import { client, venmo, dataCollector } from 'braintree-web';
import { getIconPath } from '@tcp/core/src/utils/utils';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { noop, runPromisesInSerial, modes } from '../container/VenmoPaymentButton.util';
import styles from '../styles/VenmoPaymentButton.style';

let venmoInstance = null; // Live past the React component lifecycle.

export class VenmoPaymentButton extends Component {
  static propTypes = {
    enabled: bool,

    authorizationKey: string,

    mode: oneOf([modes.CLIENT_TOKEN, modes.PAYMENT_TOKEN]),

    setVenmoData: func,

    allowNewBrowserTab: bool,

    mobile: bool,

    venmoData: shape({
      deviceData: string,

      /**
       * Do not enable Venmo button if device does not supported for opening Venmo in same tab.
       */
      supportedByBrowser: bool,

      /**
       * Indicates that TCP is fetching data via the Brain Tree SDK
       */
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
    prePromises: arrayOf(shape({})),
    onVenmoPaymentButtonClick: func,
    onVenmoPaymentButtonError: func,
    setVenmoPaymentInProgress: func,
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
    mode: modes.CLIENT_TOKEN,
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
  handleVenmoClickedError = e => console.error('Venmo', 'Promises Error', e);

  handleVenmoInstanceError = err => {
    debugger;
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
    debugger;
    setVenmoData({ loading: true, error: null });
    // setVenmoPaymentInProgress(true);
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
    debugger;
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
              debugger;
              if (venmoInstance.isBrowserSupported() || true) {
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

  render() {
    const { mobile, venmoData, mode, enabled, className } = this.props;
    const { hasVenmoError } = this.state;
    const { supportedByBrowser } = venmoData || {};
    const venmoIcon = getIconPath('venmo-button');
    return (
      <div className={className}>
        <button
          type="button"
          onClick={this.handleVenmoClick}
          ref={this.setVenmoButtonRef}
          className="VenmoPaymentButton"
          aria-label="Venmo Payment Button"
        >
          <img src={venmoIcon} alt="Venmo Payment Button" />
        </button>
      </div>
    );
  }
}

export default withStyles(VenmoPaymentButton, styles);
export { VenmoPaymentButton as VenmoPaymentButtonVanilla };
