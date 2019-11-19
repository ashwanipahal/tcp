import { SESSIONCONFIG_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getCurrency = state => {
  return state[SESSIONCONFIG_REDUCER_KEY].siteDetails.currency;
};

export default getCurrency;
