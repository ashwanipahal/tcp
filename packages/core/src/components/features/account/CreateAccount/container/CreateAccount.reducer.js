import { fromJS } from 'immutable';
import constants from '../CreateAccount.constants';

const initialState = fromJS({
  error: null,
});

const CreateAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CREATE_AN_ACCOUNT_ERR:
      return state.set('error', action.payload);
    case constants.RESET_CREATE_AN_ACCOUNT_ERR:
      return state.set('error', null);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default CreateAccountReducer;
