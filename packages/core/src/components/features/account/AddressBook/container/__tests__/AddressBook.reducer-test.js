import { Map, fromJS, List } from 'immutable';
import AddressBookReducer from '../AddressBook.reducer';
import { setAddressList } from '../AddressBook.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';

let addressList = [{}];

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

  it('should handle default shipping address', () => {
    const payload = {
      addressId: '158247',
      nickName: 'sb_2019-06-21 01:23:49.834',
    };
    addressList = [
      {
        nickName: payload.nickName,
        primary: 'false',
        addressId: '158245',
      },
      {
        nickName: '123456788',
        primary: 'false',
        addressId: '158246',
      },
    ];
    const addreListWithTrue = List([
      {
        nickName: payload.nickName,
        primary: 'true',
        addressId: '158247',
      },
      {
        nickName: '123456788',
        primary: 'false',
        addressId: '158246',
      },
    ]);
    const initialState = fromJS({
      list: List(addressList),
    });

    expect(
      AddressBookReducer(initialState, {
        type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
        payload,
      })
    ).toEqual(
      fromJS({
        list: addreListWithTrue,
        showUpdatedNotification: 'success',
      })
    );
  });
  it('should handle failure default shipping address', () => {
    const error = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      error: {},
    });
    expect(
      AddressBookReducer(initialState, {
        type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
        payload: error,
      })
    ).toEqual(
      fromJS({
        error,
        showUpdatedNotification: 'error',
      })
    );
  });
  it('should update address on delete', () => {
    const payload = {
      addressId: ['158247'],
    };
    addressList = [
      {
        nickName: '987654321',
        primary: 'false',
        addressId: '158247',
      },
      {
        nickName: '123456788',
        primary: 'false',
        addressId: '158246',
      },
    ];
    const updatedAddressList = List([
      {
        nickName: '123456788',
        primary: 'true',
        addressId: '158246',
      },
    ]);
    const initialState = fromJS({
      list: List(addressList),
    });
    expect(
      AddressBookReducer(initialState, {
        type: ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE,
        payload,
      })
    ).toEqual(
      fromJS({
        list: updatedAddressList,
        showUpdatedNotification: 'success',
      })
    );
  });
  it('should handle failure delete address', () => {
    const error = fromJS({
      statusCode: 400,
      message: 'Object not found',
    });
    const initialState = fromJS({
      error: {},
    });
    expect(
      AddressBookReducer(initialState, {
        type: ADDRESS_BOOK_CONSTANTS.UPDATE_ADDRESS_LIST_ON_DELETE_ERR,
        payload: error,
      })
    ).toEqual(
      fromJS({
        error,
        showUpdatedNotificationOnModal: 'error',
        showUpdatedNotification: null,
      })
    );
  });
});
