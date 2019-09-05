import { fromJS } from 'immutable';
import constants from '../MailingAddress.constants';

const initialState = fromJS(null);

const AddMailingAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.MAILING_ADDRESS_ERR:
      return fromJS(action.payload);
    case constants.ADD_MAILING_ADDRESS_SUCCESS:
      return fromJS(action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(null);
      }
      return state;
  }
};

export default AddMailingAddressReducer;
