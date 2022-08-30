import SMS_SIGNUP_CONSTANTS from './SmsSignupModal.constants';

export const toggleSmsSignupModal = payload => {
  return {
    payload,
    type: SMS_SIGNUP_CONSTANTS.SMS_SUBSCRIPTION_MODAL_TOGGLE,
  };
};

export default {
  toggleSmsSignupModal,
};
