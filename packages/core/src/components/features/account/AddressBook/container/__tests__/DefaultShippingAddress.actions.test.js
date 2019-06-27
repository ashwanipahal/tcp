import * as actions from '../DefaultShippingAddress.actions';
import SHIPPING_ADDRESS_CONSTANTS from '../../DefaultShippingAddress.constants';

describe('Default shipping address actions', () => {
  it('should create an action to set the default shipping address', () => {
    const payload = {
      foo: 'foo',
    };

    const expectedAction = {
      type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      payload,
    };
    expect(actions.setDefaultShippingAddressRequest(payload)).toEqual(expectedAction);
  });

  it('should create an action after default shipping address is success', () => {
    const body = {
      addressId: '75066941',
      nickName: 'sb_2019-06-24 02:23:29.134',
    };
    const expectedAction = {
      type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      body,
    };
    expect(actions.setDefaultShippingAddressSuccess(body)).toEqual(expectedAction);
  });

  it('should create an action after default shipping address is failure', () => {
    const error = {
      statusCode: 400,
      message: 'Object not found',
    };
    const expectedAction = {
      type: SHIPPING_ADDRESS_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
      error,
    };
    expect(actions.setDefaultShippingAddressFailure(error)).toEqual(expectedAction);
  });
});
