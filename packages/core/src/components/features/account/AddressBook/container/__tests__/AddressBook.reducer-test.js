import { Map } from 'immutable';
import AddressBookReducer from '../AddressBook.reducer';
import { setAddressList } from '../AddressBook.actions';

const addressList = [{}];

describe('Address List reducer', () => {
  it('should return empty list as default state', () => {
    expect(AddressBookReducer(undefined, {}).get('list')).toBeNull();
  });

  it('should return List object for the addressList', () => {
    expect(AddressBookReducer(undefined, setAddressList(addressList)).get('list').size).toBe(1);
  });

  it('should return List object for the addressList if state is passed as an array', () => {
    const state = AddressBookReducer({}, {});
    expect(Map.isMap(state)).toBeTruthy();
  });
});
