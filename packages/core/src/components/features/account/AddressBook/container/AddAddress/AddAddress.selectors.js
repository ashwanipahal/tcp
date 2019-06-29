
export const showMessageForAddAddress = state => {
  console.log(state.AddressBookReducer.get('showMessageForAddAddressMsg') + state)
  console.log(state.AddressBookReducer.get('showMessageForAddAddressMsg'))
  return state.AddressBookReducer.get('showMessageForAddAddressMsg');
};
