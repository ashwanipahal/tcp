import { fromJS, List } from 'immutable';
import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

const initialState = fromJS({
  addAddressSuccess: false,
  error: {},
  showMessageForAddAddressMsg: null,
});

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS:
    return state.set('error', action.payload).set('showMelisaCallSuccess', true);
      // return Object.assign({}, state, {
      //   addAddressSuccess: action.payload,
      // });
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL:
    return state.set('showMessageForAddAddressMsg', true);
      // return Object.assign({}, state, {
      //   addAddressFail: action.payload,
      // });

    default:
    if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AddAddressReducer;
