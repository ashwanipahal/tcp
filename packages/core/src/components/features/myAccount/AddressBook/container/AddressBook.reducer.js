import { SET_USER_ADDRESSES } from '../AddressBook.contants';

const initialState = {
  userAddresses: [],
};

const AddressBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ADDRESSES:
      return Object.assign({}, state, {
        userAddresses: action.payload,
      });
    default:
      return state;
  }
};

export default AddressBookReducer;
