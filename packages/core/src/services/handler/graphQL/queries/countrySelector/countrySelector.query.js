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
        value
        merchantMargin
      }
    }
  }
`;

export default {
  getQuery: () => {
    return buildQuery();
  },
};
