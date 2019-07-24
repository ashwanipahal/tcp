import { connect } from 'react-redux';

import { submitSmsSignup, clearSmsSignupForm } from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearSmsSignupForm: () => {
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
)(SignupModalView);
