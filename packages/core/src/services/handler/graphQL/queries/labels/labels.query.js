const buildQuery = ({ category, subCategory, brand, country, channel, lang }) => `
  labels(${category ? `category: "${category}",` : ``} ${
  subCategory ? `subCategory: "${subCategory}",` : ``
} brand: "${brand}", country: "${country}", channel: "${channel}", lang: "${lang}") {
    name
    subcategories {
      name
      labels {
        key
        value
      }
      referred {
        name
        contentId
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
