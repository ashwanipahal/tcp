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

export const intiSectionPage = (pageName, props, extraProps = {}) => {
  const { initCheckoutSectionPage, router, navigation } = props;
  let recalc;
  let isPaypalPostBack;
  if (router && router.query) {
    ({ recalc, isPaypalPostBack } = router.query);
  }
  if (isMobileApp()) {
    isPaypalPostBack = getPayPalFlag(navigation);
  }
  initCheckoutSectionPage({ pageName, recalc, isPaypalPostBack, ...extraProps });
};

export const callNeedHelpContent = (props) => {
  const { fetchNeedHelpContent, needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId, } = props;
  fetchNeedHelpContent([needHelpContentId,
    getGiftServicesContentTcpId,
    getGiftServicesContentGymId,
    cvvCodeInfoContentId,
    couponHelpContentId])
}
