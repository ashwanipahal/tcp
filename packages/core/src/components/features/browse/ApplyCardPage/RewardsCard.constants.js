import { APPLY_PLCC_ACTION_PATTERN } from '../../../../constants/reducer.constants';

// FIXME: (took this from checkoutStoreView) im expecting this to be moved to the proper internationalization namespace
export const MONTH_SHORT_FORMAT = {
  JAN: 'Jan',
  FEB: 'Feb',
  MAR: 'Mar',
  APR: 'Apr',
  MAY: 'May',
  JUN: 'Jun',
  JUL: 'Jul',
  AUG: 'Aug',
  SEP: 'Sep',
  OCT: 'Oct',
  NOV: 'Nov',
  DEC: 'Dec',
};

export const MONTH_OPTIONS_MAP_WITH_EMPTY = [
  {
    id: 'Mm',
    displayName: 'Mm',
  },
  {
    id: '01',
    displayName: MONTH_SHORT_FORMAT.JAN,
  },
  {
    id: '02',
    displayName: MONTH_SHORT_FORMAT.FEB,
  },
  {
    id: '03',
    displayName: MONTH_SHORT_FORMAT.MAR,
  },
  {
    id: '04',
    displayName: MONTH_SHORT_FORMAT.APR,
  },
  {
    id: '05',
    displayName: MONTH_SHORT_FORMAT.MAY,
  },
  {
    id: '06',
    displayName: MONTH_SHORT_FORMAT.JUN,
  },
  {
    id: '07',
    displayName: MONTH_SHORT_FORMAT.JUL,
  },
  {
    id: '08',
    displayName: MONTH_SHORT_FORMAT.AUG,
  },
  {
    id: '09',
    displayName: MONTH_SHORT_FORMAT.SEP,
  },
  {
    id: '10',
    displayName: MONTH_SHORT_FORMAT.OCT,
  },
  {
    id: '11',
    displayName: MONTH_SHORT_FORMAT.NOV,
  },
  {
    id: '12',
    displayName: MONTH_SHORT_FORMAT.DEC,
  },
];

export const ERR_CONFIG = ['PENDING', 'APPROVED', 'EXISTING'];

export default {
  FETCH_MODULEX_CONTENT: `${APPLY_PLCC_ACTION_PATTERN}FETCH_MODULEX_CONTENT`,
  SET_MODULEX_CONTENT: `${APPLY_PLCC_ACTION_PATTERN}ADD_MODULEX_CONTENT`,
  SEND_INSTANT_CARD_APPLICATION: `${APPLY_PLCC_ACTION_PATTERN}SEND_INSTANT_CARD_APPLICATION`,
  RESPONSE_INSTANT_CARD_APPLICATION: `${APPLY_PLCC_ACTION_PATTERN}RESPONSE_INSTANT_CARD_APPLICATION`,
  RESET_PLCC_APPLICATION_RESPONSE: `${APPLY_PLCC_ACTION_PATTERN}RESET_PLCC_APPLICATION_RESPONSE`,
  APPLICATION_STATE_PENDING: 'PENDING',
  APPLICATION_STATE_APPROVED: 'APPROVED',
  APPLICATION_STATE_EXISTING: 'EXISTING',
  APPLICATION_STATUS: 'applicationStatus',
  PLCC_DISCLAIMERS_DATA: 'plcc_disclaimers_data',
  MONTH_SHORT_FORMAT,
  MONTH_OPTIONS_MAP_WITH_EMPTY,
};
