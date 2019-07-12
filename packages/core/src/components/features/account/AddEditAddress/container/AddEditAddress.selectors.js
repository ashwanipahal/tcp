import { createSelector } from 'reselect';
import { LOGINPAGE_REDUCER_KEY } from '../../../../../constants/reducer.constants';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';

export const getAddressResponse = state => {
  return state.AddAddressReducer;
};

export const getUserEmail = state => {
  return state[LOGINPAGE_REDUCER_KEY].loginInfo.email1;
};

export const getAddressId = (state, props) => {
  return (props.router && props.router.query && props.router.query.addressId) || false;
};

export const getAddressById = createSelector(
  [getAddressListState, getAddressId],
  (addressList, addressId) => {
    return addressId ? addressList.find(address => address.addressId === addressId) : null;
  }
);
