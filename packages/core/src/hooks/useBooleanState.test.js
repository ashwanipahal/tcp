import { renderHook, act } from '@testing-library/react-hooks';
import useBooleanState from './useBooleanState';

describe(__filename, () => {
  it('should set its state to false when starting with true', () => {
    const { result } = renderHook(() => useBooleanState(true));
    const [state, setState] = result.current;
    expect(state).toBe(true);
    act(setState);
    expect(result.current[0]).toBe(false);
  });
  it('should set its state to true when starting with false', () => {
    const { result } = renderHook(() => useBooleanState(false));
    const [state, setState] = result.current;
    expect(state).toBe(false);
    act(setState);
    expect(result.current[0]).toBe(true);
  });
});
