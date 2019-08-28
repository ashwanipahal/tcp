const buildQuery = ({ brand, country, channel }) => `
configurationKey(brand: "${brand}", country: "${country}", channel: "${channel}") {
  key
  value
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
