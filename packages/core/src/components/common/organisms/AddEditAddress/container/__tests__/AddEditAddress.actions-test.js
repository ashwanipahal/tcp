import constants from '../AddEditAddress.constants';
import { addAddressSuccess, addAddressFail } from '../AddEditAddress.actions';

describe('Add address action actions', () => {
  it('addAddressSuccess should return action type as ADD_USER_ADDRESS_SUCCESS', () => {
    expect(addAddressSuccess().type).toBe(constants.ADD_USER_ADDRESS_SUCCESS);
  });
  it('addAddressFail should return action type as ADD_USER_ADDRESS_FAIL', () => {
    expect(addAddressFail().type).toBe(constants.ADD_USER_ADDRESS_FAIL);
  });
});
