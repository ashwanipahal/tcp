import { List } from 'immutable';
import AddressBookReducer from '../AddressBook.reducer';
import { setAddressList } from '../AddressBook.actions';

const addressList = [{}];

describe('Address List reducer', () => {
  it('should return empty list as default state', () => {
    expect(AddressBookReducer(undefined, {}).size).toBe(0);
  });

  it('should return List object for the addressList', () => {
    expect(AddressBookReducer(undefined, setAddressList(addressList)).size).toBe(1);
  });

  it('should return List object for the addressList if state is passed as an array', () => {
    const state = AddressBookReducer([], {});
    expect(List.isList(state)).toBeTruthy();
  });
});
