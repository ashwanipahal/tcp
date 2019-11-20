const buildQuery = ({ pageName, path, brand, country, channel }) => `
  ${pageName || path}: pageByPath(
    path: "/${path}",
    brand: "${brand}",
    country: "${country}",
    channel: "${channel}"
  ) {
    errorMessage
    items {
      path
      seo {
        pageTitle
        keywords
        description
      }
      layout {
        slots {
          name
          moduleName
          contentId
          value
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
