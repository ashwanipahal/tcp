import constants from '../RewardsCard.constants';

const initialState = {
  contact_information_disclaimer: '',
  pre_screen_code: '',
};

const ApplyCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULEX_CONTENT:
      return { ...state, plccData: action.payload };
    case constants.RESPONSE_INSTANT_CARD_APPLICATION:
      return { ...state, applicationStatus: action.payload.status };
    default:
      return state;
  }
};

export default ApplyCardReducer;
