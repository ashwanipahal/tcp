import { UPDATE_APP_TYPE, UPDATE_APP_TYPE_AND_REDIRECT } from './ThemeWrapper.constants';

const updateAppType = payload => {
  return {
    type: UPDATE_APP_TYPE,
    payload,
  };
};

const updateAppTypeWithParams = payload => {
  return {
    type: UPDATE_APP_TYPE_AND_REDIRECT,
    payload,
  };
};

export { updateAppType, updateAppTypeWithParams };
