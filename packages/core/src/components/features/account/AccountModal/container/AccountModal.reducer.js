import { fromJS } from 'immutable';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

const initialState = fromJS({
  modalType: null,
  openState: false,
  message: null,
});

const AccountModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL:
      return state
        .set('modalType', action.payload.modalType)
        .set('openState', true)
        .set('message', action.payload.message);
    case ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL:
      return state.set('openState', false).set('modalType', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AccountModalReducer;
