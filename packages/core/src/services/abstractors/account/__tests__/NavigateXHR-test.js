import { getPayloadCookieArray, NavigateXHR } from '../NavigateXHR';
import { executeExternalAPICall } from '../../../handler/handler';

jest.mock('../../../handler/handler', () => ({
  executeExternalAPICall: jest.fn(),
}));

describe('#navigateXHR', () => {
  it('should get modified cookies in map format', () => {
    const arrCookie = [
      {
        name: '',
        path: '/',
        value: '',
      },
    ];
    expect(getPayloadCookieArray()).toMatchObject(arrCookie);
  });

  it('should success on navigate XHR', () => {
    const result = {};
    executeExternalAPICall.mockImplementation(() => Promise.reject(result));

    NavigateXHR().then(data => {
      expect(data).toMatchObject(result);
    });
  });
});
