const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
    categoryContent {
      description
      name
      id
      mainCategory {
        contentId
        name
        set {
          key
					value
        }
        promoBadge {
          text
          style
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
              linkClass {
                url
                text
                target
                title
                external
                class
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
