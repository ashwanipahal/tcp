import React, { Component } from 'react';
import { View } from 'react-native';
import { string, func, bool, shape, oneOf } from 'prop-types';
import Image from '../../Image/views/Image';
import logger from '../../../../../utils/loggerInstance';
import { modes, constants, VENMO_USER_STATES } from '../container/VenmoPaymentButton.util';
import VenmoButton from '../styles/VenmoPaymentButton.style.native';

const venmoIconBlue = require('../../../../../assets/venmo_logo_blue.png');

export class VenmoPaymentButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasVenmoError: true,
    };
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

  // Logic will go here for in some cases, we may not want to display an error message
  handleVenmoClickedError = e => logger.error('Venmo', 'Promises Error', e);

  handleVenmoInstanceError = err => {
    const { hasVenmoError } = this.state;
    if (!hasVenmoError) {
      this.setState({ hasVenmoError: true });
    }
    this.handleVenmoClickedError(err);
  };

  handleVenmoClick = () => {
    const {
      setVenmoData,
      onVenmoPaymentButtonClick,
      mode,
      setVenmoPaymentInProgress,
      isRemoveOOSItems,
    } = this.props;
    // Condition for OOS items in the bag, modal will open and proceed with regular checkout on continue cta trigger
    if (isRemoveOOSItems) {
      onVenmoPaymentButtonClick(mode);
      setVenmoData({ loading: false });
    }
    setVenmoData({ loading: true, error: null });
    setVenmoPaymentInProgress(true);
    // Local Test Data without bridge, required for local development and testing
    this.handleVenmoSuccess({
      details: { username: 'gagandsb' },
      username: 'gagandsb',
      deviceData: '523d2ff2f87421afab351d7447afafab',
      error: null,
      nonce: 'fake-venmo-account-nonce',
      supportedByBrowser: true,
      timestamp: Date.now(),
      type: 'VenmoAccount',
    });
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
    const { isGuest } = this.props;
    if (prevProps.isGuest !== isGuest) {
      // Condition for bag page reload on registered user, and user logging in from bag page
      this.fetchVenmoClientToken();
    }
  };

  componentDidMount = () => {
    const {
      venmoData: { nonce },
      setVenmoData,
      isNonceNotExpired,
    } = this.props;
    if (nonce && isNonceNotExpired) {
      this.setState({ hasVenmoError: false });
      setVenmoData({ loading: false });
    }
    this.fetchVenmoClientToken();
  };

  render() {
    const { mode, enabled } = this.props;
    return (
      <View>
        {enabled && (this.canCallVenmoApi() || mode === modes.PAYMENT_TOKEN) && (
          <VenmoButton accessibilityRole="button" onPress={this.handleVenmoClick}>
            <Image source={venmoIconBlue} width="80px" height="15px" />
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
};

export default VenmoPaymentButton;
