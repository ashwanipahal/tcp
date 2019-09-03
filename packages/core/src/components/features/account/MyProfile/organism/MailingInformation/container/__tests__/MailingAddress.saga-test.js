import { takeLatest } from 'redux-saga/effects';
import MailingAddressSaga, { updateMailingAddressPut } from '../MailingAddress.saga';
import constants from '../../MailingAddress.constants';

describe('MailingAddress saga', () => {
  it('should return correct takeLatest effect', () => {
    const generator = MailingAddressSaga();
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(constants.ADD_MAILING_ADDRESS, updateMailingAddressPut)
    );
  });
});
