import { createSelector } from 'reselect';
import { LOGINPAGE_REDUCER_KEY } from '../../../../../../constants/reducer.constants';
import { getAddressListState } from '../AddressBook.selectors';

export const getAddAddressResponse = state => {
  return state.AddAddressReducer;
};

export const getUserEmail = state => {
  return state[LOGINPAGE_REDUCER_KEY].loginInfo.email1;
};

export const getAddressId = (state, props) => {
  const {
    router: {
      query: { addressId },
    },
  } = props;
  return addressId;
};

export const getAddressById = createSelector(
  [getAddressListState, getAddressId],
  (addressList, addressId) => {
    return addressList.find(address => address.addressId === addressId);
  }
);
