import { THEME_WRAPPER_REDUCER_KEY } from './ThemeWrapper.constants';

export const getAddressResponse = state => {
  return state.AddEditAddressReducer;
};

export const getAppType = state => {
  return state[THEME_WRAPPER_REDUCER_KEY].get('APP_TYPE');
};

export const getAppTypeParams = state => {
  return {
    title: state[THEME_WRAPPER_REDUCER_KEY].getIn(['APP_PARAMS', 'title']),
    pdpUrl: state[THEME_WRAPPER_REDUCER_KEY].getIn(['APP_PARAMS', 'pdpUrl']),
    selectedColorProductId: state[THEME_WRAPPER_REDUCER_KEY].getIn([
      'APP_PARAMS',
      'selectedColorProductId',
    ]),
    reset: state[THEME_WRAPPER_REDUCER_KEY].getIn(['APP_PARAMS', 'reset']),
  };
};
