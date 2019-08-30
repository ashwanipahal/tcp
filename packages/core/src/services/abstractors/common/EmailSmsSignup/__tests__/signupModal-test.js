import SignupModalAbstractor from '../EmailSmsSignup';

jest.mock('../../../../../service/API');
jest.mock('../../../../handler/handler');

describe('SignupModalAbstractor', () => {
  test('Signup modal Abstractor Email subscription ', () => {
    return SignupModalAbstractor.subscribeEmail(
      'baseURL',
      'relURI',
      { payload: 'URL' },
      'post'
    ).then(data => {
      expect(data.success).toBeTruthy();
    });
  });

  test('Signup modal Abstractor SMS subscription ', () => {
    return SignupModalAbstractor.subscribeSms('baseURL', 'relURI', '4083067249', 'post').then(
      data => {
        expect(data.success).toBeTruthy();
      }
    );
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
    return SignupModalAbstractor.subscribeEmail('baseURL', 'relURI').then(data => {
      expect(data.success).toBeFalsy();
    });
  });

  test('Signup modal Abstractor Email Verification with empty params', () => {
    return SignupModalAbstractor.verifyEmail('baseURL', 'relURI').then(data => {
      expect(data.success).toBeFalsy();
      expect(data.success).not.toBeTruthy();
    });
  });
});
