import { USER_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { getAPIConfig } from '@tcp/core/src/utils';
import { bin2hex, md5 } from '../encoding';

export const getUserState = state => {
  return state[USER_REDUCER_KEY];
};

export const getPersonalDataState = state => {
  return state[USER_REDUCER_KEY].get('personalData');
};

export const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.PDP;
};

export const getUserToken = (userId, mprId) => {
  const apiConfig = getAPIConfig();
  const sharedKey = apiConfig.BV_SHARED_KEY;

  // obtain current date in the format of yyyyMMdd
  const rightNow = new Date();
  const res = rightNow
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  const queryString = `date=${res.toString()}&userid=${userId}&MprId=${mprId}`;
  // const queryString = `date=${res.toString()}&userid=300124031&MprId=B10000012060062`;
  // define unhashed security key
  const unhashed = sharedKey.toString().concat(queryString.toString());

  // obtain HEX representation of queryString
  const hexQueryString = bin2hex(queryString);

  // obtain MD5 hash of the unhashed security key
  const hashed = md5(unhashed);

  return hashed.toString() + hexQueryString.toString();
};
