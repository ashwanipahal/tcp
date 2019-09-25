import { useEffect } from 'react';

const isEnabled = Boolean(process.env.PERF_TIMING);

export default function usePerfMeasure(name, ...args) {
  useEffect(() => {
    if (isEnabled && typeof performance !== 'undefined') {
      try {
        performance.measure(name, ...args);
      } catch (err) {
        // Will throw if "start" or "end" don't match existing marks
      }
    }
  }, [name, args]);
}
