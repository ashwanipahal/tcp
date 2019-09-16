import { useEffect } from 'react';
import { measure } from '../utils/performance';

export default function usePerfMeasure(name, ...args) {
  useEffect(() => {
    measure(name, ...args);
  }, [name, args]);
}
