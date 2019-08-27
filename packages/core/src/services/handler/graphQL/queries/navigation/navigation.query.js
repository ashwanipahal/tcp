const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
    categoryContent {
      description
      catgroupId
      name
      longDescription
      id
      seoUrl
      seoToken
      mainCategory {
        set {
          key
					value
        }
        sizesRange {
          text
        }
        categoryLayout {
          name
          columns {
            imageBanner {
              image {
                url
                alt
                title
                crop_d
                crop_m
                crop_t
              }
              link {
                url
                text
                title
                target
                external
              }
            }
            shopBySize {
              text {
                text
              }
              richText {
                text
              }
            }
          }
        }
      }
    }
    subCategories {
      categoryContent {
        seoToken
        seoUrl
        groupIdentifierSequence
        description
        groupIdentifier
        groupIdentifierName
        name
        longDescription
        id
        mainCategory {
          promoBadge {
            text
          }
        }
      }
      subCategories {
        categoryContent {
          seoToken
          seoUrl
          groupIdentifierSequence
          description
          groupIdentifier
          groupIdentifierName
          name
          longDescription
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
