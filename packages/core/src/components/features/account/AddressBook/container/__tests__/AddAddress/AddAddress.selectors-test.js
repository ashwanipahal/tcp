import { fromJS } from 'immutable';
import showMessageForAddAddress from '../../AddAddress/AddAddress.selectors';

describe('#AddAddressMessage selector', () => {
  it('#showMessageForAddAddress should return addAddressReduer state', () => {
    const AddressMsgState = fromJS({
      addAddressNotification: false,
    });
    const state = {
      addAddressReduer: AddressMsgState,
    };

    expect(showMessageForAddAddress(state)).toEqual(AddressMsgState.get(true));
  });
});
