import { useEffect } from 'react';
import { mark } from '../utils/performance';

export default function usePerfMark(name) {
  useEffect(() => {
    mark(name);
  }, [name]);
}
