const buildQuery = ({ path, brand, country, channel }) => `
  ${path}: pageByPath(
    path: "/${path}",
    brand: "${brand}",
    country: "${country}",
    channel: "${channel}"
  ) {
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
