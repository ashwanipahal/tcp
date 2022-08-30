/**
 * Side-effect middleware factory
 *
 * @description Factory for creating Redux middlewares that will conditionally call
 * functions for any action meeting at least one predefined criteria.
 *
 * @param {Function} effect side-effect function to call for each "passing" action
 * @param {Array} conditions array of predicate functions to test each action against
 *
 * @example
 *
 * // console logs every action with a type of "CLICK"
 * const clickLogger = create(
 *   action => console.log(action),
 *   [action => action.type === 'CLICK'],
 * );
 */
function create(effect, conditions = []) {
  if (typeof effect !== 'function') {
    throw new Error('Effects middleware create() needs a function as the first argument.');
  }
  return () => next => action => {
    if (conditions.some(cond => cond(action))) {
      effect(action);
    }
    return next(action);
  };
}

export default { create };
