import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

export const openAccountModal = payload => ({
  type: ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL,
  payload,
});

export const closeModal = () => ({
  type: ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL,
});

export const deleteAddress = payload => ({
  type: ACCOUNT_MODAL_CONSTANTS.DELETE_ADDRESS,
  payload,
});

export const verifyAddressRequest = payload => ({
  type: ACCOUNT_MODAL_CONSTANTS.VERIFY_ADDRESS,
  payload,
});
