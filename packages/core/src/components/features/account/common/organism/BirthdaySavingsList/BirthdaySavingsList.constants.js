import { BIRTHDAY_SAVINGS_ACTION_PATTERN } from '@tcp/core/src/constants/reducer.constants';

const CONSTANTS = {
  GET_CHILDREN: `${BIRTHDAY_SAVINGS_ACTION_PATTERN}GET_CHILDREN`,
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
};

export default CONSTANTS;
