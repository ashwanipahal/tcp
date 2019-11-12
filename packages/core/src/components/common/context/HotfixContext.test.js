import { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import HotfixContext from './HotfixContext';

describe(__filename, () => {
  it('has an object value type', () => {
    const result = renderHook(() => useContext(HotfixContext));
    const expected = 'object';
    const actual = typeof result;
    expect(actual).toBe(expected);
  });
});
