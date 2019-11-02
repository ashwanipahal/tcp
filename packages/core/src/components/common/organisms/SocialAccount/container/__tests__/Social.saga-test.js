import { put, takeLatest } from 'redux-saga/effects';
import { SocialAccountSaga, getsocialAccounts, savesocialAccounts } from '../Social.saga';
import { setSocialAccount } from '../Social.actions';
import SOCIAL_CONSTANTS from '../../social.constants';

describe('getsocialAccounts saga', () => {
  describe('SocialAccountSaga', () => {
    let SocialAccountSagaGeneration;
    beforeEach(() => {
      SocialAccountSagaGeneration = getsocialAccounts();
      SocialAccountSagaGeneration.next();
    });

    it('should dispatch getsocialAccounts action for success resposnse', () => {
      const payload = [{}];
      SocialAccountSagaGeneration.next();
      const putDescriptor = SocialAccountSagaGeneration.next(payload).value;
      expect(putDescriptor).toEqual(put(setSocialAccount(payload)));
    });
  });

  describe('savesocialAccounts saga', () => {
    describe('savesocialAccounts', () => {
      const payload = {
        socialAccInfo: {
          token: 'accessToken',
          accountName: 'facebook',
          userId: 'userId',
        },
      };

      let savesocialAccountsGeneration;
      beforeEach(() => {
        savesocialAccountsGeneration = savesocialAccounts({ payload });
        savesocialAccountsGeneration.next();
      });

      it('should dispatch savesocialAccounts action for success resposnse', () => {
        const res = 'foo';
        const putDescriptor = savesocialAccountsGeneration.next(res).value;
        expect(putDescriptor).toEqual(put(setSocialAccount(res)));
      });
    });
  });

  describe('SocialAccountSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SocialAccountSaga();
      generator.next();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(
        takeLatest(SOCIAL_CONSTANTS.SAVE_SOCIAL_LOAD, savesocialAccounts)
      );
    });
  });
});
