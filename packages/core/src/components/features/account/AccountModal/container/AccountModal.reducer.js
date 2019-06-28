import { fromJS } from 'immutable';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

const initialState = fromJS({
  modalToOpen: false,
  openState: false,
  message: {},
});

const AccountModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL:
      return {
        ...state,
        modalToOpen: action.payload.modalToOpen,
        openState: true,
        message: action.payload.message,
      };
    case ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL:
      return { ...state, openState: false };
    default:
      return state;
  }
};

export default AccountModalReducer;
