const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
    categoryContent {
      description
      name
      mainCategory {
        contentId
      }
    }
    subCategories {
      categoryContent {
        isShortImage
        isUnique
        longDescription
        productCount
        description
        groupIdentifier
        groupIdentifierName
        name
        id
      }
      subCategories {
        categoryContent {
          isShortImage
          isUnique
          longDescription
          productCount
          description
          groupIdentifier
          groupIdentifierName
          name
          id
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
