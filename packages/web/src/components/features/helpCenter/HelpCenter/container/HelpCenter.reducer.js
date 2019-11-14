import HELPCENTER_CONSTANTS from '../HelpCenter.constants';

const INITIAL_STATE = {
  subNavigationData: [],
};

const HelpCenterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HELPCENTER_CONSTANTS.SET_SUBNAVIGATION_DATA:
      return { ...state, subNavigationData: action.payload };
    default:
      return state;
  }
};

export default HelpCenterReducer;
