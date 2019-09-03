import GET_CANDID_CONSTANTS from './GetCandid.constants';

export const fetchCandidData = payload => {
  return {
    payload,
    type: GET_CANDID_CONSTANTS.FETCH_DATA,
  };
};

export const setCandidData = payload => {
  return {
    payload,
    type: GET_CANDID_CONSTANTS.SET_DATA,
  };
};

export default {
  fetchCandidData,
  setCandidData,
};
