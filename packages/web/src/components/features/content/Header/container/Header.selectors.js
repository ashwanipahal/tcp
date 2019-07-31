import { LOGINPAGE_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getUserName = state => {
  if (state[LOGINPAGE_REDUCER_KEY] && state[LOGINPAGE_REDUCER_KEY].get('isLoggedin')) {
    return state[LOGINPAGE_REDUCER_KEY].get('firstName');
  }

  return '';
};

export default getUserName;
