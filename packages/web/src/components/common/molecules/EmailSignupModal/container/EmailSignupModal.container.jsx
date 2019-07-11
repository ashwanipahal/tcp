import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitEmailSignup, validateEmail, clearForm } from './EmailSignupModal.actions';
import SignupModalView from '../views/EmailSignupModal.view';

export const EmailSignupWrapperContainer = ({
  verifyEmailAddress,
  buttonConfig,
  submitEmailSubscription,
  formViewConfig,
  isSubscriptionValid,
  clearFormStoreInfo,
  subscriptionType,
  isEmailValid,
}) => {
  return (
    <SignupModalView
      buttonConfig={buttonConfig}
      formViewConfig={formViewConfig}
      verifyEmailAddress={verifyEmailAddress}
      submitEmailSubscription={submitEmailSubscription}
      isSubscriptionValid={isSubscriptionValid}
      clearForm={clearFormStoreInfo}
      subscriptionType={subscriptionType}
      isEmailValid={isEmailValid}
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
  isEmailValid: PropTypes.bool,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  isSubscriptionValid: false,
  clearFormStoreInfo: () => {},
  isEmailValid: false,
};

export const mapDispatchToProps = dispatch => {
  return {
    verifyEmailAddress: payload => {
      console.log('verifyEmailAddress');
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      console.log('signup email func');
      dispatch(submitEmailSignup(payload));
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
    isSubscriptionValid: state.EmailSignUp && state.EmailSignUp.signupSuccess,
    isEmailValid: state.EmailSignUp && state.EmailSignUp.validEmail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
