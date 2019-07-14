import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitSmsSignup, clearSmsSignupForm } from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

export const EmailSignupWrapperContainer = ({
  buttonConfig,
  formViewConfig,
  isSubscriptionValid,
  clearFormStoreInfo,
  submitSmsSubscription,
}) => {
  return (
    <SignupModalView
      buttonConfig={buttonConfig}
      formViewConfig={formViewConfig}
      isSubscriptionValid={isSubscriptionValid}
      clearSmsSignupForm={clearFormStoreInfo}
      submitSmsSubscription={submitSmsSubscription}
    />
  );
};

EmailSignupWrapperContainer.propTypes = {
  buttonConfig: PropTypes.shape({}),
  formViewConfig: PropTypes.shape({}),
  isSubscriptionValid: PropTypes.bool,
  clearFormStoreInfo: PropTypes.func,
  submitSmsSubscription: PropTypes.func.isRequired,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  isSubscriptionValid: false,
  clearFormStoreInfo: () => {},
};

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearFormStoreInfo: () => {
      dispatch(clearSmsSignupForm());
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig.url === '/SMS_SIGNUP_MODAL') {
    formViewConfig = {
      ...state.Labels.global.smsSignup,
    };
  }
  return {
    formViewConfig,
    isSubscriptionValid: state.SmsSignUp && state.SmsSignUp.signupSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
