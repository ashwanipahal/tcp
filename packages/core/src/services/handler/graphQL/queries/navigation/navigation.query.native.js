import { getAPIConfig } from '../../../../../utils';
import { defaultBrand, defaultChannel, defaultCountry } from '../../../../api.constants';

const buildQuery = ({ brand, country, channel }) => `
  navigation: mainNavigation(brand: "${brand}", country: "${country}", channel: "${channel}") {
    categoryContent {
      seoToken
      isShortImage
      description
      catgroupId
      seoTitle
      seoUrl
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
        catgroupId
        groupIdentifierSequence
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
          seoUrl
          catgroupId
          groupIdentifierSequence
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
  getQuery: () => {
    const apiConfig = getAPIConfig();

    return buildQuery({
      brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
      channel: defaultChannel,
      country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
    });
  },
};
