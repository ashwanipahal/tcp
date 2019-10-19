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
    validateSignupSmsPhoneNumber: phoneNumber => {
      return validatePhoneNumber(phoneNumber) ? Promise.resolve({}) : Promise.reject();
    },
  };
};

const mapStateToProps = (state, props) => {
  let formViewConfig = {};
  if (props.buttonConfig && props.buttonConfig.link.action === 'open_sms_modal') {
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
