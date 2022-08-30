import { HOMEPAGE_CONSTANTS } from '../HomePage.constants';

const INITIAL_STATE = {
  links: [],
  eSpots: [],
};

const HomePageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOMEPAGE_CONSTANTS.SET_HEADER_LINKS:
      return { ...state, links: action.payload };
    case HOMEPAGE_CONSTANTS.SET_ESPOST:
      return { ...state, eSpots: action.payload };
    default:
      return state;
  }
};

export default HomePageReducer;
