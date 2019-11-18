const buildQuery = ({ brand, country, channel, lang, category, path }) => `
contentLayout(brand: "${brand}", country: "${country}", channel: "${channel}", lang: "${lang}", category: "${category}", path: "${path}" ) {
  errorMessage
  key
  items {
    top {
      slots {
        contentId
        moduleName
        value
        name
      }
    }
    middle {
      slots {
        contentId
        moduleName
        value
        name
      }
    }
    bottom {
      slots {
        contentId
        moduleName
        value
        name
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
