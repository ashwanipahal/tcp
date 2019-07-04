const showMessageForAddAddress = state => {
  return state.AddAddressReducer.get('addAddressNotification');
};

export default showMessageForAddAddress;
