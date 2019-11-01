const buildQuery = ({ path, brand, country, channel, lang }) => `
  ${path}: pageByPath(
    path: "/${path}",
    brand: "${brand}",
    country: "${country}",
    channel: "${channel}",
    lang: "${lang}"
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
