import constants from '../BirthdaySavingsList.constants';

/**
 * @function getChildrenAction
 * action creator for type: GET_CHILDREN
 */
export const getChildrenAction = () => ({
  type: constants.GET_CHILDREN,
});

/**
 * @function removeChildrenAction
 * @param { object } payload
 * action creator for type: REMOVE_CHILDREN
 */
export const removeChildrenAction = payload => ({
  type: constants.REMOVE_CHILDREN,
  payload,
});

export default getChildrenAction;
