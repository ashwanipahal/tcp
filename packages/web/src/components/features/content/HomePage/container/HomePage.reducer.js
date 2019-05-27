import { HOMEPAGE_CONSTANTS } from "../HomePage.constants";

const INITIAL_STATE = { 
    links: [],
    eSpots:[]
}

export const HomePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOMEPAGE_CONSTANTS.SET_HEADER_LINKS:  //TODO: Move it to _APP.js Reducer
            return {...state, links: action.payload};
        case HOMEPAGE_CONSTANTS.SET_ESPOST:
            return {...state, eSpots: action.payload};
        default:
            return state
    }
}