import { renderHook } from '@testing-library/react-hooks';
import * as LoyaltyPromoBanner from '../view/LoyaltyPromoBanner';
import * as cookieUtils from '../../../../../utils/cookie.util';

const { useLoyaltyBannerCloseStatus } = LoyaltyPromoBanner;

describe('LoyaltyPromoBanner component', () => {
  it('Should verify banner close status to false', () => {
    const { result } = renderHook(() => useLoyaltyBannerCloseStatus());
    const bannerCloseStatus = result.current;
    expect(bannerCloseStatus).toBe(false);
  });

  it('Should verify banner close status to true', () => {
    const { readCookie: utilsReadCookie } = cookieUtils;
    cookieUtils.readCookie = jest.fn().mockReturnValue('mprAboveHead_');
    const { result } = renderHook(() => useLoyaltyBannerCloseStatus());
    const bannerCloseStatus = result.current;
    expect(bannerCloseStatus).toBe(true);
    cookieUtils.readCookie = utilsReadCookie;
  });
});
