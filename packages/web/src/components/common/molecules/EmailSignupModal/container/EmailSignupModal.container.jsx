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
  isEmailValid: PropTypes.bool,
};

EmailSignupWrapperContainer.defaultProps = {
  buttonConfig: {},
  formViewConfig: {},
  verifyEmailAddress: () => {},
  submitEmailSubscription: () => {},
  isSubscriptionValid: false,
  clearFormStoreInfo: () => {},
  isEmailValid: '',
};

export const mapDispatchToProps = dispatch => {
  return {
    verifyEmailAddress: payload => {
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
    clearFormStoreInfo: () => {
      dispatch(clearForm());
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig.url === '/EMAIL_SIGNUP_MODAL') {
    formViewConfig = {
      ...state.Labels.global.emailSignup,
    };
  }

  return {
    formViewConfig,
    isSubscriptionValid: state.EmailSignUp && state.EmailSignUp.signupSuccess,
    isEmailValid: state.EmailSignUp && state.EmailSignUp.validEmail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupWrapperContainer);
