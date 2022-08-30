import { useState } from 'react';

export default function useBooleanState(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle];
}
