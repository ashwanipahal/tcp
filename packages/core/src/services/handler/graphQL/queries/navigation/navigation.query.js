const buildQuery = ({ brand, country, channel, lang }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}", lang: "${lang}") {
    errorMessage
    categoryContent {
      description
      catgroupId
      name
      id
      seoUrl
      seoToken
      longDescription
      seoTitle
      seoMetaDesc
      mainCategory {
        set {
          key
					val
        }
        sizesRange {
          text
        }
        promoBadge {
          text
          style
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
              }
            }
            shopBySize {
              text {
                text
              }
              linkList {
                url
                title
                text
                target
              }
            }
            textBanner {
              link {
                url
                text
                title
                target
                external
                action
              }
              textItems {
                text
                style
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
        longDescription
        name
        id
        catgroupId
        longDescription
        catgroupId
        seoTitle
        seoMetaDesc
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
          longDescription
          name
          id
          catgroupId
          longDescription
          catgroupId
          seoTitle
          seoMetaDesc
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
