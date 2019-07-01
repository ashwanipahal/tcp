const buildQuery = ({ category, subCategory, brand, country, channel }) => `
  labels(${category ? `category: "${category}",` : ``} ${
  subCategory ? `subCategory: "${subCategory}",` : ``
} brand: "${brand}", country: "${country}", channel: "${channel}") {
    name
    subcategories {
      name
      labels {
        key
        value
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
