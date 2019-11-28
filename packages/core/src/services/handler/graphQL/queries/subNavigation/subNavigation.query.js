const buildQuery = ({ category, brand, country, channel }) => `
    subNavigation(category: "${category}", brand: "${brand}", country: "${country}", channel: "${channel}") {
    errorMessage
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
