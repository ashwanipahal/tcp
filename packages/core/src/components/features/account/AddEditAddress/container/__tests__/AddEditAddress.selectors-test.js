import { fromJS } from 'immutable';
import { getAddressResponse, getUserEmail } from '../AddEditAddress.selectors';

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
        loginInfo: {
          email1: 'user@user.com',
        },
      },
    };

    expect(getUserEmail(state)).toEqual('user@user.com');
  });
});
