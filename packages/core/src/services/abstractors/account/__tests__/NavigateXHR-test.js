import { getPayloadCookieArray, NavigateXHR } from '../NavigateXHR';
import { executeStatefulAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeStatefulAPICall: jest.fn(),
}));

describe('#login', () => {
  it('should get modified cookies in map format', () => {
    const arrCookie = [
      {
        domain: '.childrensplace.com',
        name: '',
        path: '/',
        secure: false,
        value: '',
      },
    ];
    expect(getPayloadCookieArray()).toMatchObject(arrCookie);
  });

  it('should success on navigate XHR', () => {
    const result = {};
    executeStatefulAPICall.mockImplementation(() => Promise.reject(result));

    NavigateXHR().then(data => {
      expect(data).toMatchObject(result);
    });
  });
});
