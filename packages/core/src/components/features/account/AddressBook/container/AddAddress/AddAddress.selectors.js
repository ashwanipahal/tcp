import { LOGINPAGE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

export const getAddAddressResponse = state => {
  return state.AddAddressReducer;
};

export const getUserEmail = state => {
  return state[LOGINPAGE_REDUCER_KEY].loginInfo.email1;
};
