import { fromJS } from 'immutable';
import constants from './AddEditCreditCard.constants';

const initialState = fromJS({
  showNotification: false,
  error: null,
});

const AddEditCreditCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_CREDIT_CARD:
    case constants.EDIT_CREDIT_CARD:
      return initialState;
    case constants.ADD_CREDIT_CARD_SUCCESS:
      return fromJS(action.payload);
    case constants.ADD_CREDIT_CARD_ERROR:
      return state.set('error', fromJS(action.payload)).set('showNotification', true);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddEditCreditCardReducer;
