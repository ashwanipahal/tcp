import { useEffect } from 'react';

const isEnabled = Boolean(process.env.PERF_TIMING);

export default function usePerfMark(name) {
  useEffect(() => {
    if (isEnabled) performance.mark(name);
  }, [name]);
}
