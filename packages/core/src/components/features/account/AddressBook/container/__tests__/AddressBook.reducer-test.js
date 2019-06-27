import { Map, fromJS, List } from 'immutable';
import AddressBookReducer from '../AddressBook.reducer';
import { setAddressList } from '../AddressBook.actions';
import SHIPPING_ADDRESS_CONSTANTS from '../../DefaultShippingAddress.constants';

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
      },
    ];
    const addreListWithTrue = List([
      {
        nickName: payload.nickName,
        primary: 'true',
      },
    ]);
    const initialState = fromJS({
      list: List(addressList),
    });

    expect(
      AddressBookReducer(initialState, {
        type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
        body: payload,
      })
    ).toEqual(
      fromJS({
        list: addreListWithTrue,
        showDefaultShippingUpdatedMsg: true,
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
        type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
        error,
      })
    ).toEqual(
      fromJS({
        error,
        showDefaultShippingUpdatedMsg: false,
      })
    );
  });
});
