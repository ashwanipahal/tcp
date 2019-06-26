const buildQuery = data => `
  ${data.path}: pageByPath(
    path: "/${data.path}",
    brand: "TCP",
    country: "USA",
    channel: "Mobile"
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
