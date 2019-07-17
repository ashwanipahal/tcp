import { UPDATE_APP_TYPE } from './ThemeWrapper.constrants';

const DEFAULT_STATE = {
  APP_TYPE: '',
};

const ThemeWrapperReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_APP_TYPE:
      return { ...state, APP_TYPE: action.payload };
    default:
      return state;
  }
};

export default ThemeWrapperReducer;
