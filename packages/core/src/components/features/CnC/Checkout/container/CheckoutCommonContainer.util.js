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
  const { initCheckoutSectionPage, router, isRegisteredUserCallDone } = props;
  let recalc;
  let isPaypalPostBack;
  let appRouting;
  if (router && router.query) {
    ({ recalc, isPaypalPostBack, appRouting } = router.query);
  }
  if (isRegisteredUserCallDone || isMobileApp()) {
    initCheckoutSectionPage({ pageName, recalc, isPaypalPostBack, appRouting, ...extraProps });
  }
};
