import { BIRTHDAY_SAVINGS_ACTION_PATTERN } from '@tcp/core/src/constants/reducer.constants';

const CONSTANTS = {
  GET_CHILDREN: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}GET_CHILDREN`,
  REMOVE_CHILD: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}REMOVE_CHILD`,
  ADD_CHILD: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}ADD_CHILD`,
  BIRTHDAY_SAVING_UPDATE_SUCCESS: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}UPDATE_SUCCESS`,
  BIRTHDAY_SAVING_UPDATE_ERROR: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}UPDATE_ERROR`,
  RESET_BIRTHDAY_SAVING_MESSAGE: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}RESET_BIRTHDAY_SAVING_MESSAGE`,
  CHILD_GENDER_MAP: {
    FEMALE: '0',
    MALE: '1',
  },
  BIRTHDAY_CARD_HEIGHT: '66px',
  MAX_BIRTHDAY_CARDS: 4,
  VIEW: {
    EDIT: 'edit',
    READ: 'read',
  },
  ADD_CHILD_BIRTHDAY_FORM: 'AddChildBirthdayForm',
};

export default CONSTANTS;
