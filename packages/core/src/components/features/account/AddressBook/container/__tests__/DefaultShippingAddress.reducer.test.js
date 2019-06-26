// @flow
import SHIPPING_ADDRESS_CONSTANTS from '../../DefaultShippingAddress.constants';
import reducer from '../AddressBook.reducer';

describe('default shipping addresss reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      defaultAddress: {},
      error: {},
    });
  });

  it('should handle default shipping address', () => {
    const payload = {
      addressId: '75066941',
      nickName: 'sb_2019-06-24 02:23:29.134',
    };
    expect(
      reducer([], {
        type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
        body: payload,
      })
    ).toEqual({
      defaultAddress: payload,
    });
  });

  it('should handle failure default shipping address', () => {
    const error = {
      statusCode: 400,
      message: 'Object not found',
    };
    expect(
      reducer([], {
        type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
        error,
      })
    ).toEqual({
      error,
    });
  });
});
