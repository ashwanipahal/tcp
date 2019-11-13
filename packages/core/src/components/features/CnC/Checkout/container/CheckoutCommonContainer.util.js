import { getPayPalFlag } from '../util/utility';
import { isMobileApp } from '../../../../../utils';

export const formatPayload = payload => {
  const { addressLine1, addressLine2, zipCode, ...otherPayload } = payload;
  return {
    ...otherPayload,
    ...{
      address1: addressLine1,
      address2: addressLine2,
      zip: zipCode,
    },
  };
};

export const intiSectionPage = (pageName, scope, extraProps = {}) => {
  const scopeValue = scope;
  const { initCheckoutSectionPage, router, isRegisteredUserCallDone, navigation } = scope.props;
  let recalc;
  let isPaypalPostBack;
  let appRouting;
  if (router && router.query) {
    ({ recalc, isPaypalPostBack, appRouting } = router.query);
  }
  if (isRegisteredUserCallDone || isMobileApp()) {
    scopeValue.initialLoad = false;
    initCheckoutSectionPage({ pageName, recalc, isPaypalPostBack, appRouting, ...extraProps });
  }
  if (isMobileApp()) {
    isPaypalPostBack = getPayPalFlag(navigation);
  }
};

export const callNeedHelpContent = props => {
  const {
    fetchNeedHelpContent,
    needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId,
  } = props;
  fetchNeedHelpContent([
    needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId,
  ]);
};
