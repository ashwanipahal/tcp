import { fromJS } from 'immutable';
import APPLY_NOW_MODAL_CONSTANTS from './ApplyNowModal.constants';

const initialState = fromJS({
  isModalOpen: false,
});

const ApplyNowModalPLCCReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_NOW_MODAL_CONSTANTS.APPLY_NOW_MODAL_TOGGLE:
      return state.set('modalStatus', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ApplyNowModalPLCCReducer;
