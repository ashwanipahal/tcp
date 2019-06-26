import { createSelector } from 'reselect';

const getUserAddresses = state => state.AddressBookReducer.userAddresses;

const getUserAddressesSelector = createSelector(
  [getUserAddresses],
  userAddresses => userAddresses
);

export default getUserAddressesSelector;
