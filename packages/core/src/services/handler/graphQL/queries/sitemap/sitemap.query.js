const buildQuery = ({ brand, country, channel, lang }) => `
  query fetchCMSData {
    siteMap (
      brand: "${brand}",
      country: "${country}",
      channel: "${channel}"
      lang: "${lang}"
    ) {
      content
      url
      categories {
        href
        name
        category {
          href
          name
          category {
            name
            name
          }
        }
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
