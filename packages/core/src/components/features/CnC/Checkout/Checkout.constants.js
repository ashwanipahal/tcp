export default {
  INIT_CHECKOUT: 'INIT_CHECKOUT',
  ROUTING_CONST: {
    sitesInfo: {
      proto: 'https',
      storeIdCA: '10152',
      storeIdUS: '10151',
      catalogIdCA: '10552',
      catalogIdUS: '10551',
      langId: '-1',
    },

    siteIds: {
      // the values here are the strings that make up the siteId protion of the sites' urls (i.e., it is the 'us' in the path ( /us/favorites)
      us: 'us',
      ca: 'ca',
    },

    companyIds: {
      us: '1',
      ca: '2',
    },

    // This is the key needed for Address Verification
    // This expires 1/31/2018
    MELISSA_KEY: '63987687',
    /* --------- UNBXD ------- */
    version: 'V2',
    pagetype: 'boolean',
    variantcount: '100',
  },
  ADDREESS_TYPE: {
    SHIPPING: 'Shipping',
    BILLING: 'Billing',
    SHIPPINGANDBILLING: 'ShippingAndBilling',
    MAILING: 'Mailing',
  },
};
