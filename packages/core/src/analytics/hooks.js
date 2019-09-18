/**
 * @module analytics/hooks
 * @description hooks to use within components that need to make tracking calls.
 */

// Note: useDispatch() can only be called during hook execution.
// TODO: Upgrade react-redux and use this hook
// import { useDispatch } from 'react-redux';
import { trackPageView, trackClick } from './actions';

/**
 * Use for dispatching the "track page view" action.
 *
 * @example
 * function MyComponent() {
 *   const track = usePageTracking();
 *   useEffect(() => {
 *     track('my_page'); // Track on mount
 *   }, []);
 *   return null;
 * }
 */
export function usePageTracking(dispatch) {
  // TODO: Upgrade react-redux and use this hook
  // const dispatch = useDispatch();
  return payload => dispatch(trackPageView(payload));
}

/**
 * Use for dispatching the "track click" action.
 *
 * @example
 * function MyComponent() {
 *   const track = useClickTracking();
 *   const handleClick = () => track('my_button');
 *   return <button onClick={handleClick}>Click</button>;
 * }
 */
export function useClickTracking(dispatch) {
  // TODO: Upgrade react-redux and use this hook
  // const dispatch = useDispatch();
  return payload => dispatch(trackClick(payload));
}
