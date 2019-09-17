import { put, takeLatest } from 'redux-saga/effects';
import { SocialAccountSaga, getsocialAccounts, savesocialAccounts } from '../Social.saga';
import { currentSocialInfo } from '../Social.actions';
import SOCIAL_LOAD from '../../social.constants';

describe('getsocialAccounts saga', () => {
  describe('SocialAccountSaga', () => {
    let SocialAccountSagaGeneration;
    beforeEach(() => {
      SocialAccountSagaGeneration = getsocialAccounts();
      SocialAccountSagaGeneration.next();
    });

    it('should dispatch getsocialAccounts action for success resposnse', () => {
      const payload = [{}];

      const putDescriptor = SocialAccountSagaGeneration.next(payload).value;
      expect(putDescriptor).toEqual(put(currentSocialInfo(payload)));
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
        expect(putDescriptor).toEqual(put(currentSocialInfo(res)));
      });
    });
  });

  describe('SocialAccountSaga', () => {
    it('should return correct takeLatest effect', () => {
      const generator = SocialAccountSaga();
      const takeLatestDescriptor = generator.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(SOCIAL_LOAD.SOCIAL_LOAD, getsocialAccounts));
    });
  });
});
