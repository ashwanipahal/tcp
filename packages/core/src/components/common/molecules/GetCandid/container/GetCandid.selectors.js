import { GET_CANDID_REDUCER_KEY } from '../../../../../constants/reducer.constants';

export const getCandidState = state => {
  return state[GET_CANDID_REDUCER_KEY];
};

export const getCandidData = state => {
  return getCandidState(state).get('candidData');
};

export const getLabels = state => {
  const { global: { getCandid } = {} } = state.Labels;
  return getCandid;
};
