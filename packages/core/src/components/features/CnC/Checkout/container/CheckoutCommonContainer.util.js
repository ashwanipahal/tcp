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
  const { initCheckoutSectionPage, router } = props;
  let recalc;
  let isPaypalPostBack;
  if (router && router.query) {
    ({ recalc, isPaypalPostBack } = router.query);
  }
  initCheckoutSectionPage({ pageName, recalc, isPaypalPostBack, ...extraProps });
};
