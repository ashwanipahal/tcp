import { THEME_WRAPPER_REDUCER_KEY } from './ThemeWrapper.constrants';

export const getAddressResponse = state => {
  return state.AddEditAddressReducer;
};

export const getAppType = state => {
  return state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE');
};
