import { fromJS } from 'immutable';
import { UPDATE_APP_TYPE, UPDATE_APP_TYPE_AND_REDIRECT } from './ThemeWrapper.constants';

const DEFAULT_STATE = fromJS({
  APP_TYPE: '',
  APP_PARAMS: {
    title: null,
    pdpUrl: null,
    selectedColorProductId: null,
    reset: false,
  },
});

const ThemeWrapperReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_APP_TYPE:
      return fromJS({ ...state, APP_TYPE: action.payload });
    case UPDATE_APP_TYPE_AND_REDIRECT:
      return fromJS({ ...state, APP_TYPE: action.payload.type, APP_PARAMS: action.payload.params });
    default:
      return state;
  }
};

export default ThemeWrapperReducer;
