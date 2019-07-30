import { fromJS, Map } from 'immutable';
import {
  getAddressResponse,
  getUserEmail,
  getAddressId,
  getAddressById,
} from '../AddEditAddress.selectors';

describe('#AddEditAddress selector', () => {
  it('#getAddressResponse should return addEditAddressReduer state', () => {
    const addressResponse = fromJS({
      status: false,
    });
    const state = {
      AddEditAddressReducer: addressResponse,
    };

    expect(getAddressResponse(state)).toEqual(addressResponse);
  });

  it('#getUserEmail should return user email', () => {
    const state = {
      LoginPageReducer: {
        email: 'user@user.com',
      },
    };

    expect(getUserEmail(state)).toEqual('user@user.com');
  });

  it('#getAddressId should return addressId if router is passed in props', () => {
    const state = {};
    const props = {
      router: {
        query: {
          addressId: '12345',
        },
      },
    };

    expect(getAddressId(state, props)).toEqual('12345');
  });

  it('#getAddressId should return false if router is not present in props', () => {
    const state = {};
    const props = {};

    expect(getAddressId(state, props)).toEqual(false);
  });

  it('#getAddressById should return null if router is not present in props', () => {
    const address = { addressId: '12345' };
    const state = {
      AddressBookReducer: Map({
        list: [address],
      }),
    };
    const props = {};

    expect(getAddressById(state, props)).toBeNull();
  });

  it('#getAddressById should return address if addressId matches', () => {
    const address = { addressId: '12345' };
    const state = {
      AddressBookReducer: Map({
        list: [address],
      }),
    };
    const props = {
      router: {
        query: {
          addressId: '12345',
        },
      },
    };

    expect(getAddressById(state, props)).toBe(address);
  });
});
