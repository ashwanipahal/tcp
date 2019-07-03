import ADD_ADDRESS_CONSTANTS from '../AddAddress/AddAddress.constants';
import { addAddressSuccess, addAddressFail } from '../AddAddress/AddAddress.actions';

describe('Add address action actions', () => {
  it('addAddressSuccess should return action type as ADD_USER_ADDRESS_SUCCESS', () => {
    expect(addAddressSuccess().type).toBe(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_SUCCESS);
  });
  it('addAddressFail should return action type as ADD_USER_ADDRESS_FAIL', () => {
    expect(addAddressFail().type).toBe(ADD_ADDRESS_CONSTANTS.ADD_USER_ADDRESS_FAIL);
  });
});
