import { fromJS } from 'immutable';
import { userAddressData } from '../utility';

let address = {
  addressLine1: 'Address Line 1',
  addressLine2: 'Campbell Road',
  city: 'JB',
  state: 'CA',
  zipCode: '22009',
};

test(`userAddressData to return some value`, async () => {
  const response = await userAddressData(fromJS(address));
  expect(response).toEqual(address);
});

test(`userAddressData to return some empty values when no data is provided`, async () => {
  address = {};
  const response = await userAddressData(fromJS(address));
  expect(response).not.toBe(null);
});
