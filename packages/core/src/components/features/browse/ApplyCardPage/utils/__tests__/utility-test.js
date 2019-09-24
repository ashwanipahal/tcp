import { fromJS } from 'immutable';
import { userAddressData, getModalSizeForApprovedPLCC, getPageViewGridRowSize } from '../utility';

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

test(`getModalSizeForApprovedPLCC return size correctly when not plcc modal flow`, async () => {
  const response = await getModalSizeForApprovedPLCC(false);
  expect(response).toBe(8);
});

test(`getModalSizeForApprovedPLCC return size correctly when plcc modal flow`, async () => {
  const response = await getModalSizeForApprovedPLCC(true);
  expect(response).toBe(12);
});

test(`getPageViewGridRowSize return size correctly when plcc modal flow`, async () => {
  const response = await getPageViewGridRowSize(false);
  expect(response).toBe(10);
});

test(`getPageViewGridRowSize return size correctly when plcc modal flow`, async () => {
  const response = await getPageViewGridRowSize(true);
  expect(response).toBe(12);
});
