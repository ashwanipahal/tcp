import { UPDATE_APP_TYPE } from './ThemeWrapper.constants';

const updateAppType = payload => {
  return {
    type: UPDATE_APP_TYPE,
    payload,
  };
};

export default updateAppType;
