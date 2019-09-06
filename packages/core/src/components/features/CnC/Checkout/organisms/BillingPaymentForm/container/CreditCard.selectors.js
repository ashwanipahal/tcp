import { formValueSelector } from 'redux-form';
/* eslint-disable extra-rules/no-commented-out-code */
import { isMobileApp, getViewportInfo } from '@tcp/core/src/utils';
import constants from './CreditCard.constants';

const getCreditCardLabels = state => {
  const {
    checkout: {
      billing: { lbl_creditcard_title: giftCardTitle, lbl_creditcard_commonError: commonError },
    },
  } = state.Labels;
  return {
    giftCardTitle,
    commonError,
  };
};

const getOnFileCardKey = state => {
  const selector = formValueSelector(constants.FORM_NAME);
  return selector(state, 'onFileCardKey');
};

function getIsMobile() {
  if (isMobileApp()) return true;
  if (typeof window === 'undefined')
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  return getViewportInfo().isMobile;
}
export default {
  getCreditCardLabels,
  getOnFileCardKey,
  getIsMobile,
};
