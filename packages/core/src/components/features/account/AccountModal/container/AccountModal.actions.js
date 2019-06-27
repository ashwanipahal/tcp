import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

export const openAccountModal = (modalToOpen, address) => ({
  type: ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL,
  modalToOpen,
  address,
});

export const closeModal = () => ({
  type: ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL,
});
