import { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { HotfixPropsContext, HotfixBrowserContext } from './HotfixContext';

describe(__filename, () => {
  describe('HotfixPropsContext', () => {
    it('has an object value type', () => {
      const result = renderHook(() => useContext(HotfixPropsContext));
      const expected = 'object';
      const actual = typeof result;
      expect(actual).toBe(expected);
    });
  });
  describe('HotfixBrowserContext', () => {
    it('has an object value type', () => {
      const result = renderHook(() => useContext(HotfixBrowserContext));
      const expected = 'object';
      const actual = typeof result;
      expect(actual).toBe(expected);
    });
  });
});
