import ADD_ADDRESS_CONSTANTS from './AddAddress.constants';

const initialState = {
  addAddressSuccess: [],
  addAddressFail: [],
};

const AddAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        addAddressSuccess: action.payload,
      });
    case ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL:
      return Object.assign({}, state, {
        addAddressFail: action.payload,
      });

    default:
      return state;
  }
};

export default AddAddressReducer;
