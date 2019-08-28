import { put, takeLatest } from 'redux-saga/effects';
import { UpdateProfile, UpdateProfileSaga } from '../AddEditPersonalInformation.saga';
import { updateProfileSuccess, updateProfileError } from '../AddEditPersonalInformation.actions';
import constants from '../../AddEditPersonalInformation.constants';

describe('UpdateProfile saga', () => {
  describe('UpdateProfile', () => {
    let gen;
    beforeEach(() => {
      gen = UpdateProfile({});
      gen.next();
    });

    it('should dispatch updateProfileSuccess action for success response', () => {
      const response = 'success';
      const putDescriptor = gen.next(response).value;
      expect(putDescriptor).toEqual(put(updateProfileSuccess(response)));
    });

    it('should dispatch updateProfileError action if response is error', () => {
      const response = 'error';
      const putDescriptor = gen.throw(response).value;
      expect(putDescriptor).toEqual(put(updateProfileError(response)));
    });
  });

  describe('UpdateProfileSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = UpdateProfileSaga();
      const takeLatestDescriptor = generator.next().value;
      const expected = takeLatest(constants.PROFILE_UPDATE, UpdateProfile);
      expect(takeLatestDescriptor).toEqual(expected);
    });
  });
});
