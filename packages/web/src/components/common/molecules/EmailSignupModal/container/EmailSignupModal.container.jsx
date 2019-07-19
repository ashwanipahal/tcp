import { connect } from 'react-redux';

import {
  submitEmailSignup,
  validateEmail,
  clearEmailSignupForm,
  togglerEmailSignupModal,
} from './EmailSignupModal.actions';
import SignupModalView from '../views/EmailSignupModal.view';

export const mapDispatchToProps = dispatch => {
  return {
    verifyEmailAddress: payload => {
      dispatch(validateEmail(payload));
    },
    submitEmailSubscription: payload => {
      dispatch(submitEmailSignup(payload));
    },
    clearEmailSignupForm: () => {
      dispatch(clearEmailSignupForm());
    },
    closeModal: () => {
      dispatch(togglerEmailSignupModal({ isModalOpen: false }));
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
  const { EmailSignUp = {} } = state;
  return {
    formViewConfig,
    isSubscriptionValid: EmailSignUp.signupSuccess,
    isEmailValid: EmailSignUp.validEmail,
    isModalOpen: EmailSignUp.isModalOpen,
    ...props,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
