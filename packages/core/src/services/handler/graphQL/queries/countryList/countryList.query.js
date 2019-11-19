const buildQuery = () => `
  query fetchCMSData {
    countryList {
      country {
        id: code
        displayName: name
      }
      currency {
        id: code
        displayName: name
      }
      exchangeRate {
        roundMethod
        exchangevalue: value
        merchantMargin
        quoteId
      }
    }
  }
`;

export default {
  getQuery: () => {
    return buildQuery();
  },
};
