import React, { Component } from 'react';
import { string, func, bool, shape, oneOf } from 'prop-types';
import { client, venmo, dataCollector } from 'braintree-web';
import Image from '../../Image/views/Image';
import { getIconPath } from '../../../../../utils/utils';
import withStyles from '../../../hoc/withStyles';
import logger from '../../../../../utils/loggerInstance';
import { modes, constants, VENMO_USER_STATES } from '../container/VenmoPaymentButton.util';
import styles from '../styles/VenmoPaymentButton.style';
import BodyCopy from '../../BodyCopy';

let venmoInstance = null;

export class VenmoPaymentButton extends Component {
  constructor(props) {
    super(props);
    this.venmoButtonRef = null;
    this.state = {
      hasVenmoError: true,
    };
  }

  componentWillMount() {
    this.fetchVenmoClientToken();
  }

  /**
   * @function fetchVenmoClientToken
   * @description Fetch venmo token details from the backend api. This is used to create instance of venmo and for authorization
   */
  fetchVenmoClientToken = () => {
    const { isGuest, orderId, enabled, isNonceNotExpired, getVenmoPaymentTokenAction } = this.props;
    if (enabled && !isNonceNotExpired) {
      let userState = '';
      if (isGuest) {
        userState = VENMO_USER_STATES.GUEST;
      } else {
        userState = VENMO_USER_STATES.REGISTERED;
      }
      getVenmoPaymentTokenAction({ userState, orderId });
    }
  };

  /**
   * This method is to validate if we can call the venmo client token api.
   */
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
    return (
      venmoInstance &&
      venmoInstance
        .tokenize()
        .then(this.handleVenmoSuccess)
        .catch(this.handleVenmoError)
        .finally(() => {
          setVenmoData({ loading: false });
          this.disableVenmoButton(false);
        })
    );
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
    e.preventDefault(); // Added to suppress extra click calls with multiple actions on same page
    const {
      setVenmoData,
      onVenmoPaymentButtonClick,
      mode,
      isNonceNotExpired,
      setVenmoPaymentInProgress,
      isRemoveOOSItems,
    } = this.props;
    // Condition for OOS items in the bag, modal will open and proceed with regular checkout on continue cta trigger
    if (isRemoveOOSItems) {
      onVenmoPaymentButtonClick(mode);
      setVenmoData({ loading: false });
      this.disableVenmoButton(false);
    }
    setVenmoData({ loading: true, error: null });
    setVenmoPaymentInProgress(true);
    if (venmoInstance && !isNonceNotExpired && this.canCallVenmoApi()) {
      this.venmoButtonRef.disable = true;
      this.fetchVenmoNonce();
    } else {
      onVenmoPaymentButtonClick(mode);
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
      enabled,
      venmoData: { nonce },
      setVenmoData,
      isNonceNotExpired,
    } = this.props;
    if (nonce && isNonceNotExpired) {
      this.setState({ hasVenmoError: false });
      setVenmoData({ loading: false });
    } else if (mode === modes.CLIENT_TOKEN && enabled && authorizationKey) {
      this.setupVenmoInstance();
    }
  };

  /**
   * This method with instantiate the venmo button to commence authorization of the venmo app
   */
  setupVenmoInstance = () => {
    const { authorizationKey: authorization, setVenmoData, allowNewBrowserTab } = this.props;
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
    const { venmoData, mode, enabled, className, continueWithText, isVenmoBlueButton } = this.props;
    const { hasVenmoError } = this.state;
    const { supportedByBrowser } = venmoData || {};
    const venmoIcon = isVenmoBlueButton
      ? getIconPath('venmo-button')
      : getIconPath('venmo-logo-blue');
    return (
      <div className={className}>
        {enabled &&
          supportedByBrowser &&
          (!hasVenmoError || mode === modes.PAYMENT_TOKEN) &&
          (this.canCallVenmoApi() || mode === modes.PAYMENT_TOKEN) && (
            <div>
              {continueWithText && (
                <BodyCopy
                  component="div"
                  fontSize="fs15"
                  fontWeight="semibold"
                  fontFamily="secondary"
                  className="venmo-continue-text"
                >
                  {continueWithText}
                </BodyCopy>
              )}
              <button
                onClick={this.handleVenmoClick}
                ref={this.setVenmoButtonRef}
                className="venmo-button"
                aria-label="Venmo Payment Button"
              >
                <Image src={venmoIcon} alt="Venmo Payment Button" className="venmo-button-image" />
              </button>
            </div>
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
  getVenmoPaymentTokenAction: func.isRequired,
  isNonceNotExpired: bool,
  isRemoveOOSItems: bool,
  continueWithText: string,
  isGuest: bool.isRequired,
  orderId: string.isRequired,
  isVenmoBlueButton: bool, // Venmo Blue Background CTA as per venmo guidelines
};

VenmoPaymentButton.defaultProps = {
  className: '',
  enabled: false,
  authorizationKey: '',
  setVenmoData: () => {},
  allowNewBrowserTab: false,
  venmoData: {
    supportedByBrowser: false,
  },
  mode: modes.CLIENT_TOKEN,
  onVenmoPaymentButtonClick: () => {},
  onVenmoPaymentButtonError: () => {},
  setVenmoPaymentInProgress: () => {},
  isNonceNotExpired: false,
  isRemoveOOSItems: false,
  continueWithText: '',
  isVenmoBlueButton: false,
};

export default withStyles(VenmoPaymentButton, styles);
export { VenmoPaymentButton as VenmoPaymentButtonVanilla };
