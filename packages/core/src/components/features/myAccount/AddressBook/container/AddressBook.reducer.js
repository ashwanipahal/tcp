import {
  SET_USER_ADDRESSES,
  ADD_USER_ADDRESS_SUCCESS,
  ADD_USER_ADDRESS_FAIL,
} from '../AddressBook.contants';

const initialState = {
  userAddresses: [],
  addAddressSuccess: [],
  addAddressFail: [],
};

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        addAddressSuccess: action.payload,
      });
    case ADD_USER_ADDRESS_FAIL:
      return Object.assign({}, state, {
        addAddressFail: action.payload,
      });

    default:
      return state;
  }
};

export default AddressBookReducer;
