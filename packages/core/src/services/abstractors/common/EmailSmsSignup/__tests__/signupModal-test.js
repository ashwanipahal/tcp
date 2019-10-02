import SignupModalAbstractor from '../EmailSmsSignup';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

describe('SignupModalAbstractor', () => {
  test('Signup modal Abstractor Email subscription ', () => {
    return SignupModalAbstractor.subscribeEmail({ payload: 'URL' }).then(data => {
      expect(data).toBeTruthy();
    });
  });

  test('Signup modal Abstractor SMS subscription ', () => {
    return SignupModalAbstractor.subscribeSms('4083067249').then(data => {
      expect(data.success).toBeTruthy();
    });
  });

  test('Signup modal Abstractor Email Verification ', () => {
    return SignupModalAbstractor.verifyEmail(
      'baseURL',
      'relURI',
      { payload: 'address=abf@gmail.com' },
      'post'
    ).then(data => {
      expect(data.success).toBeFalsy();
      expect(data.success).not.toBeTruthy();
    });
  });

  test('Signup modal Abstractor Email subscription with empty params', () => {
    return SignupModalAbstractor.subscribeEmail().then(data => {
      expect(data.success).toBeFalsy();
    });
  });

  test('Signup modal Abstractor Email Verification with empty params', () => {
    return SignupModalAbstractor.verifyEmail().then(data => {
      expect(data.success).toBeFalsy();
      expect(data.success).not.toBeTruthy();
    });
  });
});
