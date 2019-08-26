import { connect } from 'react-redux';

import emailSignupAbstractor from '@tcp/core/src/services/abstractors/common/EmailSmsSignup';

import {
  submitEmailSignup,
  validateEmail,
  clearEmailSignupForm,
  toggleEmailSignupModal,
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
      dispatch(toggleEmailSignupModal({ isModalOpen: false }));
    },
    /* Validate function for redux-form */
    asyncValidate: (values, reduxFormDispatch, props) => {
      const {
        formViewConfig: { validationErrorLabel },
      } = props;

      return values.signup
        ? emailSignupAbstractor.verifyEmail(values.signup).then(result => {
            if (result.error) {
              const error = { signup: validationErrorLabel };
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject({ ...error, _error: error });
            }

            return result;
          })
        : Promise.resolve();
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig.link.action === 'open_signup_modal') {
    formViewConfig = {
      ...state.Labels.global.emailSignup,
    };
  }
  const { EmailSignUp = {} } = state;
  return {
    formViewConfig,
    subscription: EmailSignUp.subscription,
    isEmailValid: EmailSignUp.isEmailValid,
    isModalOpen: EmailSignUp.isModalOpen,
    ...props,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
