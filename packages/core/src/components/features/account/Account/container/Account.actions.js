import { loadComponentLabelsData } from '@tcp/core/src/reduxStore/actions';
import { LABELS } from '@tcp/core/src/reduxStore/constants';

import ACCOUNT_CONSTANTS from '../Account.constants';

export const getAccountNavigationList = () => ({
  type: ACCOUNT_CONSTANTS.GET_ACCOUNT_NAVIGATION_LIST,
});

export const setAccountNavigationList = accountNav => ({
  type: ACCOUNT_CONSTANTS.SET_ACCOUNT_NAVIGATION_LIST,
  accountNav,
});

export const showLoader = () => ({
  type: ACCOUNT_CONSTANTS.SHOW_LOADER,
});

export const initActions = [loadComponentLabelsData({ category: LABELS.account })];
