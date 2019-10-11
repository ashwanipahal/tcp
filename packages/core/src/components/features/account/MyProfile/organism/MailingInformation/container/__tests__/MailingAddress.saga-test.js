import { put, takeLatest } from 'redux-saga/effects';
import MailingAddressSaga, { updateMailingAddressPut } from '../MailingAddress.saga';
import { addMailingAddressSuccess, addMailingAddressFail } from '../MailingAddress.actions';
import { getUserInfo } from '../../../../../User/container/User.actions';
import { updateProfileSuccess } from '../../../../container/MyProfile.actions';
import {
  setAddressBookNotification,
  clearGetAddressListTTL,
} from '../../../../../AddressBook/container/AddressBook.actions';
import constants from '../../MailingAddress.constants';

describe('MailingAddress saga', () => {
  const payload = {
    firstName: 'test',
    lastName: 'test',
    email1: 'TCPTEST@YOPMAIL.COM',
    addressLine: '',
    city: 'Bronx',
    country: 'US',
    state: 'NY',
    xcont_addressField2: '2',
    xcont_addressField3: '10451',
    zipCode: '10451',
    storeId: '10151',
  };
  let mailingInfoGeneration;
  beforeEach(() => {
    mailingInfoGeneration = updateMailingAddressPut({ payload });
    mailingInfoGeneration.next();
  });

  it('should dispatch setAddressBookNotification action for success resposnse', () => {
    const response = {
      nickName: 'TCPTEST2@YOPMAIL.COM',
      addressId: '12345',
    };
    const putDescriptor = mailingInfoGeneration.next(response.addressId).value;
    expect(putDescriptor).toEqual(put(setAddressBookNotification({ status: 'success' })));
  });

  it('should dispatch clearGetAddressListTTL action for success resposnse', () => {
    const response = {
      nickName: 'TCPTEST3@YOPMAIL.COM',
      addressId: '12345',
    };
    mailingInfoGeneration.next(response);
    const putDescriptor = mailingInfoGeneration.next().value;
    expect(putDescriptor).toEqual(put(clearGetAddressListTTL()));
  });

  it('should dispatch getUserInfo action for success resposnse', () => {
    const response = {
      nickName: 'TCPTEST4@YOPMAIL.COM',
      addressId: '12345',
    };
    mailingInfoGeneration.next(response);
    mailingInfoGeneration.next();
    const putDescriptor = mailingInfoGeneration.next().value;
    expect(putDescriptor).toEqual(put(getUserInfo()));
  });

  it('should dispatch updateProfileSuccess action for success resposnse', () => {
    const response = {
      nickName: 'TCPTEST21@YOPMAIL.COM',
      addressId: '12345',
    };
    mailingInfoGeneration.next(response);
    mailingInfoGeneration.next();
    mailingInfoGeneration.next();
    const putDescriptor = mailingInfoGeneration.next().value;
    expect(putDescriptor).toEqual(put(updateProfileSuccess('successMessage')));
  });

  it('should dispatch addMailingAddressSuccess action for success resposnse', () => {
    const response = {
      nickName: 'TCPTEST21@YOPMAIL.COM',
      addressId: '12345',
    };
    mailingInfoGeneration.next(response);
    mailingInfoGeneration.next();
    mailingInfoGeneration.next();
    mailingInfoGeneration.next();
    const putDescriptor = mailingInfoGeneration.next().value;
    expect(putDescriptor).toEqual(put(addMailingAddressSuccess(response.body)));
  });

  it('should dispatch addMailingAddressFail action if response is fail', () => {
    const errorBody = {};
    const error = {
      body: {
        errors: errorBody,
      },
    };
    const putDescriptor = mailingInfoGeneration.throw(error).value;
    expect(putDescriptor).toEqual(put(addMailingAddressFail(errorBody)));
  });

  it('should return correct takeLatest effect', () => {
    const generator = MailingAddressSaga();
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(constants.ADD_MAILING_ADDRESS, updateMailingAddressPut)
    );
  });
});
