import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitSmsSignup, clearForm } from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

export const EmailSignupWrapperContainer = ({
  verifyEmailAddress,
  buttonConfig,
  submitEmailSubscription,
  formViewConfig,
  isSubscriptionValid,
  clearFormStoreInfo,
  subscriptionType,
  submitSmsSubscription,
}) => {
  return (
    <SignupModalView
      buttonConfig={buttonConfig}
      formViewConfig={formViewConfig}
      verifyEmailAddress={verifyEmailAddress}
      submitEmailSubscription={submitEmailSubscription}
      isSubscriptionValid={isSubscriptionValid}
      clearForm={clearFormStoreInfo}
      submitSmsSubscription={submitSmsSubscription}
      subscriptionType={subscriptionType}
    />
  );
};

EmailSignupWrapperContainer.propTypes = {
  verifyEmailAddress: PropTypes.func,
  submitEmailSubscription: PropTypes.func,
  buttonConfig: PropTypes.shape({}),
  formViewConfig: PropTypes.shape({}),
  isSubscriptionValid: PropTypes.bool,
  clearFormStoreInfo: PropTypes.func,
  subscriptionType: PropTypes.string.isRequired,
  submitSmsSubscription: PropTypes.func,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  isSubscriptionValid: false,
  clearFormStoreInfo: () => {},
  submitSmsSubscription: () => {},
};

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      console.log('signup sms func');
      dispatch(submitSmsSignup(payload));
    },
    clearFormStoreInfo: () => {
      console.log('clearForm');
      dispatch(clearForm());
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  let subscriptionType;
  if (props.buttonConfig.url === '/EMAIL_SIGNUP_MODAL') {
    formViewConfig = {
      ...state.labels.global.subscribeEmail,
    };
    subscriptionType = 'email';
  }
  if (props.buttonConfig.url === '/SMS_SIGNUP_MODAL') {
    formViewConfig = {
      ...state.labels.global.subscribeSms,
    };
    subscriptionType = 'sms';
  }
  return {
    subscriptionType,
    formViewConfig,
    isSubscriptionValid: state.SmsSignUp && state.SmsSignUp.signupSuccess,
    isEmailValid: state.SmsSignUp && state.SmsSignUp.validEmail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
