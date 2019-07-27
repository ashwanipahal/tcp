import { connect } from 'react-redux';
import { validatePhoneNumber } from '@tcp/core/src/utils/formValidation/phoneNumber';

import {
  submitSmsSignup,
  clearSmsSignupForm,
  toggleSmsSignupModal,
} from './SmsSignupModal.actions';
import SignupModalView from '../views/SmsSignupModal.view';

export const mapDispatchToProps = dispatch => {
  return {
    submitSmsSubscription: payload => {
      dispatch(submitSmsSignup(payload));
    },
    clearSmsSignupForm: () => {
      dispatch(clearSmsSignupForm());
    },
    closeModal: () => {
      dispatch(toggleSmsSignupModal({ isModalOpen: false }));
    },
    asyncValidate: (values, reduxFormDispatch, props) => {
      const { signupPhoneNumber } = values;
      if (signupPhoneNumber.length && !validatePhoneNumber(signupPhoneNumber)) {
        const {
          formViewConfig: { validationErrorLabel },
        } = props;
        const error = { signupPhoneNumber: validationErrorLabel };
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ ...error, _error: error });
      }
      return Promise.resolve();
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

  const { SmsSignUp: { isModalOpen, subscription } = {} } = state;
  return {
    formViewConfig,
    isModalOpen,
    subscription,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupModalView);
