import effectsMiddleware from '../effects';

// Array of predicate functions to test actions against.
// Actions passing any test will get tracked.
const defaultConditions = [
  // TODO: Fill in with additional predicates
  // e.g., type === "SOME_SPECIFIC_ACTION"
  action => action.type.startsWith('TRACK_'),
];

export default function create(track, conditions = []) {
  return effectsMiddleware.create(track, [...defaultConditions, ...conditions]);
}
