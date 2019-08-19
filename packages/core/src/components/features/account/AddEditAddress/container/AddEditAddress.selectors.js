import { createSelector } from 'reselect';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';

export const getAddressResponse = state => {
  return state.AddEditAddressReducer;
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
