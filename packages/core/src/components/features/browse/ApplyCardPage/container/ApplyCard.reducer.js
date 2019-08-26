import { fromJS } from 'immutable';
import constants from '../RewardsCard.constants';

const initialState = fromJS({
  contact_information_disclaimer: '',
  pre_screen_code: '',
});

const ApplyCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULEX_CONTENT:
      return state.set(constants.PLCC_DISCLAIMERS_DATA, action.payload);
    case constants.RESPONSE_SEND_INSTANT_CARD_APPLICATION:
      return state.set(constants.APPLICATION_STATUS, action.payload.status);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default ApplyCardReducer;
