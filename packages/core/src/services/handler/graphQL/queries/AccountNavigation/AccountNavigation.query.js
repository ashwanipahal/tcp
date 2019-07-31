const buildQuery = ({ brand, country, channel }) => `
accountNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
  subSections {
    subSections {
      leafLink {
        url
        text
        title
        target
        external
      }
    }
    leafLink {
      url
      text
      title
      target
      external
    }
  }
  leafLink {
    url
    text
    title
    target
    external
  }
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
