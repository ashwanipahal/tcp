import { parseBoolean } from '../../../../../utils/badge.util';

export const getSflMaxCount = state => {
  return state.session.siteDetails.SFL_MAX_COUNT;
};

export const getSaveForLaterSwitch = state => {
  return parseBoolean(state.session.siteDetails.IS_SAVE_FOR_LATER_ENABLED);
};
