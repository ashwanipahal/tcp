import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  submitEmailSignup,
  validateEmail,
  submitSmsSignup,
  clearForm,
} from './SignupModal.actions';
import SignupModalView from '../views/SignupModal.view';

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
    verifyEmailAddress: payload => {
      console.log('verifyEmailAddress');
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      console.log('signup email func');
      dispatch(submitEmailSignup(payload));
    },
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
    isSubscriptionValid: state.SignUp && state.SignUp.signupSuccess,
    isEmailValid: state.SignUp && state.SignUp.validEmail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
