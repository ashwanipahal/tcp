import { fromJS } from 'immutable';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

const initialState = fromJS({
  modalType: null,
  openState: false,
  message: {},
});

const AccountModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        openState: true,
        message: action.payload.message,
      };
    case ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL:
      return { ...state, openState: false, message: {}, modalType: null };
    default:
      return state;
  }
};

export default AccountModalReducer;
