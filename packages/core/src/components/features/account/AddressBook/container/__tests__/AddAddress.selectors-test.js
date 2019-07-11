import { fromJS } from 'immutable';
import { getAddAddressResponse, getUserEmail } from '../AddAddress/AddAddress.selectors';

describe('#AddAddress selector', () => {
  it('#getAddAddressResponse should return addAddressReduer state', () => {
    const addAddressResponse = fromJS({
      status: false,
    });
    const state = {
      AddAddressReducer: addAddressResponse,
    };

    expect(getAddAddressResponse(state)).toEqual(addAddressResponse);
  });

  it('#getUserEmail should return user email', () => {
    const state = {
      LoginPageReducer: {
        loginInfo: {
          email1: 'user@user.com',
        },
      },
    };

    expect(getUserEmail(state)).toEqual('user@user.com');
  });
});
