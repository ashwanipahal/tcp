const buildQuery = val => `
  query fetchCMSData {
    countryList(countryCode: "${val}") {
      errorMessage
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
  getQuery: data => {
    return buildQuery(data);
  },
};
