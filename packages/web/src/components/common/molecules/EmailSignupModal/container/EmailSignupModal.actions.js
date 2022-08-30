import EMAIL_SIGNUP_CONSTANTS from './EmailSignupModal.constants';

export const toggleEmailSignupModal = payload => {
  return {
    payload,
    type: EMAIL_SIGNUP_CONSTANTS.EMAIL_SUBSCRIPTION_MODAL_TOGGLE,
  };
};

export default {
  toggleEmailSignupModal,
};
