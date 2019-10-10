import { useEffect, useDebugValue } from 'react';

const isEnabled = Boolean(process.env.PERF_TIMING);
const isSupported = typeof performance !== 'undefined';
const shouldRun = isEnabled && isSupported;

export function usePerfMeasure(name, start, end) {
  useDebugValue(name);
  useEffect(() => {
    // Stop early if needed. This check must be within useEffect.
    if (!shouldRun) return null;
    // First clear existing entries that may be from SSR.
    performance.clearMeasures(name);
    try {
      performance.measure(name, start, end);
    } catch {
      // This throws if "start" or "end" don't match existing entries.
    }
    // Clear measures when component un-mounts.
    return () => performance.clearMeasures(name);
  }, [name, start, end]);
}

export function usePerfMark(name) {
  useDebugValue(name);
  useEffect(() => {
    // Stop early if needed. This check must be within useEffect.
    if (!shouldRun) return null;
    // First clear existing entries that may be from SSR.
    performance.clearMarks(name);
    performance.mark(name);
    // Clear marks when component un-mounts.
    return () => performance.clearMarks(name);
  }, [name]);
}
