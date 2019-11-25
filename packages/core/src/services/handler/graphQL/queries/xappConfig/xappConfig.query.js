const buildQuery = ({ brand, country, channel }) => `
configurationKey(brand: "${brand}", country: "${country}", channel: "${channel}") {
  key
  value
  errorMessage
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
