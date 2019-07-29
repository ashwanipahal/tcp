import { fromJS } from 'immutable';
import constants from './AddEditCreditCard.constants';

const initialState = fromJS(null);

const AddEditCreditCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_CREDIT_CARD_SUCCESS:
      return fromJS(action.payload);
    case constants.ADD_CREDIT_CARD_ERROR:
      return fromJS(action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(null);
      }
      return state;
  }
};

export default AddEditCreditCardReducer;
