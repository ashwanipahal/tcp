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
        addressId: '158247',
        addressLine: ['1234 Market St', '', ''],
        addressType: 'ShippingAndBilling',
        attributes: [
          {
            key: 'addressField2',
            value: '2',
          },
          {
            key: 'addressField3',
            value: '19107',
          },
        ],
        city: 'Philadelphia',
        country: 'US',
        email1: 'NAMAN.JAIN@PUBLICISSAPIENT.COM',
        firstName: 'naman',
        lastName: 'jain',
        nickName: 'sb_2019-06-21 01:23:49.834',
        phone1: '2025551011',
        phone1Publish: 'false',
        primary: 'false',
        state: 'PA',
        xcont_isBillingAddress: 'false',
        xcont_isShippingAddress: 'true',
        zipCode: '19107',
      },
    ];
    const addreListWithTrue = List([
      {
        addressId: '158247',
        addressLine: ['1234 Market St', '', ''],
        addressType: 'ShippingAndBilling',
        attributes: [
          {
            key: 'addressField2',
            value: '2',
          },
          {
            key: 'addressField3',
            value: '19107',
          },
        ],
        city: 'Philadelphia',
        country: 'US',
        email1: 'NAMAN.JAIN@PUBLICISSAPIENT.COM',
        firstName: 'naman',
        lastName: 'jain',
        nickName: 'sb_2019-06-21 01:23:49.834',
        phone1: '2025551011',
        phone1Publish: 'false',
        primary: 'true',
        state: 'PA',
        xcont_isBillingAddress: 'false',
        xcont_isShippingAddress: 'true',
        zipCode: '19107',
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
    const error = {
      statusCode: 400,
      message: 'Object not found',
    };
    const initialState = {
      error: {},
      list: List([{}]),
    };
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
