import { fromJS } from 'immutable';
import CREDITCARD_CONSTANTS from './CreditCard.constants';

const initialState = fromJS({
  errors: false,
  cvvCodeInfoContent: [],
});

const CreditCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREDITCARD_CONSTANTS.SET_MODULEX_CONTENT:
      return action.payload.richText
        ? state.set('cvvCodeInfoContent', action.payload.richText)
        : state;
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};
export default CreditCardReducer;
