import constants from '../BirthdaySavingsList.constants';

/**
 * @function getChildrenAction
 * action creator for type: GET_CHILDREN
 */
export const getChildrenAction = () => ({
  type: constants.GET_CHILDREN,
});

/**
 * @function removeChildAction
 * @param { object } payload
 * action creator for type: REMOVE_CHILDREN
 */
export const removeChildAction = payload => ({
  type: constants.REMOVE_CHILD,
  payload,
});

/**
 * @function addChildAction
 * @param { object } payload
 * action creator for type: ADD_CHILD_BIRTHDAY
 */
export const addChildAction = payload => ({
  type: constants.ADD_CHILD,
  payload,
});

/**
 * @function updateBirthdaySavingSuccess
 * @param { object } payload
 * action creator for type: BIRTHDAY_SAVING_UPDATE_SUCCESS
 */
export const updateBirthdaySavingSuccess = payload => ({
  type: constants.BIRTHDAY_SAVING_UPDATE_SUCCESS,
  payload,
});

/**
 * @function updateBirthdaySavingError
 * @param { object } payload
 * action creator for type: BIRTHDAY_SAVING_UPDATE_ERROR
 */
export const updateBirthdaySavingError = payload => ({
  type: constants.BIRTHDAY_SAVING_UPDATE_ERROR,
  payload,
});

/**
 * @function resetBirthdaySavingMessage
 * action creator for type: RESET_BIRTHDAY_SAVING_MESSAGE
 */
export const resetBirthdaySavingMessageAction = () => ({
  type: constants.RESET_BIRTHDAY_SAVING_MESSAGE,
});

export default getChildrenAction;
