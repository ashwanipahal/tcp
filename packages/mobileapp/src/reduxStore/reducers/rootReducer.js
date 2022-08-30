import rootReducer from './reducers';
import { RESET_STORE_TYPE } from '../actions';

export default (state, action = {}) => {
  let appstate = state;
  // Reset data stored in redux
  if (action.type === RESET_STORE_TYPE) {
    appstate = undefined;
  }

  return rootReducer(appstate, action);
};
