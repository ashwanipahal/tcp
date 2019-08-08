const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
    categoryContent {
      seoToken
      isShortImage
      isUnique
      productCount
      description
      name
      id
      mainCategory {
        set {
          key
					value
        }
        sizesRange {
          text
        }
        categoryImage {
          url
          alt
          title
          crop_d
          crop_m
          crop_t
          position
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
            textBanner {
              link {
                url
                text
                target
                title
                external
              }
              textItems {
                style
                text
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
        groupIdentifierSequence
        isShortImage
        isUnique
        productCount
        description
        groupIdentifier
        groupIdentifierName
        name
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
          groupIdentifierSequence
          isShortImage
          isUnique
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
