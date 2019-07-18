const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}")) {
    nav {
      categoryContent {
        categoryId
        mainContent {
          contentId
        }
      }
      subCategories {
          categoryContent {
            categoryId
          }
          subCategories {
            categoryId
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
