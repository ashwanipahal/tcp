import constants from '../BirthdaySavingsList.constants';

export const getChildrenAction = () => ({
  type: constants.GET_CHILDREN,
});

export const removeChildrenAction = payload => ({
  type: constants.REMOVE_CHILDREN,
  payload,
});

export default getChildrenAction;
