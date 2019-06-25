import { List } from 'immutable';
import AddressListReducer from '../AddressList.reducer';
import { setAddressList } from '../AddressList.actions';

const addressList = [{}];

describe('Address List reducer', () => {
  it('should return empty list as default state', () => {
    expect(AddressListReducer(undefined, {}).size).toBe(0);
  });

  it('should return List object for the addressList', () => {
    expect(AddressListReducer(undefined, setAddressList(addressList)).size).toBe(1);
  });

  it('should return List object for the addressList if state is passed as an array', () => {
    const state = AddressListReducer([], {});
    expect(List.isList(state)).toBeTruthy();
  });
});
