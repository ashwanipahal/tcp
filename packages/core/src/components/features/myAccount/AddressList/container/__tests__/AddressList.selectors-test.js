import { List } from 'immutable';
import getAddressListState from '../AddressList.selectors';

describe('#AddressList selector', () => {
  it('#getAddressListState should return AddressListReduer state', () => {
    const AddressListState = List();
    const state = {
      AddressListReducer: AddressListState,
    };

    expect(getAddressListState(state)).toEqual(AddressListState);
  });
});
