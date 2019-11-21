import { renderHook } from '@testing-library/react-hooks';
import useImageLoadedState from './useImageLoadedState';

describe(__filename, () => {
  it('should have a false state by default', () => {
    const ref = {};
    const { result } = renderHook(() => useImageLoadedState(ref));
    expect(result.current).toBe(false);
  });
  it('should have a true state when its image is complete', () => {
    const ref = {
      current: {
        complete: true,
        addEventListener() {},
        removeEventListener() {},
      },
    };
    const { result } = renderHook(() => useImageLoadedState(ref));
    expect(result.current).toBe(true);
  });
  it('should remove its image event listeners when unmounted', () => {
    const ref = {
      current: {
        addEventListener() {},
        removeEventListener() {},
      },
    };
    const spy = jest.spyOn(ref.current, 'removeEventListener');
    const { unmount } = renderHook(() => useImageLoadedState(ref));
    unmount();
    expect(spy).toBeCalled();
  });
});
