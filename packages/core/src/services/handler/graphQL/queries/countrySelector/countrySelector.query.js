const buildQuery = () => `
  query fetchCMSData {
    countryList {
      country {
        code
        name
      }
      currency {
        code
        name
      }
      exchangeRate {
        value
      }
    }
  }
`;

export default {
  getQuery: () => {
    return buildQuery();
  },
};
