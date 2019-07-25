import SignupModalAbstractor from '../EmailSmsSignup';

jest.mock('../../../../../service/API');

describe('SignupModalAbstractor', () => {
  test('Signup modal Abstractor Email subscription ', () => {
    return SignupModalAbstractor.subscribeEmail(
      'baseURL',
      'relURI',
      { payload: 'URL' },
      'post'
    ).then(data => {
      expect(data).toEqual(true);
    });
  });

  test('Signup modal Abstractor SMS subscription ', () => {
    return SignupModalAbstractor.subscribeSms(
      'baseURL',
      'relURI',
      { payload: 'mobile_phone' },
      'post'
    ).then(data => {
      expect(data).toEqual('valid');
    });
  });

  test('Signup modal Abstractor Email Verification ', () => {
    return SignupModalAbstractor.verifyEmail(
      'baseURL',
      'relURI',
      { payload: 'address=abf@gmail.com' },
      'post'
    ).then(data => {
      expect(data).toEqual(false);
      expect(data).not.toEqual(true);
    });
  });

  test('Signup modal Abstractor Email subscription with empty params', () => {
    return SignupModalAbstractor.subscribeEmail('baseURL', 'relURI').then(data => {
      expect(data).toEqual(false);
    });
  });

  test('Signup modal Abstractor Email Verification with empty params', () => {
    return SignupModalAbstractor.verifyEmail('baseURL', 'relURI').then(data => {
      expect(data).toEqual(false);
      expect(data).not.toEqual(true);
    });
  });
});
