import { fromJS } from 'immutable';
import constants from './AddEditCreditCard.constants';

const initialState = fromJS({
  showNotification: false,
  error: null,
});

const AddEditCreditCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_CREDIT_CARD_SUCCESS:
      // return fromJS(action.payload);
      return state.set('success', fromJS(action.payload)).set('error', null);
    case constants.ADD_CREDIT_CARD_ERROR:
      return state
        .set('error', fromJS(action.payload))
        .set('showNotification', true)
        .set('success', null);
    case constants.ADD_CREDIT_CARD_RESET_SUCCESS:
      return state.set('success', null).set('showNotification', false);
    case constants.ADD_CREDIT_CARD_RESET_ERROR:
      return state.set('error', null).set('showNotification', false);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddEditCreditCardReducer;
