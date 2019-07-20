import { connect } from 'react-redux';

import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';

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
    /* Validate function for redux-form */
    asyncValidate: (values, f, state) => {
      const {
        formViewConfig: { validationErrorLabel },
      } = state;

      return values.signup
        ? emailSignupAbstractor.verifyEmail(values.signup).then(isValid => {
            if (!isValid) {
              const error = { signup: validationErrorLabel };
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({ ...error, _error: error });
            }

            return isValid;
          })
        : Promise.resolve({ awesome: 'awesome' });
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
    isEmailValid: EmailSignUp.isEmailValid,
    isModalOpen: EmailSignUp.isModalOpen,

    ...props,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
