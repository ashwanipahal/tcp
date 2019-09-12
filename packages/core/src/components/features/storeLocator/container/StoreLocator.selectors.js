import { SESSIONCONFIG_REDUCER_KEY } from '../../../../constants/reducer.constants';

// eslint-disable-next-line import/prefer-default-export
export const getCurrentCountry = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'country'])
  );
};
