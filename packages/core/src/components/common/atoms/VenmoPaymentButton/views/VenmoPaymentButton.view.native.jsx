import React, { Component } from 'react';
import { View, NativeModules } from 'react-native';
import { string, func, bool, shape, oneOf } from 'prop-types';
import Image from '../../Image/views/Image';
import { modes, constants, VENMO_USER_STATES } from '../container/VenmoPaymentButton.util';
import VenmoButton from '../styles/VenmoPaymentButton.style.native';
import { isAndroid } from '../../../../../utils/index.native';

const venmoIconBlue = require('../../../../../assets/venmo_logo_blue.png');
const venmoIconWhite = require('../../../../../assets/venmo_logo_white.png');

export class VenmoPaymentButton extends Component {
  /**
   * @function fetchVenmoClientToken
   * @description Fetch venmo token details from the backend api. This is used to create instance of venmo and for authorization
   */
  fetchVenmoClientToken = () => {
    const { isGuest, orderId, enabled, isNonceNotExpired, getVenmoPaymentTokenAction } = this.props;
    if (enabled && !isNonceNotExpired) {
      const userState = isGuest ? VENMO_USER_STATES.GUEST : VENMO_USER_STATES.REGISTERED;
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

  handleVenmoClick = () => {
    const {
      setVenmoData,
      onVenmoPaymentButtonClick,
      mode,
      setVenmoPaymentInProgress,
      isRemoveOOSItems,
      isNonceNotExpired,
    } = this.props;
    setVenmoData({ loading: true, error: null });
    setVenmoPaymentInProgress(true);
    // Condition for OOS items in the bag, modal will open and proceed with regular checkout on continue cta trigger
    if (isRemoveOOSItems) {
      onVenmoPaymentButtonClick(mode);
      setVenmoData({ loading: false });
    }
    // Cache of 3 hours on venmo authorization, no need to authorize again
    if (!isNonceNotExpired && this.canCallVenmoApi()) {
      if (isAndroid()) {
        this.authorizeVenmoPaymentApp();
      } else {
        this.authorizeVenmoPaymentIOSApp();
      }
    } else {
      // Nonce is already there in the cache, proceed with the callback.
      onVenmoPaymentButtonClick(mode);
      setVenmoData({ loading: false });
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
    }
  };

  componentDidUpdate = prevProps => {
    const { mode, authorizationKey, isNonceNotExpired, isGuest } = this.props;
    if (prevProps.isGuest !== isGuest) {
      // Condition for bag page reload on registered user, and user logging in from bag page
      this.fetchVenmoClientToken();
    }
    if (
      authorizationKey &&
      mode === modes.CLIENT_TOKEN &&
      (prevProps.authorizationKey !== authorizationKey ||
        prevProps.isNonceNotExpired !== isNonceNotExpired)
    ) {
      NativeModules.VenmoPayment.initialize(authorizationKey);
    }
  };

  componentDidMount = () => {
    const {
      venmoData: { nonce },
      setVenmoData,
      isNonceNotExpired,
      authorizationKey,
    } = this.props;
    this.fetchVenmoClientToken();
    if (nonce && isNonceNotExpired) {
      setVenmoData({ loading: false });
    } else if (this.canCallVenmoApi()) {
      NativeModules.VenmoPayment.initialize(authorizationKey);
    }
  };

  /**
   * @description - Android - This method is called on Venmo payment button click
   */
  authorizeVenmoPaymentApp = () => {
    NativeModules.VenmoPayment.authorizeVenmoAccount(
      errorMessage => {
        this.handleVenmoError({ message: errorMessage });
      },
      successMessage => {
        if (successMessage) {
          this.handleVenmoSuccess(JSON.parse(successMessage));
        }
      }
    );
  };

  /**
   * @description - iOS - This method is called on Venmo payment button click, iOS Venmo Initialization and authorization
   */
  authorizeVenmoPaymentIOSApp = () => {
    NativeModules.VenmoPayment.authorizeVenmoAccount((val, error) => {
      if (val && val.nonce) {
        const venmoRespone = { details: { username: val.username }, ...val };
        this.handleVenmoSuccess(venmoRespone);
      } else {
        this.handleVenmoError({ message: error });
      }
    });
  };

  /**
   * @description - condition to display Venmo CTA
   */
  displayVenmoButton = () => {
    const { mode, enabled } = this.props;
    return enabled && (this.canCallVenmoApi() || mode === modes.PAYMENT_TOKEN);
  };

  render() {
    const { isVenmoBlueButton } = this.props;
    const venmoIcon = isVenmoBlueButton ? venmoIconWhite : venmoIconBlue;
    return (
      <View>
        {this.displayVenmoButton() && (
          <VenmoButton
            accessibilityRole="button"
            onPress={this.handleVenmoClick}
            isVenmoBlue={isVenmoBlueButton}
          >
            <Image source={venmoIcon} alt="Venmo" width="80px" height="15px" />
          </VenmoButton>
        )}
      </View>
    );
  }
}

VenmoPaymentButton.propTypes = {
  enabled: bool,
  authorizationKey: string,
  mode: oneOf([modes.CLIENT_TOKEN, modes.PAYMENT_TOKEN]),
  setVenmoData: func,
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
  isGuest: bool.isRequired,
  orderId: string.isRequired,
  isVenmoBlueButton: bool,
};

VenmoPaymentButton.defaultProps = {
  enabled: false,
  authorizationKey: '',
  setVenmoData: () => {},
  venmoData: {
    supportedByBrowser: false,
  },
  mode: modes.CLIENT_TOKEN,
  onVenmoPaymentButtonClick: () => {},
  onVenmoPaymentButtonError: () => {},
  setVenmoPaymentInProgress: () => {},
  isNonceNotExpired: false,
  isRemoveOOSItems: false,
  isVenmoBlueButton: false,
};

export default VenmoPaymentButton;
