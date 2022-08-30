import { getPayloadCookieArray } from '../NavigateXHR';

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
});
