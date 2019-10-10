import { TRACK_PAGE_VIEW, TRACK_CLICK, trackPageView, trackClick } from '@tcp/core/src/analytics';
import ADDEDTOBAG_CONSTANTS from '@tcp/core/src/components/features/CnC/AddedToBag/AddedToBag.constants';

/**
 * Analytics middleware event mapper.
 *
 * This function is passed to Redux-Beacon and maps
 * Redux actions to corresponding tracking events. This
 * looks and works very much like a reducer, except the
 * return values must be "EventDefinition" functions with
 * the signature of: `(action, prevState, nextState) => ({})`.
 *
 * @example
 * switch (action.type) {
 *   case 'PRODUCT_ADDED_TO_CART':
 *     return (action, prevState, nextState) => ({
 *       eventName: 'addedToCart',
 *       customEvents: ['event42'],
 *       products: [action.payload],
 *       otherProp1: prevState.foo,
 *       otherProp2: nextState.bar,
 *     });
 * }
 *
 * @see https://rangle.gitbook.io/redux-beacon/index-1/events-mapper
 * @see https://rangle.gitbook.io/redux-beacon/index-1/events-map
 * @see https://rangle.gitbook.io/redux-beacon/index-1/event-definition
 */
export default function(action) {
  switch (action.type) {
    case TRACK_PAGE_VIEW:
      return trackPageView(/* (action, prevState, nextState) => ({}) */);

    case TRACK_CLICK:
      return trackClick(/* (action, prevState, nextState) => ({}) */);

    // NOTE: Example of direct call tracking (opposed to page or click events)
    case ADDEDTOBAG_CONSTANTS.ADD_TO_CART_ECOM:
      return () => ({ eventName: 'api_addProductToCart' });

    default:
      return [];
  }
}
