import * as actions from '../DefaultShippingAddress.actions';
import ADDRESS_BOOK_CONSTANTS from '../../AddressBook.constants';

describe('Default shipping address actions', () => {
  const payload = {
    foo: 'foo',
  };

  it('should create an action to set the default shipping address', () => {
    const expectedAction = {
      type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_REQUEST,
      payload,
    };
    expect(actions.setDefaultShippingAddressRequest(payload)).toEqual(expectedAction);
  });

  it('should create an action after default shipping address is success', () => {
    const expectedAction = {
      type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_SUCCESS,
      payload,
    };
    expect(actions.setDefaultShippingAddressSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action after default shipping address is failure', () => {
    const expectedAction = {
      type: ADDRESS_BOOK_CONSTANTS.SET_DEFAULT_SHIPPING_ADDRESS_FAILED,
      payload,
    };
    expect(actions.setDefaultShippingAddressFailure(payload)).toEqual(expectedAction);
  });
});
